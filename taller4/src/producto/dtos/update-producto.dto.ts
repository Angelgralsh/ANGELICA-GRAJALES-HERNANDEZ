/**
 * DTO (Data Transfer Object) para actualizar un producto existente.
 * 
 * Extiende de `CreateProductoDto` y convierte sus propiedades en opcionales,
 * permitiendo actualizaciones parciales en los endpoints PATCH o PUT.
 */

import { PartialType } from '@nestjs/swagger';
import { CreateProductoDto } from './create-producto.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsInt } from 'class-validator';

export class UpdateProductoDto extends PartialType(CreateProductoDto) {
    /** 
     * ID del producto (opcional, solo referencia interna para documentación) 
     */
    @ApiPropertyOptional({
        description: 'Identificador interno del producto (no editable, solo referencia).',
        example: 12,
    })
    @IsOptional()
    @IsInt()
    prod_id?: number;
}
