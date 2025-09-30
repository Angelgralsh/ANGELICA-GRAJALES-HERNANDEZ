/**
 * Controlador de Reservas
 * Maneja todas las operaciones relacionadas con la gestión de reservas de vuelos
 */

import { Controller, Get, Delete, Param, ParseIntPipe } from '@nestjs/common';

/**
 * BookingsController - Controlador REST para operaciones de reservas
 * 
 * Gestiona el ciclo completo de reservas de vuelos:
 * - Consulta de reservas existentes
 * - Visualización de detalles de reserva
 * - Cancelación de reservas completas
 * - Eliminación de elementos específicos de una reserva
 * 
 * Endpoints disponibles:
 * - GET /bookings - Listar todas las reservas
 * - GET /bookings/:id - Obtener detalles de una reserva
 * - DELETE /bookings/:id - Cancelar reserva completa
 * - DELETE /bookings/:id/items/:itemId - Remover elemento específico
 */
@Controller('bookings')
export class BookingsController {
  
  /**
   * Obtener lista de todas las reservas del sistema
   * Puede incluir filtros por estado, fecha, pasajero, etc.
   * @returns Array con información básica de todas las reservas
   */
  @Get()
  list() {
    return { message: 'Bookings list', data: [] };
  }

  /**
   * Obtener detalles completos de una reserva específica
   * Incluye información del pasajero, vuelos, servicios adicionales, etc.
   * @param id - ID único de la reserva
   * @returns Información detallada de la reserva
   */
  @Get(':id')
  detail(@Param('id', ParseIntPipe) id: number) {
    return { message: 'Booking detail', data: { id } };
  }

  /**
   * Cancelar completamente una reserva
   * Libera asientos, procesa reembolsos y notifica al pasajero
   * @param id - ID de la reserva a cancelar
   * @returns Confirmación de cancelación
   */
  @Delete(':id')
  cancel(@Param('id', ParseIntPipe) id: number) {
    return { message: 'Booking cancelled', data: { id } };
  }

  /**
   * Remover un elemento específico de una reserva
   * Útil para cancelar solo una parte de una reserva múltiple
   * (ej: un vuelo de conexión, un servicio adicional)
   * @param id - ID de la reserva
   * @param itemId - ID del elemento a remover
   * @returns Confirmación de remoción del elemento
   */
  @Delete(':id/items/:itemId')
  removeItem(@Param('id', ParseIntPipe) id: number, @Param('itemId', ParseIntPipe) itemId: number) {
    return { message: 'Booking item removed', data: { id, itemId } };
  }
}
