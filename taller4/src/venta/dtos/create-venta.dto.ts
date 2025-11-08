/**
 * DTO (Data Transfer Object) para la creación de una venta.
 * 
 * Valida las claves foráneas (cliente, empleado, tienda) y el estado de la venta.
 * 
 * Este DTO se utiliza para registrar una nueva venta en el sistema.
 */

import { IsInt, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateVentaDto {
    /** ID del cliente asociado a la venta */
    @ApiProperty({
        description: 'Identificador único del cliente asociado a la venta.',
        example: 3,
    })
    @IsInt({ message: 'El campo cli_id debe ser un número entero válido.' })
    cli_id: number;

    /** ID del empleado que realiza la venta */
    @ApiProperty({
        description: 'Identificador del empleado que realiza la venta.',
        example: 2,
    })
    @IsInt({ message: 'El campo emp_id debe ser un número entero válido.' })
    emp_id: number;

    /** ID de la tienda donde se registra la venta */
    @ApiProperty({
        description: 'Identificador de la tienda donde se realiza la venta.',
        example: 1,
    })
    @IsInt({ message: 'El campo tienda_id debe ser un número entero válido.' })
    tienda_id: number;

    /** Estado de la venta (activo/inactivo) */
    @ApiPropertyOptional({
        description: 'Estado de la venta. Por defecto, es true (activa).',
        example: true,
    })
    @IsOptional()
    @IsBoolean({ message: 'El campo venta_activa debe ser un valor booleano.' })
    venta_activa?: boolean;
}
