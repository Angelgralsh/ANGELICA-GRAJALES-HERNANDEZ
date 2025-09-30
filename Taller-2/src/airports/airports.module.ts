/**
 * Módulo de Aeropuertos
 * Agrupa componentes para la gestión de aeropuertos y sus instalaciones
 */

import { Module } from '@nestjs/common';
import { AirportsController } from './airports.controller';

/**
 * AirportsModule - Módulo funcional para la gestión de aeropuertos
 * 
 * Responsabilidades:
 * - Administrar información básica de aeropuertos
 * - Gestionar instalaciones (puertas, terminales)
 * - Mantener capacidades operativas
 * - Proveer datos para operaciones de vuelo
 * 
 * Componentes:
 * - AirportsController: Maneja las peticiones HTTP
 * 
 * Este módulo es fundamental para:
 * - Validar aeropuertos de origen/destino en vuelos
 * - Gestionar capacidad de puertas para asignación
 * - Proporcionar información de aeropuertos a pasajeros
 */
@Module({
  controllers: [AirportsController],
})
export class AirportsModule {}
