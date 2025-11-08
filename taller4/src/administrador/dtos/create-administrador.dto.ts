/**
 * DTO (Data Transfer Object) utilizado para crear un nuevo administrador.
 * 
 * Valida los datos enviados desde el cliente antes de ser procesados por el backend.
 * Además, define las propiedades para la documentación en Swagger.
 */

import {
    IsString,
    IsEmail,
    Length,
    IsBoolean,
    IsOptional,
    Matches,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAdministradorDto {
    @ApiProperty({
        description: 'Nombre completo del administrador.',
        example: 'Carlos Pérez',
    })
    @IsString({ message: 'El nombre debe ser una cadena de texto.' })
    @Length(3, 100, { message: 'El nombre debe tener entre 3 y 100 caracteres.' })
    adm_nombre: string;

    @ApiProperty({
        description: 'Nombre de usuario para iniciar sesión.',
        example: 'carlos_admin',
    })
    @IsString({ message: 'El usuario debe ser una cadena de texto.' })
    @Length(4, 50, { message: 'El usuario debe tener entre 4 y 50 caracteres.' })
    @Matches(/^[a-zA-Z0-9_]+$/, {
        message: 'El usuario solo puede contener letras, números y guiones bajos.',
    })
    adm_usuario: string;

    @ApiProperty({
        description:
        'Contraseña del administrador (mínimo 6 caracteres, una mayúscula, un número y un símbolo).',
        example: 'Admin123!',
    })
    @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
    @Length(6, 100, { message: 'La contraseña debe tener entre 6 y 100 caracteres.' })
    @Matches(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,100}$/, {
        message:
        'La contraseña debe tener al menos una mayúscula, un número y un símbolo especial.',
    })
    adm_contrasena: string;

    @ApiProperty({
        description: 'Correo electrónico del administrador.',
        example: 'admin@correo.com',
    })
    @IsEmail({}, { message: 'El correo electrónico no tiene un formato válido.' })
    adm_correo: string;

    @ApiPropertyOptional({
        description: 'Estado activo/inactivo del administrador.',
        example: true,
    })
    @IsOptional()
    @IsBoolean({ message: 'El estado activo debe ser un valor booleano.' })
    adm_activo?: boolean;
}
