/**
 * DTO (Data Transfer Object) para actualizar un registro de inventario existente.
 * 
 * Extiende de `CreateInventarioDto`, convirtiendo todas sus propiedades en opcionales
 * mediante `PartialType`. Esto permite realizar actualizaciones parciales, es decir,
 * solo enviar los campos que se desean modificar.
 * 
 * Ejemplo de uso:
 * ```json
 * PATCH /inventario/5
 * {
 *   "inv_cantidad": 25,
 *   "inv_activo": false
 * }
 * ```
 */

import { PartialType } from '@nestjs/swagger';
import { CreateInventarioDto } from './create-inventario.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsInt } from 'class-validator';

export class UpdateInventarioDto extends PartialType(CreateInventarioDto) {
    /**
     * ID del registro de inventario (solo para referencia, no obligatorio en el cuerpo del request).
     */
    @ApiPropertyOptional({
        description: 'ID del inventario que se desea actualizar (solo para referencia).',
        example: 5,
    })
    @IsOptional()
    @IsInt({ message: 'El ID del inventario debe ser un número entero.' })
    inv_id?: number;
}
