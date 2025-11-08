import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * ============================================================
 * 🧩 DTO: LoginAdminDto
 * ============================================================
 * 
 * Define la estructura y validaciones para el inicio de sesión
 * de un administrador dentro del sistema.
 * 
 * Incluye decoradores de `class-validator` para asegurar
 * integridad de datos, y `@ApiProperty` para documentar
 * claramente cada campo en Swagger.
 * 
 * ---
 * 🧠 Buenas prácticas:
 * - Validar siempre formato de correo.
 * - Enmascarar contraseñas en logs.
 * - Usar este DTO exclusivamente en el endpoint de login de admin.
 */
export class LoginAdminDto {
    
    @ApiProperty({
        example: 'admin@empresa.com',
        description: 'Correo electrónico del administrador registrado en el sistema.',
    })
    @IsEmail({}, { message: 'Debe ser un correo electrónico válido.' })
    adm_correo: string;

    @ApiProperty({
        example: 'Admin123',
        description: 'Contraseña del administrador. Debe tener al menos 6 caracteres.',
        minLength: 6,
    })
    @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres.' })
    adm_contrasena: string;
}
