import dotenv from 'dotenv';
import pkg from 'pg';
const { Client } = pkg;

dotenv.config();

async function migrateData() {
  const client = new Client({
    host: process.env.PGHOST,
    port: 5432,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('✅ Conectado a la base de datos');
    
    // Obtener datos de 'users' que no están en 'usuario'
    const usersData = await client.query(`
      SELECT u.* FROM users u 
      WHERE NOT EXISTS (
        SELECT 1 FROM usuario usr 
        WHERE usr.username = u.username
      );
    `);
    
    console.log(`\n📦 Encontrados ${usersData.rows.length} usuarios para migrar de 'users' a 'usuario':`);
    
    for (const user of usersData.rows) {
      console.log(`- Migrando: ${user.username}`);
      
      // Insertar en 'usuario' con valores por defecto para columnas de Google OAuth
      await client.query(`
        INSERT INTO usuario (
          username, email, password, google_id, photo_url, 
          created_at, updated_at, nombre, avatar_url, 
          is_google_linked, fecha_creacion, ultimo_login
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
        );
      `, [
        user.email,
        user.username,
        user.password,
        user.google_id,
        user.photo_url,
        user.created_at,
        user.updated_at,
        null, // nombre (se llenará con Google OAuth)
        null, // avatar_url (se llenará con Google OAuth)
        false, // is_google_linked
        user.created_at || new Date(), // fecha_creacion
        null // ultimo_login
      ]);
      
      console.log(`  ✅ Usuario ${user.nombre} migrado exitosamente`);
    }
    
    // Verificar migración
    const finalCount = await client.query('SELECT COUNT(*) FROM usuario;');
    console.log(`\n✅ Migración completada. Total de usuarios en 'usuario': ${finalCount.rows[0].count}`);
    
    // Mostrar todos los usuarios en 'usuario'
    const allUsers = await client.query('SELECT id, username, email, is_google_linked FROM usuario ORDER BY id;');
    console.log('\n👥 Usuarios en tabla "usuario":');
    allUsers.rows.forEach(row => {
      console.log(`- ID: ${row.id}, Username: ${row.username}, Email: ${row.email}, Google: ${row.is_google_linked}`);
    });
    
    console.log('\n🗑️ Ahora puedes eliminar la tabla "users" si quieres:');
    console.log('DROP TABLE users;');
    
  } catch (error) {
    console.error('❌ Error en migración:', error.message);
  } finally {
    await client.end();
  }
}

migrateData();
