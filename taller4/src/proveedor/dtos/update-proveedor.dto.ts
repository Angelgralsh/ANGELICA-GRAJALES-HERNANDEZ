/**
 * DTO (Data Transfer Object) para actualizar los datos de un proveedor.
 * 
 * Hereda todas las propiedades del DTO de creación (`CreateProveedorDto`),
 * pero las convierte en opcionales gracias a `PartialType`.
 * 
 * Esto permite actualizaciones parciales sin necesidad de enviar todos los campos.
 */

import { PartialType } from '@nestjs/swagger';
import { CreateProveedorDto } from './create-proveedor.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateProveedorDto extends PartialType(CreateProveedorDto) {
    /** Nombre actualizado del proveedor (opcional) */
    @ApiPropertyOptional({
        description: 'Nombre o razón social del proveedor (opcional)',
        example: 'Distribuciones PetWorld S.A.S.',
    })
    @IsOptional()
    @IsString()
    @Length(3, 100)
    prove_nombre?: string;

    /** NIT/RUC actualizado del proveedor (opcional) */
    @ApiPropertyOptional({
        description: 'Número de identificación fiscal actualizado',
        example: '900765432-1',
    })
    @IsOptional()
    @IsString()
    @Length(5, 20)
    prove_ruc?: string;
}
