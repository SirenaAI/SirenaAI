# Configuración de EmailJS para el Formulario de Contacto

Este documento explica cómo configurar EmailJS para que el formulario de contacto envíe emails a sirenaai2025@gmail.com.

## Paso 1: Crear cuenta en EmailJS

1. Ve a [EmailJS](https://www.emailjs.com/)
2. Haz clic en "Sign Up" y crea una cuenta gratuita
3. Verifica tu email

## Paso 2: Conectar tu servicio de Email

1. En el dashboard de EmailJS, ve a "Email Services"
2. Haz clic en "Add New Service"
3. Selecciona **Gmail** (o el proveedor que prefieras)
4. Sigue las instrucciones para conectar tu cuenta de Gmail (sirenaai2025@gmail.com)
5. Copia el **Service ID** que se genera

## Paso 3: Crear un Template de Email

1. Ve a "Email Templates" en el dashboard
2. Haz clic en "Create New Template"
3. Configura el template con los siguientes campos:

**Subject (Asunto):**
```
Nuevo mensaje de contacto de {{from_name}}
```

**Content (Contenido):**
```
Has recibido un nuevo mensaje de contacto desde SIRENA:

Nombre: {{from_name}}
Email: {{from_email}}
Teléfono: {{phone}}

Mensaje:
{{message}}

---
Este mensaje fue enviado desde el formulario de contacto de SIRENA AI.
```

**To Email:**
```
sirenaai2025@gmail.com
```

4. Guarda el template y copia el **Template ID**

## Paso 4: Obtener tu Public Key

1. Ve a "Account" en el menú principal
2. En la sección "General", encontrarás tu **Public Key**
3. Cópiala

## Paso 5: Configurar las Variables de Entorno

1. En la carpeta `client/`, crea un archivo `.env.local` (si no existe)
2. Agrega las siguientes variables con los valores que copiaste:

```bash
VITE_EMAILJS_SERVICE_ID=tu_service_id_aqui
VITE_EMAILJS_TEMPLATE_ID=tu_template_id_aqui
VITE_EMAILJS_PUBLIC_KEY=tu_public_key_aqui
```

3. Guarda el archivo

## Paso 6: Reiniciar el Servidor de Desarrollo

```bash
cd client
npm run dev
```

## Verificación

1. Ve a la página de contacto en tu aplicación
2. Completa el formulario con datos de prueba
3. Haz clic en "Enviar"
4. Deberías recibir un email en sirenaai2025@gmail.com

## Solución de Problemas

### Error: "EmailJS no está configurado"
- Verifica que el archivo `.env.local` existe en la carpeta `client/`
- Verifica que las variables tienen el prefijo `VITE_`
- Reinicia el servidor de desarrollo después de crear/modificar el archivo

### El email no llega
- Verifica que el servicio de Gmail está correctamente conectado en EmailJS
- Revisa la carpeta de spam
- Verifica que el Template ID es correcto
- Revisa los logs del dashboard de EmailJS

### Límites del Plan Gratuito
- EmailJS permite 200 emails por mes en el plan gratuito
- Si necesitas más, considera actualizar a un plan de pago

## Seguridad

⚠️ **Importante:**
- Nunca subas el archivo `.env.local` a Git
- El archivo `.gitignore` ya está configurado para ignorarlo
- Las claves de EmailJS son solo para uso del frontend y tienen rate limiting incorporado

## Recursos Adicionales

- [Documentación de EmailJS](https://www.emailjs.com/docs/)
- [Dashboard de EmailJS](https://dashboard.emailjs.com/)
