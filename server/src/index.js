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

// Login endpoint - Authenticate user
app.post('/api/login', async (req, res) => {
  try {
    const { usuario } = req.body;
    
    if (!usuario) {
      return res.status(400).json({
        status: 'error',
        message: 'Usuario es requerido',
        timestamp: new Date().toISOString()
      });
    }

    const client = await pool.connect();
    const result = await client.query(
      'SELECT * FROM users WHERE usuario = $1',
      [usuario]
    );
    client.release();
    
    if (result.rows.length > 0) {
      // Usuario encontrado - Login exitoso
      res.json({
        status: 'success',
        message: 'Login exitoso',
        user: {
          usuario: result.rows[0].usuario,
        },
        timestamp: new Date().toISOString()
      });
    } else {
      // Usuario no encontrado
      res.status(401).json({
        status: 'error',
        message: 'Usuario no encontrado',
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error('Login query error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error en el servidor durante el login',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Get all users (solo para desarrollo/admin)
app.get('/api/users', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT usuario FROM users'); // Solo devolvemos usuarios, no contraseñas
    client.release();
    
    res.json({
      status: 'success',
      data: result.rows,
      count: result.rows.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Users query error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch users data',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Register new user
app.post('/api/register', async (req, res) => {
  try {
    const { usuario } = req.body;
    
    if (!usuario) {
      return res.status(400).json({
        status: 'error',
        message: 'Usuario es requerido',
        timestamp: new Date().toISOString()
      });
    }

    const client = await pool.connect();
    
    // Verificar si el usuario ya existe
    const existingUser = await client.query(
      'SELECT usuario FROM users WHERE usuario = $1',
      [usuario]
    );
    
    if (existingUser.rows.length > 0) {
      client.release();
      return res.status(409).json({
        status: 'error',
        message: 'El usuario ya existe',
        timestamp: new Date().toISOString()
      });
    }

    // Insertar nuevo usuario
    const result = await client.query(
      'INSERT INTO users (usuario) VALUES ($1) RETURNING usuario',
      [usuario]
    );
    client.release();
    
    res.status(201).json({
      status: 'success',
      message: 'Usuario registrado exitosamente',
      user: {
        usuario: result.rows[0].usuario
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Register query error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error en el servidor durante el registro',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🗄️ Database test: http://localhost:${PORT}/api/db-test`);
  console.log(`🌊 Inundaciones data: http://localhost:${PORT}/api/inundaciones`);
});
