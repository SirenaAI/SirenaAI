# SirenaAI

## Estructura del Proyecto

```
├── client/          # Frontend React con Vite
├── server/          # Backend Express.js
├── package.json     # package.json raíz con scripts
└── README.md        # Este archivo
```

## Comenzar

### Prerequisitos
- Node.js (v16 o superior)
- npm

### Instalación

1. Instalar todas las dependencias:
```bash
npm run install:all
```

### Desarrollo

1. Iniciar cliente y servidor en modo desarrollo:
```bash
npm run dev
```

Esto iniciará:
- Servidor Express en http://localhost:3001
- Servidor de desarrollo Vite en http://localhost:5173

### Comandos Individuales

#### Servidor (Express.js)
```bash
cd server
npm run dev    # Modo desarrollo con nodemon
npm start      # Modo producción
npm run lint   # ESLint
```

#### Cliente (React + Vite)
```bash
cd client
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run preview  # Vista previa del build
npm run lint     # ESLint
```

## Características

### Frontend (React + Vite)
- ⚡️ Vite para desarrollo y construcción rápidos
- ⚛️ React 18
- 🔧 ESLint para calidad de código

### Backend (Express.js)
- 🚀 Servidor Express.js
- 🔧 ESLint para calidad de código
- 🔄 Recarga automática con nodemon
- 🛡️ CORS habilitado
- 📝 Middleware de parsing JSON

## Scripts

- `npm run dev` - Iniciar cliente y servidor
- `npm run build` - Construir cliente para producción
- `npm start` - Iniciar servidor en modo producción
- `npm run lint` - Lint de cliente y servidor
- `npm run install:all` - Instalar dependencias para raíz, cliente y servidor

## Stack Tecnológico

- **Frontend**: React, Vite, ESLint
- **Backend**: Node.js, Express.js, ESLint
- **Desarrollo**: Concurrently, Nodemon
