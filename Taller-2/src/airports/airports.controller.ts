/**
 * Controlador de Aeropuertos
 * Maneja las operaciones HTTP para la gestión de aeropuertos
 */

import { Controller, Get, Patch, Param, Body, ParseIntPipe } from '@nestjs/common';

/**
 * AirportsController - Controlador REST para operaciones de aeropuertos
 * 
 * Gestiona la información de aeropuertos y sus instalaciones:
 * - Consulta de aeropuertos
 * - Actualización de información general
 * - Gestión de puertas de embarque
 * 
 * Endpoints disponibles:
 * - GET /airports - Listar todos los aeropuertos
 * - GET /airports/:code - Obtener detalles de un aeropuerto por código
 * - PATCH /airports/:code - Actualizar información del aeropuerto
 * - PATCH /airports/:code/gates - Actualizar número de puertas
 */
@Controller('airports')
export class AirportsController {
  
  /**
   * Obtener lista completa de aeropuertos
   * @returns Array con todos los aeropuertos del sistema
   */
  @Get()
  list() {
    return { message: 'Airports list', data: [] };
  }

  /**
   * Obtener detalles de un aeropuerto específico
   * @param code - Código IATA del aeropuerto (ej: 'BOG', 'MDE')
   * @returns Información detallada del aeropuerto
   */
  @Get(':code')
  getByCode(@Param('code') code: string) {
    return { message: 'Airport detail', data: { code: code.toUpperCase() } };
  }

  /**
   * Actualizar información general de un aeropuerto
   * @param code - Código IATA del aeropuerto
   * @param body - Datos a actualizar (nombre, ciudad, servicios, etc.)
   * @returns Confirmación de actualización
   */
  @Patch(':code')
  update(@Param('code') code: string, @Body() body: any) {
    return { message: 'Airport updated', data: { code, changes: body } };
  }

  /**
   * Actualizar el número de puertas de embarque de un aeropuerto
   * @param code - Código IATA del aeropuerto
   * @param gates - Número total de puertas disponibles
   * @returns Confirmación de actualización de puertas
   */
  @Patch(':code/gates')
  updateGates(@Param('code') code: string, @Body('gates', ParseIntPipe) gates: number) {
    return { message: 'Airport gates updated', data: { code, gates } };
  }
}
