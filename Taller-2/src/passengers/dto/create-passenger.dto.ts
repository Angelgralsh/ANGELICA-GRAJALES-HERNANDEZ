/**
 * DTO para creación de pasajeros
 * Define la estructura y validaciones para registrar nuevos pasajeros
 */

import { IsString, IsEmail, Length } from 'class-validator';

/**
 * CreatePassengerDto - Objeto de transferencia para registro de pasajeros
 * 
 * Contiene la información mínima requerida para registrar un pasajero:
 * - Nombre completo con validación de longitud
 * - Email válido para comunicaciones
 */
export class CreatePassengerDto {
  
  /**
   * Nombre completo del pasajero
   * Debe tener entre 2 y 60 caracteres
   * Incluye nombres y apellidos según documento de identidad
   */
  @IsString() 
  @Length(2, 60)
  fullName: string;

  /**
   * Correo electrónico del pasajero
   * Debe ser un email válido para:
   * - Confirmaciones de vuelo
   * - Notificaciones de cambios
   * - Comunicaciones promocionales
   */
  @IsEmail()
  email: string;
}
