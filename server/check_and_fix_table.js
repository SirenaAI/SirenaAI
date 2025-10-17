import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
  host: process.env.PGHOST,
  port: 5432,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  ssl: { rejectUnauthorized: false }
});

async function checkAndFixTable() {
  const client = await pool.connect();
  
  try {
    console.log('🔍 Verificando estructura actual de la tabla usuario...');
    
    // Verificar si existe la columna email
    const columnCheck = await client.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns 
      WHERE table_name = 'usuario' 
      AND table_schema = 'public'
      ORDER BY ordinal_position;
    `);
    
    console.log('📋 Columnas actuales:');
    columnCheck.rows.forEach(col => {
      console.log(`  - ${col.column_name}: ${col.data_type} (${col.is_nullable === 'YES' ? 'nullable' : 'not null'})`);
    });
    
    // Verificar si la columna email existe
    const hasEmailColumn = columnCheck.rows.some(col => col.column_name === 'email');
    
    if (!hasEmailColumn) {
      console.log('\n➕ Agregando columna email...');
      await client.query('ALTER TABLE usuario ADD COLUMN email VARCHAR(255);');
      console.log('✅ Columna email agregada');
    } else {
      console.log('\n✅ La columna email ya existe');
    }
    
    // Crear índice para email si no existe
    try {
      await client.query('CREATE INDEX IF NOT EXISTS idx_usuario_email ON usuario(email);');
      console.log('✅ Índice para email creado');
    } catch (err) {
      console.log('ℹ️ Índice ya existe o no se pudo crear');
    }
    
    // Mostrar usuarios actuales
    console.log('\n👥 Usuarios actuales en la base de datos:');
    const users = await client.query('SELECT id, username, email, nombre, google_id, is_google_linked FROM usuario ORDER BY id;');
    
    users.rows.forEach(user => {
      console.log(`  - ID: ${user.id}`);
      console.log(`    Username: ${user.username}`);
      console.log(`    Email: ${user.email}`);
      console.log(`    Nombre: ${user.nombre}`);
      console.log(`    Google ID: ${user.google_id ? 'Sí' : 'No'}`);
      console.log(`    Google Linked: ${user.is_google_linked}`);
      console.log('    ---');
    });
    
    // Corregir usuarios de Google que tienen email en username
    console.log('\n🔧 Corrigiendo usuarios de Google...');
    const googleUsers = await client.query(`
      SELECT id, username, email, nombre, google_id 
      FROM usuario 
      WHERE is_google_linked = TRUE 
      AND username LIKE '%@%' 
      AND (email IS NULL OR email = '')
    `);
    
    if (googleUsers.rows.length > 0) {
      console.log(`📧 Encontrados ${googleUsers.rows.length} usuarios de Google para corregir:`);
      
      for (const user of googleUsers.rows) {
        // Extraer nombre de usuario del email (parte antes del @)
        const emailParts = user.username.split('@');
        const newUsername = emailParts[0];
        const email = user.username;
        
        console.log(`  🔄 Corrigiendo usuario ID ${user.id}:`);
        console.log(`     Username: "${user.username}" → "${newUsername}"`);
        console.log(`     Email: "${user.email}" → "${email}"`);
        
        await client.query(`
          UPDATE usuario 
          SET username = $1, email = $2 
          WHERE id = $3
        `, [newUsername, email, user.id]);
        
        console.log(`     ✅ Corregido`);
      }
    } else {
      console.log('ℹ️ No hay usuarios de Google que necesiten corrección');
    }
    
    // Mostrar resultado final
    console.log('\n📊 Estado final de la base de datos:');
    const finalUsers = await client.query('SELECT id, username, email, nombre, google_id, is_google_linked FROM usuario ORDER BY id;');
    
    finalUsers.rows.forEach(user => {
      console.log(`  - ID: ${user.id}, Username: "${user.username}", Email: "${user.email}", Nombre: "${user.nombre}"`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

checkAndFixTable();
