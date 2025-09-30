/**
 * Controlador de Vuelos
 * Maneja todas las operaciones HTTP relacionadas con la gestión de vuelos
 */

import { Controller, Get, Post, Patch, Param, Query, Body, ParseIntPipe, ParseBoolPipe } from '@nestjs/common';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

/**
 * FlightsController - Controlador REST para operaciones de vuelos
 * 
 * Endpoints disponibles:
 * - GET /flights - Listar vuelos con filtros opcionales
 * - GET /flights/:id - Obtener detalles de un vuelo específico
 * - POST /flights - Crear un nuevo vuelo
 * - POST /flights/:id/passengers - Agregar pasajero a un vuelo
 * - PATCH /flights/:id - Actualizar información general del vuelo
 * - PATCH /flights/:id/status - Actualizar solo el estado del vuelo
 */
@Controller('flights')
export class FlightsController {
  
  /**
   * Obtener lista de vuelos con filtros opcionales
   * @param origin - Código del aeropuerto de origen (opcional)
   * @param date - Fecha del vuelo en formato ISO (opcional)
   * @param nonstop - Filtrar solo vuelos directos (opcional)
   * @param limit - Límite de resultados, por defecto 20
   * @returns Lista paginada de vuelos
   */
  @Get()
  list(
    @Query('origin') origin?: string,
    @Query('date') date?: string,
    @Query('nonstop', ParseBoolPipe) nonstop?: boolean,
    @Query('limit', ParseIntPipe) limit = 20,
  ) {
    return { message: 'Flights list', data: { origin, date, nonstop, limit } };
  }

  /**
   * Obtener detalles de un vuelo específico por ID
   * @param id - ID único del vuelo
   * @returns Información detallada del vuelo
   */
  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return { message: 'Flight detail', data: { id } };
  }

  /**
   * Crear un nuevo vuelo
   * @param dto - Datos del vuelo a crear (origen, destino, fecha, aeronave)
   * @returns Confirmación de creación con datos del vuelo
   */
  @Post()
  create(@Body() dto: CreateFlightDto) {
    return { message: 'Flight created', data: dto };
  }

  /**
   * Agregar un pasajero a un vuelo existente
   * @param id - ID del vuelo
   * @param passengerId - ID del pasajero a agregar
   * @returns Confirmación de la asignación
   */
  @Post(':id/passengers')
  addPassenger(@Param('id', ParseIntPipe) id: number, @Body('passengerId', ParseIntPipe) passengerId: number) {
    return { message: 'Passenger added to flight', data: { flightId: id, passengerId } };
  }

  /**
   * Actualizar información general de un vuelo
   * @param id - ID del vuelo a actualizar
   * @param dto - Datos parciales a actualizar
   * @returns Confirmación de actualización
   */
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateFlightDto) {
    return { message: 'Flight updated', data: { id, changes: dto } };
  }

  /**
   * Actualizar específicamente el estado de un vuelo
   * @param id - ID del vuelo
   * @param dto - Nuevo estado del vuelo
   * @returns Confirmación del cambio de estado
   */
  @Patch(':id/status')
  updateStatus(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateStatusDto) {
    return { message: 'Flight status updated', data: { id, status: dto.status } };
  }
}
