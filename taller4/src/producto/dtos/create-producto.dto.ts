/**
 * DTO (Data Transfer Object) para crear un nuevo producto.
 * 
 * Valida los campos antes de almacenar el producto en la base de datos
 * y documenta la estructura esperada en Swagger.
 */

import {
    IsString,
    IsNumber,
    Min,
    IsOptional,
    IsBoolean,
    IsInt,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductoDto {
    /** Nombre del producto */
    @ApiProperty({
        description: 'Nombre del producto.',
        example: 'Croquetas para perro 5kg',
    })
    @IsString()
    prod_nombre: string;

    /** Descripción del producto (opcional) */
    @ApiPropertyOptional({
        description: 'Descripción detallada del producto.',
        example: 'Croquetas premium para perros adultos, sabor pollo.',
    })
    @IsString()
    @IsOptional()
    prod_descripcion?: string;

    /** Precio unitario del producto */
    @ApiProperty({
        description: 'Precio unitario del producto en pesos colombianos.',
        example: 45000,
        minimum: 0,
    })
    @IsNumber()
    @Min(0, { message: 'El precio no puede ser negativo.' })
    prod_precio: number;

    /** Cantidad disponible en stock */
    @ApiProperty({
        description: 'Cantidad disponible en inventario.',
        example: 100,
        minimum: 0,
    })
    @IsInt()
    @Min(0, { message: 'El stock no puede ser negativo.' })
    prod_stock: number;

    /** Estado del producto (activo/inactivo) */
    @ApiPropertyOptional({
        description: 'Indica si el producto está activo o inactivo.',
        example: true,
    })
    @IsOptional()
    @IsBoolean()
    prod_activo?: boolean;

    /** ID del proveedor asociado (opcional) */
    @ApiPropertyOptional({
        description: 'ID del proveedor que suministra el producto.',
        example: 3,
    })
    @IsOptional()
    @IsInt({ message: 'El ID del proveedor debe ser un número entero.' })
    prove_id?: number;
}
