/**
 * DTO para creación de vuelos
 * Define la estructura y validaciones para crear un nuevo vuelo
 */

import { IsString, IsISO8601, IsIn, Length } from 'class-validator';

/**
 * CreateFlightDto - Objeto de transferencia de datos para crear vuelos
 * 
 * Valida los datos requeridos para crear un nuevo vuelo en el sistema.
 * Incluye validaciones de formato y restricciones de negocio.
 */
export class CreateFlightDto {
  
  /**
   * Código del aeropuerto de origen
   * Debe ser un código IATA de 2-3 caracteres (ej: 'BOG', 'MDE')
   */
  @IsString() 
  @Length(2, 3)
  origin: string;

  /**
   * Código del aeropuerto de destino
   * Debe ser un código IATA de 2-3 caracteres (ej: 'CLO', 'CTG')
   */
  @IsString() 
  @Length(2, 3)
  destination: string;

  /**
   * Fecha y hora de salida del vuelo
   * Debe estar en formato ISO 8601 (ej: '2025-12-25T14:30:00Z')
   */
  @IsISO8601()
  departureDate: string;

  /**
   * Tipo de aeronave asignada al vuelo
   * Solo se permiten los modelos: A320, B737, A321
   */
  @IsString() 
  @IsIn(['A320', 'B737', 'A321'])
  aircraft: string;
}
