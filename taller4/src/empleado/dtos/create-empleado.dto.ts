/**
 * DTO (Data Transfer Object) para crear un nuevo empleado.
 * 
 * Valida y documenta los datos que se deben enviar al crear un empleado.
 * 
 * Usa decoradores de `class-validator` para validación
 * y `@ApiProperty` de `@nestjs/swagger` para la documentación.
 */

import {
    IsString,
    IsEmail,
    IsOptional,
    IsBoolean,
    Length,
    IsInt,
    MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEmpleadoDto {
    /** Nombre completo del empleado */
    @ApiProperty({
        description: 'Nombre completo del empleado',
        example: 'María López',
    })
    @IsString()
    @Length(3, 100, { message: 'El nombre debe tener entre 3 y 100 caracteres.' })
    emp_nombre: string;

    /** Correo electrónico único del empleado */
    @ApiProperty({
        description: 'Correo electrónico corporativo del empleado (único)',
        example: 'maria.lopez@empresa.com',
    })
    @IsEmail({}, { message: 'Debe ser un correo electrónico válido.' })
    emp_email: string;

    /**
     * Contraseña del empleado.
     * 
     * Se cifrará antes de guardarse en la base de datos.
     */
    @ApiProperty({
        description: 'Contraseña del empleado (mínimo 6 caracteres)',
        example: 'Password123!',
    })
    @IsString()
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres.' })
    emp_contrasena: string;

    /** Cargo o puesto laboral del empleado */
    @ApiProperty({
        description: 'Cargo o puesto laboral del empleado dentro de la tienda',
        example: 'Vendedor',
    })
    @IsString()
    @Length(3, 50, { message: 'El cargo debe tener entre 3 y 50 caracteres.' })
    emp_cargo: string;

    /** Estado activo/inactivo del empleado (por defecto activo) */
    @ApiPropertyOptional({
        description: 'Estado del empleado (activo o inactivo)',
        example: true,
    })
    @IsOptional()
    @IsBoolean()
    emp_activo?: boolean;

    /** Identificador de la tienda a la que pertenece el empleado */
    @ApiPropertyOptional({
        description: 'ID de la tienda a la que pertenece el empleado',
        example: 1,
    })
    @IsOptional()
    @IsInt({ message: 'El ID de tienda debe ser un número entero.' })
    tienda_id?: number;
}
