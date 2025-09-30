/**
 * DTO para agregar puntos de fidelidad
 * Define la estructura para otorgar puntos a pasajeros frecuentes
 */

import { IsInt, Min } from 'class-validator';

/**
 * AddLoyaltyDto - Objeto para gestionar puntos de fidelidad
 * 
 * Permite agregar puntos al programa de fidelidad de un pasajero.
 * Los puntos se otorgan por:
 * - Vuelos completados
 * - Promociones especiales
 * - Upgrades o servicios adicionales
 */
export class AddLoyaltyDto {
  
  /**
   * Cantidad de puntos a agregar
   * Debe ser un número entero positivo (mínimo 1)
   * Los puntos se acumulan en el balance total del pasajero
   */
  @IsInt() 
  @Min(1)
  points: number;
}
