/**
 * Módulo de Pasajeros
 * Agrupa todos los componentes para la gestión de pasajeros y programas de fidelidad
 */

import { Module } from '@nestjs/common';
import { PassengersController } from './passengers.controller';

/**
 * PassengersModule - Módulo funcional para la gestión de pasajeros
 * 
 * Responsabilidades principales:
 * - Registro y actualización de datos de pasajeros
 * - Gestión de programas de fidelidad
 * - Mantenimiento de historial de vuelos
 * - Preferencias y configuraciones personales
 * 
 * Componentes:
 * - PassengersController: Maneja peticiones HTTP
 * - CreatePassengerDto: Validación para nuevos registros
 * - AddLoyaltyDto: Validación para puntos de fidelidad
 * 
 * Integraciones:
 * - Se conecta con FlightsModule para asignación de asientos
 * - Interactúa con BookingsModule para reservas
 * - Proporciona datos para notificaciones y comunicaciones
 */
@Module({
  controllers: [PassengersController],
})
export class PassengersModule {}
