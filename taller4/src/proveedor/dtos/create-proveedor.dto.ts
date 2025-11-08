/**
 * DTO (Data Transfer Object) para crear un nuevo proveedor.
 * 
 * Este DTO valida los datos que se reciben al registrar un proveedor nuevo.
 * 
 * Cada propiedad cuenta con validaciones y ejemplos para ser visibles en Swagger.
 */

import {
    IsString,
    IsEmail,
    Length,
    IsOptional,
    IsBoolean,
    MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProveedorDto {
    /** Nombre completo o razón social del proveedor */
    @ApiProperty({
        description: 'Nombre o razón social del proveedor',
        example: 'Distribuidora Canina S.A.S.',
    })
    @IsString()
    @Length(3, 100, { message: 'El nombre debe tener entre 3 y 100 caracteres.' })
    prove_nombre: string;

    /** Correo electrónico del proveedor */
    @ApiProperty({
        description: 'Correo electrónico de contacto del proveedor',
        example: 'contacto@distribuidora.com',
    })
    @IsEmail({}, { message: 'Debe ser un correo electrónico válido.' })
    @MaxLength(100)
    prove_email: string;

    /** Teléfono de contacto */
    @ApiProperty({
        description: 'Número de teléfono del proveedor',
        example: '+57 3104567890',
    })
    @IsString()
    @Length(7, 15, { message: 'El teléfono debe tener entre 7 y 15 caracteres.' })
    prove_telefono: string;

    /** Dirección física del proveedor */
    @ApiProperty({
        description: 'Dirección física o sede principal del proveedor',
        example: 'Calle 45 #23-67, Medellín',
    })
    @IsString()
    @Length(5, 200, { message: 'La dirección debe tener entre 5 y 200 caracteres.' })
    prove_direccion: string;

    /** RUC o NIT del proveedor */
    @ApiProperty({
        description: 'RUC o NIT del proveedor (identificación fiscal)',
        example: '900123456-7',
    })
    @IsString()
    @Length(5, 20, { message: 'El RUC/NIT debe tener entre 5 y 20 caracteres.' })
    prove_ruc: string;

    /** Estado activo/inactivo (opcional) */
    @ApiPropertyOptional({
        description: 'Estado del proveedor (true = activo, false = inactivo)',
        example: true,
    })
    @IsOptional()
    @IsBoolean()
    prove_activo?: boolean;
}
