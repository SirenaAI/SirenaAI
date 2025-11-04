# SirenaAI

Sistema de monitoreo y predicción de inundaciones en Argentina con inteligencia artificial.

## 🌊 Descripción

SirenaAI es una aplicación web fullstack que proporciona información en tiempo real sobre riesgos de inundaciones en Argentina. Utiliza datos históricos y modelos de predicción para ayudar a las comunidades a estar preparadas ante eventos climáticos extremos.

## 🛠️ Stack Tecnológico

### Frontend
- React 18
- Vite
- React Router
- OpenLayers
- EmailJS
- Google OAuth

### Backend
- Node.js con Express
- PostgreSQL
- JWT
- bcrypt
- Google Auth Library

## 📁 Estructura del Proyecto

```
├── client/          # Frontend React con Vite
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   ├── styles/
│   │   └── utils/
│   └── public/
│
├── server/          # Backend Express.js
│   └── src/
│       └── index.js
│
└── package.json
```

## 🚀 Desarrollo Local

### Prerequisitos
- Node.js v16 o superior
- npm o yarn

### Instalación

1. Clonar el repositorio
2. Instalar dependencias: `npm run install:all`
3. Iniciar en modo desarrollo: `npm run dev`

Esto iniciará:
- Backend en http://localhost:3001
- Frontend en http://localhost:5173

## 📜 Scripts Disponibles

### Workspace completo
- `npm run dev` - Iniciar cliente y servidor
- `npm run install:all` - Instalar todas las dependencias
- `npm run lint` - Lint de todo el proyecto

### Backend
- `cd server && npm run dev` - Desarrollo con nodemon
- `cd server && npm start` - Producción
- `cd server && npm run lint` - ESLint

### Frontend
- `cd client && npm run dev` - Servidor de desarrollo
- `cd client && npm run build` - Build de producción
- `cd client && npm run preview` - Vista previa del build
- `cd client && npm run lint` - ESLint

## 🔒 Seguridad

- Las contraseñas se encriptan con bcrypt
- JWT para manejo de sesiones
- Google OAuth para autenticación segura
- Variables de entorno para datos sensibles
- CORS configurado apropiadamente

## 🤝 Contribuir

Las contribuciones son bienvenidas:

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.

## 👥 Equipo

Desarrollado por el equipo SirenaAI

---

⭐ Si este proyecto te resulta útil, considera darle una estrella en GitHub!
