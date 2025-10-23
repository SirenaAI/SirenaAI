# 🚀 Configuración de Variables de Entorno en Vercel

## 📋 Instrucciones para configurar Google OAuth en Vercel

### 1️⃣ **Configurar Variables de Entorno en Vercel Dashboard**

1. Ve a tu proyecto en Vercel: https://vercel.com/dashboard
2. Selecciona tu proyecto **SirenaAI** (frontend)
3. Ve a **Settings** → **Environment Variables**
4. Agrega la siguiente variable:

```
Name: VITE_GOOGLE_CLIENT_ID
Value: 97705615479-0dk89a0sm0tdv1fgmdoemp62qsaomuni.apps.googleusercontent.com
Environment: Production, Preview, Development (marca todas)
```

5. Haz clic en **Save**

### 2️⃣ **Configurar Orígenes Autorizados en Google Cloud Console**

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Selecciona tu proyecto
3. Ve a **APIs y servicios** → **Credenciales**
4. Edita tu **Client ID OAuth 2.0**
5. En **Orígenes de JavaScript autorizados**, agrega:

```
https://sirenaai.vercel.app
https://*.vercel.app (para previews)
http://localhost:5173 (para desarrollo)
```

6. En **URIs de redirección autorizadas** (si es necesario):

```
https://sirenaai.vercel.app
https://*.vercel.app
http://localhost:5173
```

7. Guarda los cambios

### 3️⃣ **Redesplegar la aplicación**

Después de configurar las variables de entorno en Vercel, necesitas redesplegar:

```bash
npm run deploy:all
```

O simplemente hacer un nuevo commit y push:

```bash
git add .
git commit -m "Add Google Client ID to production"
git push
```

Vercel automáticamente detectará los cambios y redesplegará.

### 4️⃣ **Verificar que funciona**

1. Espera a que termine el deploy (unos 2-3 minutos)
2. Ve a tu sitio: https://sirenaai.vercel.app
3. Haz clic en "Iniciar Sesión"
4. El botón de Google debería aparecer correctamente
5. Al hacer clic, debería abrir la ventana de Google OAuth

---

## 🔍 **Debugging**

Si sigue sin funcionar:

1. **Verifica en el navegador:**
   - Abre la consola del navegador (F12)
   - Ve a la pestaña **Network**
   - Busca la petición a `accounts.google.com/gsi/button`
   - Verifica que `client_id` NO sea `undefined`

2. **Verifica las variables de entorno:**
   - En Vercel Dashboard → Settings → Environment Variables
   - Asegúrate de que `VITE_GOOGLE_CLIENT_ID` esté configurada
   - Si hiciste cambios, redespliega el proyecto

3. **Verifica Google Cloud Console:**
   - Orígenes autorizados deben incluir tu dominio de Vercel
   - Los cambios pueden tardar hasta 5 minutos en propagarse

---

## ✅ **Checklist**

- [ ] Variable `VITE_GOOGLE_CLIENT_ID` agregada en Vercel
- [ ] Orígenes autorizados configurados en Google Cloud Console
- [ ] Aplicación redesplegada
- [ ] Botón de Google aparece en producción
- [ ] Login con Google funciona correctamente
