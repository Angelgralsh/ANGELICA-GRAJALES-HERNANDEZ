/**
 * DTO (Data Transfer Object) para la actualización de un cliente existente.
 * 
 * Extiende del DTO de creación mediante `PartialType`, lo que convierte
 * todas sus propiedades en opcionales. Permite actualizaciones parciales.
 */

import { PartialType } from '@nestjs/mapped-types';
import { CreateClienteDto } from './create-cliente.dto';
import { IsOptional, IsString, Length } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateClienteDto extends PartialType(CreateClienteDto) {
  /** Contraseña nueva del cliente (opcional, se cifrará antes de guardar) */
    @ApiPropertyOptional({
        description: 'Contraseña nueva del cliente (opcional, se cifrará antes de guardar)',
        example: 'NuevaClave@2025',
    })
    @IsOptional()
    @IsString()
    @Length(6, 100, { message: 'La contraseña debe tener entre 6 y 100 caracteres.' })
    cli_contrasena?: string;
}
