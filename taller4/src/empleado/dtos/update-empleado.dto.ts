/**
 * DTO (Data Transfer Object) para actualizar los datos de un empleado.
 * 
 * Este DTO se utiliza al realizar solicitudes de tipo PATCH o PUT
 * para modificar la información de un empleado existente.
 * 
 * Hereda las propiedades del DTO de creación (`CreateEmpleadoDto`) mediante `PartialType`,
 * lo que convierte todos los campos originales en opcionales.
 * 
 * Incluye propiedades adicionales específicas del proceso de actualización,
 * como `emp_id` y `emp_contrasena`.
 */

import { PartialType } from '@nestjs/swagger'; 
import { CreateEmpleadoDto } from './create-empleado.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, MinLength } from 'class-validator';

export class UpdateEmpleadoDto extends PartialType(CreateEmpleadoDto) {
    /**
     * ID interno del empleado.
     * 
     * Este campo se usa únicamente con fines de referencia y no debería modificarse manualmente.
     * Swagger lo muestra como un campo opcional para casos en que se necesite identificar un registro.
     */
    @ApiPropertyOptional({
        description: 'ID interno del empleado (solo para referencia, no modificable).',
        example: 5,
    })
    @IsOptional()
    @IsInt()
    emp_id?: number;

    /**
     * Nueva contraseña del empleado.
     * 
     * Si se envía, se cifrará automáticamente antes de guardarse en la base de datos.
     * Es opcional, ya que no siempre se requiere cambiar la contraseña durante una actualización.
     */
    @ApiPropertyOptional({
        description: 'Nueva contraseña del empleado (opcional, se cifrará antes de guardar).',
        example: 'NuevoPass123!',
    })
    @IsOptional()
    @IsString()
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres.' })
    emp_contrasena?: string;
}
