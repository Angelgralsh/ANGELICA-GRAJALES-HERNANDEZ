/**
 * DTO (Data Transfer Object) para actualizar los datos de una venta existente.
 * 
 * Hereda las validaciones de `CreateVentaDto` y convierte sus propiedades en opcionales,
 * permitiendo actualizaciones parciales (solo los campos enviados serán modificados).
 */

import { PartialType } from '@nestjs/swagger';
import { CreateVentaDto } from './create-venta.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsBoolean, IsInt } from 'class-validator';

export class UpdateVentaDto extends PartialType(CreateVentaDto) {
    /** ID del cliente asociado a la venta (opcional) */
    @ApiPropertyOptional({
        description: 'Identificador del cliente asociado (opcional).',
        example: 3,
    })
    @IsOptional()
    @IsInt({ message: 'El campo cli_id debe ser un número entero válido.' })
    cli_id?: number;

    /** ID del empleado que realizó la venta (opcional) */
    @ApiPropertyOptional({
        description: 'Identificador del empleado que realizó la venta (opcional).',
        example: 2,
    })
    @IsOptional()
    @IsInt({ message: 'El campo emp_id debe ser un número entero válido.' })
    emp_id?: number;

    /** ID de la tienda donde se registró la venta (opcional) */
    @ApiPropertyOptional({
        description: 'Identificador de la tienda donde se realizó la venta (opcional).',
        example: 1,
    })
    @IsOptional()
    @IsInt({ message: 'El campo tienda_id debe ser un número entero válido.' })
    tienda_id?: number;

    /** Estado actual de la venta (opcional) */
    @ApiPropertyOptional({
        description: 'Estado actual de la venta (activo/inactivo).',
        example: false,
    })
    @IsOptional()
    @IsBoolean({ message: 'El campo venta_activa debe ser un valor booleano.' })
    venta_activa?: boolean;
}
