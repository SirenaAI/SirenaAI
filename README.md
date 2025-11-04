# SirenaAI# SirenaAI# SirenaAI



Sistema de monitoreo y predicción de inundaciones en Argentina con inteligencia artificial.



## 🌊 DescripciónSistema de monitoreo y predicción de inundaciones en Argentina con inteligencia artificial.## Estructura del Proyecto



SirenaAI es una aplicación web fullstack que proporciona información en tiempo real sobre riesgos de inundaciones en Argentina. Utiliza datos históricos y modelos de predicción para ayudar a las comunidades a estar preparadas ante eventos climáticos extremos.



## 🛠️ Stack Tecnológico## 🌊 Descripción```



### Frontend├── client/          # Frontend React con Vite

- **React 18** - Librería UI

- **Vite** - Build tool y dev serverSirenaAI es una aplicación web fullstack que proporciona información en tiempo real sobre riesgos de inundaciones en Argentina. Utiliza datos históricos y modelos de predicción para ayudar a las comunidades a estar preparadas ante eventos climáticos extremos.├── server/          # Backend Express.js

- **React Router** - Navegación

- **OpenLayers** - Mapas interactivos├── package.json     # package.json raíz con scripts

- **EmailJS** - Servicio de contacto

- **Google OAuth** - Autenticación## 🛠️ Stack Tecnológico└── README.md        # Este archivo



### Backend```

- **Node.js** con **Express** - Servidor API

- **PostgreSQL** - Base de datos### Frontend

- **JWT** - Autenticación

- **bcrypt** - Encriptación de contraseñas- **React 18** - Librería UI## Comenzar

- **Google Auth Library** - OAuth backend

- **Vite** - Build tool y dev server

## 📁 Estructura del Proyecto

- **React Router** - Navegación### Prerequisitos

```

├── client/          # Frontend React con Vite- **OpenLayers** - Mapas interactivos- Node.js (v16 o superior)

│   ├── src/

│   │   ├── components/  # Componentes React- **EmailJS** - Servicio de contacto- npm

│   │   ├── contexts/    # Context API

│   │   ├── hooks/       # Custom hooks- **Google OAuth** - Autenticación

│   │   ├── styles/      # Estilos globales

│   │   └── utils/       # Utilidades### Instalación

│   └── public/          # Assets estáticos

│### Backend

├── server/          # Backend Express.js

│   └── src/- **Node.js** con **Express** - Servidor API1. Instalar todas las dependencias:

│       └── index.js     # Servidor principal

│- **PostgreSQL** - Base de datos```bash

└── package.json     # Scripts del workspace

```- **JWT** - Autenticaciónnpm run install:all



## 🚀 Desarrollo Local- **bcrypt** - Encriptación de contraseñas```



### Prerequisitos- **Google Auth Library** - OAuth backend

- Node.js v16 o superior

- npm o yarn### Desarrollo



### Instalación## 📁 Estructura del Proyecto



1. Clonar el repositorio:1. Iniciar cliente y servidor en modo desarrollo:

```bash

git clone https://github.com/SirenaAI/SirenaAI.git``````bash

cd SirenaAI

```├── client/          # Frontend React con Vitenpm run dev



2. Instalar dependencias:│   ├── src/```

```bash

npm run install:all│   │   ├── components/  # Componentes React

```

│   │   ├── contexts/    # Context APIEsto iniciará:

3. Iniciar en modo desarrollo:

```bash│   │   ├── hooks/       # Custom hooks- Servidor Express en http://localhost:3001

npm run dev

```│   │   ├── styles/      # Estilos globales- Servidor de desarrollo Vite en http://localhost:5173



Esto iniciará:│   │   └── utils/       # Utilidades

- Backend en http://localhost:3001

- Frontend en http://localhost:5173│   └── public/          # Assets estáticos### Comandos Individuales



## 📜 Scripts Disponibles│



### Workspace completo├── server/          # Backend Express.js#### Servidor (Express.js)

```bash

npm run dev              # Iniciar cliente y servidor│   └── src/```bash

npm run install:all      # Instalar todas las dependencias

npm run lint             # Lint de todo el proyecto│       └── index.js     # Servidor principalcd server

```

│npm run dev    # Modo desarrollo con nodemon

### Backend

```bash└── package.json     # Scripts del workspacenpm start      # Modo producción

cd server

npm run dev      # Desarrollo con nodemon```npm run lint   # ESLint

