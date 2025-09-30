/**
 * DTO para actualización de vuelos
 * Define los campos opcionales que se pueden modificar en un vuelo existente
 */

import { IsOptional, IsString, IsISO8601, Length } from 'class-validator';

/**
 * UpdateFlightDto - Objeto de transferencia para actualizar vuelos
 * 
 * Permite modificar parcialmente los datos de un vuelo.
 * Todos los campos son opcionales, solo se actualizarán los que se envíen.
 */
export class UpdateFlightDto {
  
  /**
   * Nuevo aeropuerto de origen (opcional)
   * Código IATA de 2-3 caracteres
   */
  @IsOptional() 
  @IsString() 
  @Length(2, 3)
  origin?: string;

  /**
   * Nuevo aeropuerto de destino (opcional)
   * Código IATA de 2-3 caracteres
   */
  @IsOptional() 
  @IsString() 
  @Length(2, 3)
  destination?: string;

  /**
   * Nueva fecha y hora de salida (opcional)
   * Formato ISO 8601
   */
  @IsOptional() 
  @IsISO8601()
  departureDate?: string;
}
