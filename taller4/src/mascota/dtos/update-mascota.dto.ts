/**
 * DTO (Data Transfer Object) para actualizar una mascota existente.
 * 
 * Extiende de `CreateMascotaDto` y convierte todos sus campos en opcionales,
 * permitiendo actualizaciones parciales sin requerir todos los datos.
 * 
 * Swagger mostrará correctamente las propiedades heredadas como opcionales.
 */

import { PartialType } from '@nestjs/swagger';
import { CreateMascotaDto } from './create-mascota.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min, MaxLength } from 'class-validator';

export class UpdateMascotaDto extends PartialType(CreateMascotaDto) {
    /** Nombre actualizado de la mascota (opcional) */
    @ApiPropertyOptional({
        description: 'Nuevo nombre de la mascota (opcional).',
        example: 'Max',
    })
    @IsOptional()
    @IsString()
    @MaxLength(100)
    mascota_nombre?: string;

    /** Especie actualizada (opcional) */
    @ApiPropertyOptional({
        description: 'Especie actualizada de la mascota.',
        example: 'Gato',
    })
    @IsOptional()
    @IsString()
    @MaxLength(50)
    mascota_especie?: string;

    /** Raza actualizada (opcional) */
    @ApiPropertyOptional({
        description: 'Nueva raza de la mascota (opcional).',
        example: 'Siames',
    })
    @IsOptional()
    @IsString()
    @MaxLength(50)
    mascota_raza?: string;

    /** Edad actualizada (opcional) */
    @ApiPropertyOptional({
        description: 'Nueva edad de la mascota en años.',
        example: 4,
    })
    @IsOptional()
    @IsInt()
    @Min(0)
    mascota_edad?: number;

    /** ID del cliente asociado (opcional) */
    @ApiPropertyOptional({
        description: 'Nuevo ID del cliente dueño de la mascota (si se reasigna).',
        example: 2,
    })
    @IsOptional()
    @IsInt()
    cli_id?: number;
}
