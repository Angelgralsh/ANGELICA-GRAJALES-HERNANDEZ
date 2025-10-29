# 🎬 Cinema Management API

Sistema de gestión de cine desarrollado con Node.js, Express y TypeScript. Implementa el patrón Repository para la gestión de películas, funciones, salas, usuarios y tickets.

## 📋 Entidades

- **Usuario**: Cliente que compra tickets
- **Película**: Películas disponibles para ver
- **Sala**: Lugar físico donde se proyectan las películas
- **Función**: Proyección de una película en una sala a una hora específica
- **Ticket**: Boleto comprado para una función

## 🏗️ Arquitectura

El proyecto sigue una arquitectura en capas:

```
src/
├── config/          # Configuraciones
├── models/          # Modelos e interfaces TypeScript
├── repositories/    # Repository Pattern - Acceso a datos
├── services/        # Lógica de negocio
├── controllers/     # Controladores HTTP
├── routes/          # Definición de rutas
└── index.ts         # Punto de entrada
```

## 🚀 Instalación

### Requisitos previos
- Node.js v16 o superior
- npm o yarn

### Pasos de instalación

1. Clonar el repositorio o navegar a la carpeta del proyecto:
```bash
cd cinema-management
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
```

4. Iniciar el servidor en modo desarrollo:
```bash
npm run dev
```

5. O compilar y ejecutar en producción:
```bash
npm run build
npm start
```

## 📡 API Endpoints

### Base URL
```
http://localhost:3000/api
```

### 🎥 Películas

#### Listar todas las películas
```http
GET /api/peliculas
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "titulo": "Película ejemplo",
      "descripcion": "Descripción de la película",
      "duracion": 120,
      "genero": "Acción",
      "director": "Director Name",
      "clasificacion": "PG-13",
      "fechaEstreno": "2024-01-15T00:00:00.000Z",
      "imagen": "url-imagen",
      "activo": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "count": 1
}
```

#### Obtener película por ID
```http
GET /api/peliculas/:id
```

#### Crear película
```http
POST /api/peliculas
Content-Type: application/json

{
  "titulo": "Avatar 3",
  "descripcion": "La continuación de la saga Avatar",
  "duracion": 180,
  "genero": "Ciencia Ficción",
  "director": "James Cameron",
  "clasificacion": "PG-13",
  "fechaEstreno": "2024-12-20",
  "imagen": "https://ejemplo.com/avatar3.jpg"
}
```

**Respuesta exitosa (201):**
```json
{
  "success": true,
  "message": "Película creada exitosamente",
  "data": {
    "id": "uuid-generado",
    "titulo": "Avatar 3",
    ...
  }
}
```

#### Actualizar película
```http
PUT /api/peliculas/:id
Content-Type: application/json

{
  "titulo": "Avatar 3: The Way of Water",
  "duracion": 195
}
```

#### Eliminar película (Soft Delete)
```http
DELETE /api/peliculas/:id
```

#### Obtener películas por género
```http
GET /api/peliculas/genero/:genero
```

---

### 🎭 Funciones

#### Listar todas las funciones
```http
GET /api/funciones
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "peliculaId": "uuid-pelicula",
      "salaId": "uuid-sala",
      "fechaHora": "2024-12-20T19:30:00.000Z",
      "precio": 8500,
      "asientosDisponibles": 95,
      "activo": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "count": 1
}
```

#### Obtener función por ID (con detalles)
```http
GET /api/funciones/:id
```

**Respuesta incluye detalles de película y sala:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "peliculaId": "uuid-pelicula",
    "salaId": "uuid-sala",
    "fechaHora": "2024-12-20T19:30:00.000Z",
    "precio": 8500,
    "asientosDisponibles": 95,
    "activo": true,
    "pelicula": {
      "id": "uuid",
      "titulo": "Avatar 3",
      "duracion": 180,
      "genero": "Ciencia Ficción",
      "clasificacion": "PG-13"
    },
    "sala": {
      "id": "uuid",
      "nombre": "Sala 1",
      "capacidad": 100,
      "tipo": "3D"
    }
  }
}
```

#### Crear función
```http
POST /api/funciones
Content-Type: application/json

