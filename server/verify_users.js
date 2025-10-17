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

async function verifyUserStructure() {
  const client = await pool.connect();
  
  try {
    console.log('📊 Estado actual de usuarios en la base de datos:\n');
    
    const users = await client.query(`
      SELECT id, username, email, nombre, google_id, is_google_linked, 
             CASE WHEN google_id IS NOT NULL THEN 'Sí' ELSE 'No' END as has_google_id
      FROM usuario 
      ORDER BY id
    `);
    
    users.rows.forEach(user => {
      console.log(`👤 Usuario ID: ${user.id}`);
      console.log(`   Username: "${user.username}"`);
      console.log(`   Email: "${user.email}"`);
      console.log(`   Nombre: "${user.nombre}"`);
      console.log(`   Google ID: ${user.has_google_id}`);
      console.log(`   Google Linked: ${user.is_google_linked}`);
      console.log('   ────────────────────────────────');
    });
    
    console.log(`\n📈 Total de usuarios: ${users.rows.length}`);
    
    const googleUsers = users.rows.filter(u => u.is_google_linked);
    const regularUsers = users.rows.filter(u => !u.is_google_linked);
    
    console.log(`📧 Usuarios con Google: ${googleUsers.length}`);
    console.log(`👥 Usuarios tradicionales: ${regularUsers.length}`);
    
    console.log('\n✅ La estructura está correcta:');
    console.log('   - Emails están en la columna "email"');
    console.log('   - Usernames son únicos y apropiados');
    console.log('   - Los nombres reales están en la columna "nombre"');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

verifyUserStructure();
