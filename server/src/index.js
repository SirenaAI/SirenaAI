import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pkg from 'pg';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

const { Pool, Client } = pkg;
dotenv.config({ path: '../.env' });

// Configurar Google OAuth client
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// PostgreSQL connection
const connectionString = `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}/${process.env.PGDATABASE}?sslmode=require`;
console.log('Connection string:', connectionString);

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

// Database configuration for individual client connections
const dbConfig = {};

// Test database connection
pool.on('connect', () => {
  console.log('📊 Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('❌ PostgreSQL connection error:', err);
});

// Handle uncaught promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled promise rejection:', err);
  // Don't exit the process
});

// Handle process exit
process.on('exit', (code) => {
  console.log(`Process exit with code: ${code}`);
});

// Handle SIGINT
process.on('SIGINT', () => {
  console.log('Received SIGINT. Closing server gracefully...');
  pool.end(() => {
    console.log('Database pool closed.');
    process.exit(0);
  });
});

// Keep the process alive
process.stdin.resume();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'SirenaAI Server is running!',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Database connection test endpoint
app.get('/db-test', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW() as current_time');
    client.release();
    
    res.json({
      status: 'success',
      message: 'Database connection successful',
      data: result.rows[0],
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Database connection failed',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Get all inundaciones data
app.get('/inundaciones', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM inundaciones ORDER BY id');
    client.release();
    
    res.json({
      status: 'success',
      data: result.rows,
      count: result.rows.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Inundaciones query error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch inundaciones data',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

app.post('/crearusuario', async (req, res) => {
  try {
    const { username, email, nombre, password } = req.body;
    if (!username || !email || !nombre || !password) {
      return res.status(400).json({ error: 'Faltan datos requeridos (username, email, nombre, password)' });
    }
    
    const client = await pool.connect();

    // Verificar si ya existe el usuario o email
    const existingUser = await client.query(
      'SELECT username FROM usuario WHERE username = $1 OR email = $2', 
      [username, email]
    );
    if (existingUser.rows.length > 0) {
      client.release();
      return res.status(409).json({ error: 'El usuario o email ya existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await client.query(
      `INSERT INTO usuario (username, email, nombre, password, fecha_creacion, ultimo_login) 
       VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) 
       RETURNING username, email, nombre`,
      [username, email, nombre, hashedPassword]
    );

    client.release();
    res.status(201).json({
      message: 'Usuario creado exitosamente',
      usuario: result.rows[0]
    });

  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Faltan datos' });
    }
    
    const client = await pool.connect();

    const userResult = await client.query('SELECT username, password, nombre FROM usuario WHERE username = $1', [username]);
    
    if (userResult.rows.length === 0) {
      client.release();
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    const user = userResult.rows[0];
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      client.release();
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Actualizar último login
    await client.query('UPDATE usuario SET ultimo_login = CURRENT_TIMESTAMP WHERE username = $1', [username]);
    
    client.release();

    const token = jwt.sign(
      { 
        username: user.username
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login exitoso',
      token: token,
      usuario: {
        username: user.username,
        nombre: user.nombre
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para Google OAuth - Registro y login automático
app.post('/auth/google', async (req, res) => {
  try {
    const { credential } = req.body;
    
    if (!credential) {
      return res.status(400).json({ error: 'Token de Google requerido' });
    }
    
    // Verificar el token de Google
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;
    
    const client = await pool.connect();
    
    try {
      // Buscar usuario existente por Google ID o email
      let userResult = await client.query(
        'SELECT username, email, google_id, nombre FROM usuario WHERE google_id = $1 OR email = $2',
        [googleId, email]
      );
      
      let user;
      
      if (userResult.rows.length === 0) {
        // Usuario no existe - crear automáticamente
        // Generar username del email (parte antes del @)
        const username = email.split('@')[0];
        console.log(`🆕 Creando nuevo usuario con Google - Username: ${username}, Email: ${email}`);
        
        const insertResult = await client.query(
          `INSERT INTO usuario (
            username, email, google_id, nombre, avatar_url, 
            is_google_linked, fecha_creacion, ultimo_login
          ) VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) 
          RETURNING username, email, google_id, nombre`,
          [username, email, googleId, name, picture, true]
        );
        
        user = insertResult.rows[0];
        console.log(`✅ Usuario creado exitosamente - Username: ${user.username}, Email: ${user.email}`);
        
      } else {
        // Usuario existe - actualizar información de Google
        user = userResult.rows[0];
        
        await client.query(
          `UPDATE usuario SET 
            google_id = $1, 
            nombre = $2, 
            avatar_url = $3, 
            is_google_linked = TRUE, 
            ultimo_login = CURRENT_TIMESTAMP 
          WHERE google_id = $1 OR email = $4`,
          [googleId, name, picture, email]
        );
        
        console.log(`✅ Usuario actualizado: ${user.username}`);
      }
      
      // Generar JWT
      const token = jwt.sign(
        { 
          username: user.username,
          googleLinked: true,
          loginMethod: 'google'
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      res.json({
        message: 'Login con Google exitoso',
        token: token,
        usuario: {
          username: user.username,
          nombre: name,
          avatar: picture,
          googleLinked: true,
          loginMethod: 'google'
        }
      });
      
    } finally {
      client.release();
    }
    
  } catch (error) {
    console.error('Error en login con Google:', error);
    if (error.message.includes('Invalid token')) {
      res.status(401).json({ error: 'Token de Google inválido' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/health`);
  console.log(`🗄️ Database test: http://localhost:${PORT}/db-test`);
  console.log(`🌊 Inundaciones data: http://localhost:${PORT}/inundaciones`);
});