{
  "peliculaId": "uuid-pelicula",
  "salaId": "uuid-sala",
  "fechaHora": "2024-12-25T20:00:00.000Z",
  "precio": 10000,
  "asientosDisponibles": 100
}
```

**Validaciones:**
- La película debe existir y estar activa
- La sala debe existir y estar activa
- La fecha debe ser futura
- El precio debe ser mayor a 0
- Los asientos no pueden exceder la capacidad de la sala

#### Actualizar función
```http
PUT /api/funciones/:id
Content-Type: application/json

{
  "precio": 12000,
  "asientosDisponibles": 80
}
```

#### Eliminar función (Soft Delete)
```http
DELETE /api/funciones/:id
```

#### Obtener funciones por película
```http
GET /api/funciones/pelicula/:peliculaId
```

#### Obtener próximas funciones
```http
GET /api/funciones/proximas
```

Retorna todas las funciones con fecha futura, incluyendo detalles de película y sala.

#### Obtener funciones por fecha
```http
GET /api/funciones/fecha?fecha=2024-12-25
```

---

### 🏥 Health Check

#### Verificar estado del servidor
```http
GET /api/health
```

**Respuesta (200):**
```json
{
  "success": true,
  "message": "API Cinema Management funcionando correctamente",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

## 🧪 Probar con Postman

### Colección de ejemplos

1. **Crear Película**
   - Method: `POST`
   - URL: `http://localhost:3000/api/peliculas`
   - Body (JSON):
   ```json
   {
     "titulo": "The Matrix Resurrections",
     "descripcion": "Neo debe regresar a Matrix",
     "duracion": 148,
     "genero": "Ciencia Ficción",
     "director": "Lana Wachowski",
     "clasificacion": "R",
     "fechaEstreno": "2021-12-22",
     "imagen": "https://example.com/matrix.jpg"
   }
   ```

2. **Listar Películas**
   - Method: `GET`
   - URL: `http://localhost:3000/api/peliculas`

3. **Crear Función**
   - Method: `POST`
   - URL: `http://localhost:3000/api/funciones`
   - Body (JSON):
   ```json
   {
     "peliculaId": "[ID-de-película-creada]",
     "salaId": "[ID-de-sala-existente]",
     "fechaHora": "2024-12-25T19:30:00.000Z",
     "precio": 9500,
     "asientosDisponibles": 80
   }
   ```

4. **Listar Próximas Funciones**
   - Method: `GET`
   - URL: `http://localhost:3000/api/funciones/proximas`

5. **Actualizar Película**
   - Method: `PUT`
   - URL: `http://localhost:3000/api/peliculas/[ID]`
   - Body (JSON):
   ```json
   {
     "titulo": "The Matrix Resurrections - Extended",
     "duracion": 158
   }
   ```

6. **Eliminar Función**
   - Method: `DELETE`
   - URL: `http://localhost:3000/api/funciones/[ID]`

---

## 📚 Estructura del código

### Repository Pattern

Cada entidad tiene su propio repositorio que implementa la interfaz `IRepository`:

```typescript
interface IRepository<T> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  create(data: Partial<T>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<boolean>;
}
```

### Service Layer

Los servicios contienen la lógica de negocio y validaciones:
- `PeliculaService`: Gestión de películas
- `FuncionService`: Gestión de funciones con validaciones cruzadas

### Controllers

Los controladores manejan las peticiones HTTP y respuestas:
- `PeliculaController`
- `FuncionController`

---

## 🔧 Scripts disponibles

```bash
# Desarrollo con recarga automática
npm run dev

# Compilar TypeScript
npm run build

# Ejecutar versión compilada
npm start
```

---

## 🌟 Características

- ✅ Repository Pattern implementado
- ✅ TypeScript para type safety
- ✅ Arquitectura en capas (MVC)
- ✅ Validaciones de negocio
- ✅ Soft deletes
- ✅ Manejo de errores centralizado
- ✅ CORS habilitado
- ✅ Logging de peticiones
- ✅ DTOs para crear y actualizar entidades
- ✅ Relaciones entre entidades (Película ↔ Función ↔ Sala)

---

## 📝 Notas

- Los datos se almacenan en memoria (puedes migrar a una base de datos real)
- Las salas se inicializan automáticamente al arrancar
- Todas las eliminaciones son "soft deletes" (marcado como inactivo)
- Las fechas deben estar en formato ISO 8601

---

## 👥 Autor

Desarrollado siguiendo las mejores prácticas de Node.js y TypeScript.

---

## 📄 Licencia

ISC
