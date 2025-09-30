/**
 * Módulo de Reservas
 * Agrupa todos los componentes para la gestión del sistema de reservas
 */

import { Module } from '@nestjs/common';
import { BookingsController } from './bookings.controller';

/**
 * BookingsModule - Módulo funcional para la gestión de reservas
 * 
 * Centro de operaciones para el sistema de reservas que coordina:
 * - Procesamiento de nuevas reservas
 * - Gestión de cambios y cancelaciones
 * - Integración con sistemas de pago
 * - Notificaciones a pasajeros
 * - Liberación de inventario de asientos
 * 
 * Componentes:
 * - BookingsController: Maneja las peticiones HTTP
 * 
 * Relaciones con otros módulos:
 * - FlightsModule: Para disponibilidad y asignación de asientos
 * - PassengersModule: Para información de clientes
 * - AirportsModule: Para validación de rutas
 * 
 * Funcionalidades clave:
 * - Reservas individuales y grupales
 * - Reservas con múltiples segmentos de vuelo
 * - Servicios adicionales (equipaje, comidas, asientos)
 * - Políticas de cancelación y reembolso
 */
@Module({
  controllers: [BookingsController],
})
export class BookingsModule {}
