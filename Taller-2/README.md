# 🛩️ Sistema de Gestión de Aerolínea

API REST para gestionar vuelos, pasajeros, aeropuertos y reservas de una aerolínea.

## 🚀 Instalación

```bash
npm install        # Instalar 
npm run start:dev  # Ejecutar servidor en http://localhost:3000
```

## 📋 Módulos del Sistema

- **Vuelos**: Crear, consultar y actualizar vuelos
- **Pasajeros**: Registrar clientes y manejar puntos de fidelidad  
- **Aeropuertos**: Gestionar información de aeropuertos
- **Reservas**: Crear y cancelar reservas

---

## 🛣️ Endpoints

### ✈️ **Vuelos**

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/flights` | Listar vuelos (filtros: origin, date, nonstop, limit) |
| `GET` | `/flights/:id` | Ver detalles de un vuelo |
| `POST` | `/flights` | Crear vuelo nuevo |
| `POST` | `/flights/:id/passengers` | Agregar pasajero al vuelo |
| `PATCH` | `/flights/:id` | Actualizar información del vuelo |
| `PATCH` | `/flights/:id/status` | Cambiar estado del vuelo |

**Ejemplo:**
```json
POST /flights
{
  "origin": "BOG",
  "destination": "MDE", 
  "departureDate": "2025-12-25T14:30:00Z",
  "aircraft": "A320"
}
```

### 👥 **Pasajeros**

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/passengers` | Listar pasajeros |
| `GET` | `/passengers/:id` | Ver perfil del pasajero |
| `POST` | `/passengers` | Registrar nuevo pasajero |
| `POST` | `/passengers/:id/loyalty` | Agregar puntos de fidelidad |

**Ejemplo:**
```json
POST /passengers
{
  "fullName": "Juan Carlos Pérez",
  "email": "juan.perez@email.com"
}
```

### 🏢 **Aeropuertos**

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/airports` | Listar aeropuertos |
| `GET` | `/airports/:code` | Ver detalles del aeropuerto (ej: BOG, MDE) |
| `PATCH` | `/airports/:code` | Actualizar información |
| `PATCH` | `/airports/:code/gates` | Actualizar número de puertas |

### 🎫 **Reservas**

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/bookings` | Listar reservas |
| `GET` | `/bookings/:id` | Ver detalles de reserva |
| `DELETE` | `/bookings/:id` | Cancelar reserva completa |
| `DELETE` | `/bookings/:id/items/:itemId` | Cancelar elemento específico |

---

## 🔧 Parámetros y Validaciones

### **Tipos de Parámetros**

- **Path Parameters**: Valores en la URL (`:id`, `:code`)
  - `/flights/123` → id = 123
  - `/airports/BOG` → code = "BOG"

- **Query Parameters**: Filtros opcionales (`?param=value`)
  - `/flights?origin=BOG&limit=10`

- **Body Parameters**: Datos JSON en el cuerpo de la petición

### **Validaciones Automáticas**

Los **DTOs** validan automáticamente los datos:

**Para Vuelos:**
- `origin/destination`: Códigos IATA de 2-3 caracteres
- `departureDate`: Formato ISO (2025-12-25T14:30:00Z)
- `aircraft`: Solo A320, B737, A321
- `status`: scheduled, boarding, departed, delayed, cancelled

**Para Pasajeros:**
- `fullName`: 2-60 caracteres
- `email`: Formato válido de email
- `points`: Números enteros positivos

### **Pipes (Convertidores)**

- **ParseIntPipe**: Convierte texto a número
- **ParseBoolPipe**: Convierte "true"/"false" a boolean
- **ValidationPipe**: Valida todos los datos automáticamente

---

### En el navegador (solo GET):
```
http://localhost:3000/flights
http://localhost:3000/airports/BOG


---

## 🛡️ Características Técnicas

- **Framework**: NestJS con TypeScript
- **Validación**: Class-validator automática
- **Arquitectura**: Modular con separación de responsabilidades
- **Pipes**: Conversión y validación automática de tipos
- **DTOs**: Validación de estructura de datos
