# Configuración de Google Cloud Consol### 5. Copiar ID de cliente
1. Una vez creado, copia el "ID de cliente"
2. Se ve algo así: `97705615479-0dk89a0sm0tdv1fgmdoemp62qsaomuni.apps.googleusercontent.com`

### 6. Configurar variables de entorno

#### Servidor (backend):
Edita `server/.env`:
```env
GOOGLE_CLIENT_ID=97705615479-0dk89a0sm0tdv1fgmdoemp62qsaomuni.apps.googleusercontent.com
```

#### Cliente (frontend):
Crea `client/.env.local`:
```env
VITE_GOOGLE_CLIENT_ID=97705615479-0dk89a0sm0tdv1fgmdoemp62qsaomuni.apps.googleusercontent.com
VITE_BACKEND_URL=http://localhost:3001
```ra usar Google Identity Services en tu aplicación SirenaAI, necesitas configurar un proyecto en Google Cloud Console.

## Pasos para configurar Google OAuth:

### 1. Crear un proyecto en Google Cloud Console
1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Asegúrate de que el proyecto esté seleccionado

### 2. Habilitar Google+ API
1. Ve a "APIs & Services" > "Library"
2. Busca "Google+ API" 
3. Haz clic en "Enable"

### 3. Configurar OAuth Consent Screen
1. Ve a "APIs & Services" > "OAuth consent screen"
2. Selecciona "External" (a menos que tengas Google Workspace)
3. Llena la información requerida:
   - **App name**: SirenaAI
   - **User support email**: tu email
   - **Developer contact information**: tu email
4. Guarda y continúa

### 4. Crear credenciales OAuth 2.0
1. Ve a "APIs & Services" > "Credentials"
2. Haz clic en "Create Credentials" > "OAuth 2.0 Client IDs"
3. Selecciona "Web application"
4. Configura:
   - **Name**: SirenaAI Web Client
   - **Authorized JavaScript origins**: 
     - `http://localhost:5173` (para desarrollo)
     - `https://tu-dominio.com` (para producción)
   - **Authorized redirect URIs**:
     - `http://localhost:5173` (para desarrollo)
     - `https://tu-dominio.com` (para producción)

### 5. Copiar Client ID
1. Una vez creado, copia el "Client ID"
2. Se ve algo así: `123456789-abcdefg.apps.googleusercontent.com`

### 6. Configurar variables de entorno

#### Servidor (backend):
Edita `server/.env`:
```env
GOOGLE_CLIENT_ID=tu_client_id_aqui.apps.googleusercontent.com
```

#### Cliente (frontend):
Crea `client/.env.local`:
```env
VITE_GOOGLE_CLIENT_ID=tu_client_id_aqui.apps.googleusercontent.com
VITE_BACKEND_URL=http://localhost:3001
```

### 7. Actualizar la base de datos
Ejecuta el script SQL que creamos:
```sql
-- Desde tu cliente PostgreSQL
\i server/scripts/update_usuario_table.sql
```

O ejecuta manualmente:
```sql
ALTER TABLE usuario 
ADD COLUMN IF NOT EXISTS google_id VARCHAR(255) UNIQUE,
ADD COLUMN IF NOT EXISTS nombre VARCHAR(255),
ADD COLUMN IF NOT EXISTS avatar_url TEXT,
ADD COLUMN IF NOT EXISTS is_google_linked BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN IF NOT EXISTS ultimo_login TIMESTAMP;

CREATE INDEX IF NOT EXISTS idx_usuario_google_id ON usuario(google_id);
```

## Importante para producción:

### Dominios autorizados
Cuando despliegues a producción, asegúrate de agregar tus dominios reales:
- Frontend: `https://sirenaai-frontend-xxx.vercel.app`
- Backend: `https://sirenaai-backend-xxx.vercel.app`

### Variables de entorno en Vercel
1. Ve a tu proyecto en Vercel
2. Settings > Environment Variables
3. Agrega:
   - `VITE_GOOGLE_CLIENT_ID` (para frontend)
   - `GOOGLE_CLIENT_ID` (para backend)

## Flujo de autenticación implementado:

1. **Usuario nuevo con Google**:
   - Intenta login con Google → Error: "Debes crear credenciales locales"
   - Crea usuario/contraseña local → Puede vincular Google

2. **Usuario existente**:
   - Login tradicional: usuario/contraseña
   - Login con Google: Solo si ya tiene credenciales locales vinculadas

3. **Vinculación**:
   - Usuario con credenciales locales puede vincular Google
   - Una vez vinculado, puede usar cualquiera de los dos métodos
