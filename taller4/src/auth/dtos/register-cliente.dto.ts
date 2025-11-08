import { IsString, IsEmail, MinLength, Length, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * ============================================================
 * 🧾 DTO: RegisterDto
 * ============================================================
 * 
 * Define la estructura de datos requerida para el registro
 * de nuevos clientes en el sistema.
 * 
 * Este DTO se encarga de validar la información ingresada por el
 * usuario antes de que sea procesada por el servicio de autenticación.
 * 
 * ---
 * 💡 Notas:
 * - Los administradores se crean internamente desde el panel.
 * - El rol es opcional y se reserva para futuras expansiones.
 */
export class RegisterDto {
    
    @ApiProperty({
        example: 'Juan Pérez',
        description: 'Nombre completo del cliente.',
        minLength: 3,
        maxLength: 100,
    })
    @IsString({ message: 'El nombre debe ser una cadena de texto.' })
    @Length(3, 100, { message: 'El nombre debe tener entre 3 y 100 caracteres.' })
    nombre: string;

    @ApiProperty({
        example: 'juan.perez@example.com',
        description: 'Correo electrónico válido del cliente.',
    })
    @IsEmail({}, { message: 'Debe ser un correo electrónico válido.' })
    correo: string;

    @ApiProperty({
        example: 'Cliente123',
        description: 'Contraseña del cliente (mínimo 6 caracteres).',
        minLength: 6,
    })
    @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres.' })
    contrasena: string;

    @ApiProperty({
        example: '3124567890',
        description: 'Número de teléfono de contacto del cliente.',
        minLength: 7,
        maxLength: 15,
    })
    @IsString({ message: 'El teléfono debe ser una cadena de texto.' })
    @Length(7, 15, { message: 'El teléfono debe tener entre 7 y 15 caracteres.' })
    telefono: string;

    @ApiProperty({
        example: 'Calle 45 #23-12, Bogotá',
        description: 'Dirección de residencia o contacto del cliente.',
        minLength: 5,
        maxLength: 200,
    })
    @IsString({ message: 'La dirección debe ser una cadena de texto.' })
    @Length(5, 200, { message: 'La dirección debe tener entre 5 y 200 caracteres.' })
    direccion: string;

    @ApiProperty({
        example: 'cliente',
        description: 'Rol del usuario (campo opcional, reservado para futuras expansiones).',
        required: false,
    })
    @IsOptional()
    @IsString({ message: 'El rol debe ser una cadena de texto.' })
    rol?: string;
}
