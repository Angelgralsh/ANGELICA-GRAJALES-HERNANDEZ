/**
 * DTO (Data Transfer Object) para crear una nueva tienda.
 * 
 * Define los campos requeridos para registrar una tienda en el sistema,
 * incluyendo validaciones de longitud y formato.
 */

import { IsString, Length, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTiendaDto {
    /** Nombre comercial de la tienda */
    @ApiProperty({
        description: 'Nombre comercial de la tienda',
        example: 'Mascotas Felices S.A.S.',
    })
    @IsString()
    @Length(3, 100)
    tienda_nombre: string;

    /** Dirección física de la tienda */
    @ApiProperty({
        description: 'Dirección exacta donde se encuentra la tienda',
        example: 'Calle 45 #23-17, Barrio San José',
    })
    @IsString()
    @Length(5, 150)
    tienda_direccion: string;

    /** Ciudad donde está ubicada la tienda */
    @ApiProperty({
        description: 'Ciudad donde opera la tienda',
        example: 'Medellín',
    })
    @IsString()
    @Length(2, 80)
    tienda_ciudad: string;

    /** Teléfono de contacto */
    @ApiProperty({
        description: 'Número de contacto de la tienda',
        example: '3105678901',
    })
    @IsString()
    @Length(5, 20)
    tienda_telefono: string;

    /** Estado inicial de la tienda (opcional) */
    @ApiPropertyOptional({
        description: 'Indica si la tienda está activa o no (por defecto: activa)',
        example: true,
    })
    @IsOptional()
    @IsBoolean()
    tienda_activa?: boolean;
}
