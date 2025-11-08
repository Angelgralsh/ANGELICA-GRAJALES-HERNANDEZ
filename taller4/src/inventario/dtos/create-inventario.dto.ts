/**
 * DTO (Data Transfer Object) para crear un nuevo registro de inventario.
 * 
 * Este DTO define los campos requeridos y sus validaciones antes de crear
 * un registro en la base de datos. Garantiza que los datos sean válidos
 * antes de llegar al servicio o repositorio.
 */

import { IsInt, IsNumber, Min, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateInventarioDto {
    /**
     * Cantidad de unidades disponibles del producto en inventario.
     * 
     * Debe ser un número entero igual o mayor que cero.
     */
    @ApiProperty({
        description: 'Cantidad actual de unidades disponibles en el inventario.',
        example: 50,
    })
    @IsInt({ message: 'La cantidad debe ser un número entero.' })
    @Min(0, { message: 'La cantidad no puede ser negativa.' })
    inv_cantidad: number;

    /**
     * Costo unitario del producto almacenado.
     * 
     * Representa el valor de compra o adquisición por unidad.
     */
    @ApiProperty({
        description: 'Costo unitario del producto.',
        example: 12000.5,
    })
    @IsNumber({}, { message: 'El costo unitario debe ser un número.' })
    @Min(0, { message: 'El costo unitario no puede ser negativo.' })
    inv_costo_unitario: number;

    /**
     * Identificador único del producto asociado al registro de inventario.
     */
    @ApiProperty({
        description: 'ID del producto asociado a este registro de inventario.',
        example: 3,
    })
    @IsInt({ message: 'El ID del producto debe ser un número entero.' })
    prod_id: number;

    /**
     * Identificador único de la tienda donde se encuentra el inventario.
     */
    @ApiProperty({
        description: 'ID de la tienda donde se almacena el producto.',
        example: 1,
    })
    @IsInt({ message: 'El ID de la tienda debe ser un número entero.' })
    tienda_id: number;

    /**
     * Estado actual del registro de inventario.
     * 
     * Indica si el inventario está activo o inactivo dentro del sistema.
     */
    @ApiPropertyOptional({
        description: 'Indica si el registro de inventario está activo (true) o inactivo (false).',
        example: true,
    })
    @IsOptional()
    @IsBoolean({ message: 'El campo debe ser de tipo booleano (true o false).' })
    inv_activo?: boolean;
}
