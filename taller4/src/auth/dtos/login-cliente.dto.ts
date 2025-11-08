import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * ============================================================
 * 🔐 DTO: LoginDto (Cliente)
 * ============================================================
 * 
 * Define la estructura de los datos necesarios para el inicio
 * de sesión de un cliente dentro del sistema.
 * 
 * Este DTO garantiza que los datos enviados cumplan con las
 * reglas mínimas de validación antes de ser procesados por el
 * servicio de autenticación (`AuthService`).
 * 
 * ---
 * 🧠 Buenas prácticas:
 * - Nunca exponer contraseñas en logs o respuestas HTTP.
 * - Utilizar este DTO solo en rutas públicas de login.
 * - Complementar siempre con Swagger para pruebas controladas.
 */
export class LoginDto {
    
    @ApiProperty({
        example: 'cliente@gmail.com',
        description: 'Correo electrónico del cliente registrado en el sistema.',
    })
    @IsEmail({}, { message: 'Debe ser un correo electrónico válido.' })
    correo: string;

    @ApiProperty({
        example: 'Cliente123',
        description: 'Contraseña del cliente. Debe tener al menos 6 caracteres.',
        minLength: 6,
    })
    @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres.' })
    contrasena: string;
}
