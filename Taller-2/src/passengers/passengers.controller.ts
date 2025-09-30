/**
 * Controlador de Pasajeros
 * Maneja todas las operaciones relacionadas con la gestión de pasajeros
 */

import { Controller, Get, Post, Param, Body, ParseIntPipe } from '@nestjs/common';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { AddLoyaltyDto } from './dto/add-loyalty.dto';

/**
 * PassengersController - Controlador REST para operaciones de pasajeros
 * 
 * Gestiona el registro y administración de pasajeros en el sistema:
 * - Registro de nuevos pasajeros
 * - Consulta de información de pasajeros
 * - Gestión de programas de fidelidad
 * 
 * Endpoints disponibles:
 * - GET /passengers - Listar todos los pasajeros
 * - GET /passengers/:id - Obtener detalles de un pasajero
 * - POST /passengers - Registrar nuevo pasajero
 * - POST /passengers/:id/loyalty - Agregar puntos de fidelidad
 */
@Controller('passengers')
export class PassengersController {
  
  /**
   * Obtener lista de todos los pasajeros registrados
   * @returns Array con información básica de pasajeros
   */
  @Get()
  list() {
    return { message: 'Passengers list', data: [] };
  }

  /**
   * Obtener detalles completos de un pasajero específico
   * @param id - ID único del pasajero
   * @returns Información detallada del pasajero (perfil, historial, puntos)
   */
  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return { message: 'Passenger detail', data: { id } };
  }

  /**
   * Registrar un nuevo pasajero en el sistema
   * @param dto - Datos del pasajero (nombre, email)
   * @returns Confirmación de registro con ID asignado
   */
  @Post()
  create(@Body() dto: CreatePassengerDto) {
    return { message: 'Passenger created', data: dto };
  }

  /**
   * Agregar puntos de fidelidad a un pasajero
   * @param id - ID del pasajero
   * @param dto - Cantidad de puntos a agregar
   * @returns Confirmación con nuevo balance de puntos
   */
  @Post(':id/loyalty')
  addLoyalty(@Param('id', ParseIntPipe) id: number, @Body() dto: AddLoyaltyDto) {
    return { message: 'Loyalty points added', data: { id, points: dto.points } };
  }
}
