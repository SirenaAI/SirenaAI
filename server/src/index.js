import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pkg from 'pg';

const { Pool } = pkg;
dotenv.config();

// PostgreSQL connection
const pool = new Pool({
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  ssl: {
    require: true,
    rejectUnauthorized: false
  }
});

// Test database connection
pool.on('connect', () => {
  console.log('📊 Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('❌ PostgreSQL connection error:', err);
});

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

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Database connection test endpoint
app.get('/api/db-test', async (req, res) => {
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
app.get('/api/inundaciones', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM inundaciones');
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
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Faltan datos' });
    }
    
    const client = new Client(config);
    await client.connect();

    const existingUser = await client.query('SELECT username FROM usuario WHERE username = $1', [username]);
    if (existingUser.rows.length > 0) {
      await client.end();
      return res.status(409).json({ error: 'El usuario ya existe' });
    }

    const result = await client.query(
      'INSERT INTO usuario (username, password) VALUES ($1, $2) RETURNING username',
      [username, await bcrypt.hash(password, 10)]
    );

    await client.end();
    res.status(201).json({
      message: 'Usuario creado',
      usuario: result.rows[0]
    });

  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ error: error.message });
  }
})

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Faltan datos' });
    }
    
    const client = new Client(config);
    await client.connect();

    const userResult = await client.query('SELECT username, password FROM usuario WHERE username = $1', [username]);
    
    if (userResult.rows.length === 0) {
      await client.end();
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    const user = userResult.rows[0];
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      await client.end();
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    await client.end();

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
        username: user.username
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: error.message });
  }
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🗄️ Database test: http://localhost:${PORT}/api/db-test`);
  console.log(`🌊 Inundaciones data: http://localhost:${PORT}/api/inundaciones`);
});
