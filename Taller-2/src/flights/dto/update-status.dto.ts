/**
 * DTO para actualización del estado de vuelos
 * Define los estados válidos que puede tener un vuelo
 */

import { IsString, IsIn } from 'class-validator';

/**
 * UpdateStatusDto - Objeto para cambiar el estado de un vuelo
 * 
 * Controla el ciclo de vida de un vuelo desde su programación hasta su finalización.
 * Estados disponibles:
 * - 'scheduled': Vuelo programado (estado inicial)
 * - 'boarding': Abordaje en progreso
 * - 'departed': Vuelo despegado/en ruta
 * - 'delayed': Vuelo retrasado
 * - 'cancelled': Vuelo cancelado
 */
export class UpdateStatusDto {
  
  /**
   * Nuevo estado del vuelo
   * Debe ser uno de los estados válidos del sistema
   */
  @IsString() 
  @IsIn(['scheduled', 'boarding', 'departed', 'delayed', 'cancelled'])
  status: string;
}
