import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * ============================================================
 * 👨‍💼 DTO: LoginEmpleadoDto
 * ============================================================
 * 
 * Define la estructura de datos requerida para el inicio de sesión
 * de un empleado dentro del sistema.
 * 
 * Este DTO valida que el correo y la contraseña cumplan con las
 * reglas mínimas antes de ser procesados por el servicio de autenticación.
 * 
 * ---
 * 🧠 Buenas prácticas:
 * - Utilizar este DTO únicamente en rutas públicas de autenticación.
 * - No incluir contraseñas en logs ni respuestas HTTP.
 * - Combinarlo con `class-validator` para validaciones seguras.
 */
export class LoginEmpleadoDto {
    
    @ApiProperty({
        example: 'empleado@empresa.com',
        description: 'Correo electrónico del empleado registrado.',
    })
    @IsEmail({}, { message: 'Debe ser un correo electrónico válido.' })
    emp_email: string;

    @ApiProperty({
        example: 'Empleado123',
        description: 'Contraseña del empleado. Mínimo 6 caracteres.',
        minLength: 6,
    })
    @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres.' })
    emp_contrasena: string;
}
