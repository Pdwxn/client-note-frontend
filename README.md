# Client Notes

Client Notes es una aplicación tipo Notion enfocada en freelancers para gestionar clientes, proyectos y notas asociadas a cada interacción.

Permite centralizar información clave como datos de contacto, reuniones, llamadas, ideas y contratos en una interfaz minimalista y organizada.

## Features

- Autenticación con JWT
- Gestión de clientes: crear, editar y eliminar
- Notas asociadas a cada cliente
- Tipos de notas: `idea`, `meeting`, `call`, `contract`
- Filtrado y ordenamiento de notas
- Aislamiento de datos por usuario
- UI minimalista inspirada en Notion

## Tech Stack

### Frontend
- Next.js 15
- React 19
- TypeScript
- TailwindCSS v4
- React Query
- Axios

### Backend
- Django REST Framework
- PostgreSQL
- JWT Authentication

### Link al Backend
https://github.com/Pdwxn/client-note-api

## Arquitectura Frontend

El frontend está organizado por features:

```txt
src/
├── app/
├── features/
│   ├── auth/
│   ├── clients/
│   └── notes/
└── shared/
    ├── components/
    ├── hooks/
    └── utils/