npm start        # Producción

npm run lint     # ESLint```

```

## 🚀 Comenzar

### Frontend

```bash#### Cliente (React + Vite)

cd client

npm run dev      # Servidor de desarrollo### Prerequisitos```bash

npm run build    # Build de producción

npm run preview  # Vista previa del build- Node.js v16 o superiorcd client

npm run lint     # ESLint

```- npm o yarnnpm run dev      # Servidor de desarrollo



## 🔒 Seguridad- PostgreSQLnpm run build    # Build de producción



- Las contraseñas se encriptan con bcrypt- Cuenta de Google Cloud (para OAuth)npm run preview  # Vista previa del build

- JWT para manejo de sesiones

- Google OAuth para autenticación segura- Cuenta de EmailJS (para formulario de contacto)npm run lint     # ESLint

- Variables de entorno para datos sensibles

- CORS configurado apropiadamente```



## 🤝 Contribuir### Instalación



Las contribuciones son bienvenidas. Por favor:## Características



1. Fork el proyecto1. Clonar el repositorio:

2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)

3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)```bash### Frontend (React + Vite)

4. Push a la rama (`git push origin feature/AmazingFeature`)

5. Abre un Pull Requestgit clone https://github.com/SirenaAI/SirenaAI.git- ⚡️ Vite para desarrollo y construcción rápidos



## 📝 Licenciacd SirenaAI- ⚛️ React 18



Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.```- 🔧 ESLint para calidad de código



## 👥 Equipo



Desarrollado por el equipo SirenaAI2. Instalar todas las dependencias:### Backend (Express.js)



---```bash- 🚀 Servidor Express.js



⭐ Si este proyecto te resulta útil, considera darle una estrella en GitHub!npm run install:all- 🔧 ESLint para calidad de código


```- 🔄 Recarga automática con nodemon

- 🛡️ CORS habilitado

3. Configurar variables de entorno:- 📝 Middleware de parsing JSON



**Server (.env):**## Scripts

```env

PORT=3001- `npm run dev` - Iniciar cliente y servidor

GOOGLE_CLIENT_ID=tu_client_id- `npm run build` - Construir cliente para producción

JWT_SECRET=tu_secret_super_seguro- `npm start` - Iniciar servidor en modo producción

PGHOST=tu_host- `npm run lint` - Lint de cliente y servidor

PGDATABASE=nombre_db- `npm run install:all` - Instalar dependencias para raíz, cliente y servidor

PGUSER=usuario

PGPASSWORD=contraseña## Stack Tecnológico

```

- **Frontend**: React, Vite, ESLint

**Client (.env.local):**- **Backend**: Node.js, Express.js, ESLint

```env- **Desarrollo**: Concurrently, Nodemon

VITE_BACKEND_URL=http://localhost:3001
VITE_GOOGLE_CLIENT_ID=tu_client_id
VITE_EMAILJS_SERVICE_ID=tu_service_id
VITE_EMAILJS_TEMPLATE_ID=tu_template_id
VITE_EMAILJS_PUBLIC_KEY=tu_public_key
```

4. Iniciar en modo desarrollo:
```bash
npm run dev
```

Esto iniciará:
- Backend en http://localhost:3001
- Frontend en http://localhost:5173

## 📜 Scripts Disponibles

### Workspace completo
```bash
npm run dev              # Iniciar cliente y servidor
npm run install:all      # Instalar todas las dependencias
npm run lint             # Lint de todo el proyecto
```

### Backend
```bash
cd server
npm run dev      # Desarrollo con nodemon
npm start        # Producción
npm run lint     # ESLint
```

### Frontend
```bash
cd client
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run preview  # Vista previa del build
npm run lint     # ESLint
```

## 📖 Documentación Adicional

- [Configuración de Google OAuth](./GOOGLE_OAUTH_SETUP.md)
- [Configuración de EmailJS](./EMAILJS_SETUP.md)
- [Deployment en Vercel](./VERCEL_ENV_SETUP.md)

## 🔒 Seguridad

- Las contraseñas se encriptan con bcrypt
- JWT para manejo de sesiones
- Google OAuth para autenticación segura
- Variables de entorno para datos sensibles
- CORS configurado apropiadamente

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👥 Equipo

Desarrollado por el equipo SirenaAI

---

⭐ Si este proyecto te resulta útil, considera darle una estrella en GitHub!
