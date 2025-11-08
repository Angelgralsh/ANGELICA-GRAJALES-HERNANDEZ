/**
 * DTO (Data Transfer Object) para la creación de un nuevo cliente.
 * 
 * Valida los datos recibidos antes de ser procesados por el backend
 * mediante decoradores de `class-validator`.
 */

import {
    IsString,
    IsEmail,
    Length,
    IsBoolean,
    IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateClienteDto {
    /** Nombre completo del cliente */
    @ApiProperty({
        description: 'Nombre completo del cliente',
        example: 'Juan Pérez',
    })
    @IsString()
    @Length(3, 100, { message: 'El nombre debe tener entre 3 y 100 caracteres.' })
    cli_nombre: string;

    /** Correo electrónico válido y único */
    @ApiProperty({
        description: 'Correo electrónico válido y único del cliente',
        example: 'juanperez@gmail.com',
    })
    @IsEmail({}, { message: 'Debe ser un correo electrónico válido.' })
    cli_correo: string;

    /** Número de teléfono del cliente */
    @ApiProperty({
        description: 'Número de teléfono del cliente',
        example: '3001234567',
    })
    @IsString()
    @Length(7, 15, { message: 'El teléfono debe tener entre 7 y 15 caracteres.' })
    cli_telefono: string;

    /** Dirección física del cliente */
    @ApiProperty({
        description: 'Dirección de residencia del cliente',
        example: 'Calle 10 #45-23, Medellín',
    })
    @IsString()
    @Length(5, 200, { message: 'La dirección debe tener entre 5 y 200 caracteres.' })
    cli_direccion: string;

    /** Contraseña del cliente (opcional) */
    @ApiPropertyOptional({
        description:
        'Contraseña del cliente (opcional, se cifra antes de guardar)',
        example: 'MiClave@2025',
    })
    @IsOptional()
    @IsString()
    @Length(6, 100, { message: 'La contraseña debe tener entre 6 y 100 caracteres.' })
    cli_contrasena?: string;

    /** Estado del cliente (activo/inactivo) */
    @ApiPropertyOptional({
        description: 'Estado activo/inactivo del cliente',
        example: true,
    })
    @IsOptional()
    @IsBoolean()
    cli_activo?: boolean;
}
