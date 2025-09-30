/**
 * Módulo de Vuelos
 * Agrupa todos los componentes relacionados con la gestión de vuelos
 */

import { Module } from '@nestjs/common';
import { FlightsController } from './flights.controller';

/**
 * FlightsModule - Módulo funcional para la gestión de vuelos
 * 
 * Encapsula toda la lógica relacionada con:
 * - Creación y actualización de vuelos
 * - Consulta de información de vuelos
 * - Gestión de estados de vuelos
 * - Asignación de pasajeros a vuelos
 * 
 * Componentes:
 * - FlightsController: Maneja las peticiones HTTP
 * - DTOs: Validan los datos de entrada
 */
@Module({
  controllers: [FlightsController],
})
export class FlightsModule {}
