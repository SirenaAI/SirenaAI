-- Script para actualizar la tabla usuario para soportar Google OAuth
-- Manteniendo las credenciales locales como obligatorias

-- Agregar columnas para Google OAuth
ALTER TABLE usuario 
ADD COLUMN IF NOT EXISTS google_id VARCHAR(255) UNIQUE,
ADD COLUMN IF NOT EXISTS nombre VARCHAR(255),
ADD COLUMN IF NOT EXISTS avatar_url TEXT,
ADD COLUMN IF NOT EXISTS is_google_linked BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN IF NOT EXISTS ultimo_login TIMESTAMP;

-- Crear índice para Google ID para mejorar performance
CREATE INDEX IF NOT EXISTS idx_usuario_google_id ON usuario(google_id);

-- Agregar comentarios para documentar el esquema
COMMENT ON COLUMN usuario.google_id IS 'Google OAuth ID único del usuario';
COMMENT ON COLUMN usuario.nombre IS 'Nombre completo del usuario obtenido de Google';
COMMENT ON COLUMN usuario.avatar_url IS 'URL del avatar del usuario de Google';
COMMENT ON COLUMN usuario.is_google_linked IS 'Indica si el usuario ha vinculado su cuenta con Google';

-- IMPORTANTE: NO hacemos password opcional - mantenemos credenciales locales obligatorias
-- Esto significa que incluso usuarios que usen Google deben tener usuario/contraseña local
