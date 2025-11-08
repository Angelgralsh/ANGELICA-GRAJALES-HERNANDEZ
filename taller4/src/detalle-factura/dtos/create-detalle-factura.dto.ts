/**
 * DTO (Data Transfer Object) para crear un nuevo detalle de factura.
 * 
 * Valida los campos obligatorios antes de la inserción.
 */

import { IsInt, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDetalleFacturaDto {
    /** ID de la venta a la que pertenece este detalle */
    @ApiProperty({
        description: 'ID de la venta a la que pertenece este detalle',
        example: 1,
    })
    @IsInt({ message: 'El campo venta_id debe ser un número entero válido.' })
    venta_id: number;

    /** ID del producto asociado a este detalle */
    @ApiProperty({
        description: 'ID del producto asociado a este detalle',
        example: 15,
    })
    @IsInt({ message: 'El campo producto_id debe ser un número entero válido.' })
    producto_id: number;

    /** Cantidad de productos vendidos */
    @ApiProperty({
        description: 'Cantidad de productos vendidos',
        example: 3,
    })
    @IsInt({ message: 'La cantidad debe ser un número entero.' })
    @Min(1, { message: 'La cantidad mínima es 1.' })
    det_cantidad: number;

    /** Precio unitario del producto */
    @ApiProperty({
        description: 'Precio unitario del producto',
        example: 12000.5,
    })
    @IsNumber({}, { message: 'El precio unitario debe ser un número.' })
    @Min(0, { message: 'El precio unitario no puede ser negativo.' })
    det_precio_unitario: number;
}
