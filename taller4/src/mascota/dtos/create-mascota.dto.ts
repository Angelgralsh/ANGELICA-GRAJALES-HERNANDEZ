/**
 * DTO (Data Transfer Object) para crear una nueva mascota.
 * 
 * Valida los datos recibidos antes de ser procesados por el servicio
 * y se utiliza en la capa de controladores para definir la estructura esperada
 * del cuerpo de la solicitud (`request body`).
 * 
 * Los decoradores de `class-validator` garantizan que los datos sean válidos,
 * mientras que los de `@nestjs/swagger` permiten documentarlos en Swagger UI.
 */

import { IsString, IsNumber, IsOptional, IsInt, Min, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMascotaDto {
    /** Nombre de la mascota */
    @ApiProperty({
        description: 'Nombre completo de la mascota.',
        example: 'Firulais',
    })
    @IsString({ message: 'El nombre de la mascota debe ser una cadena de texto.' })
    @MaxLength(100, { message: 'El nombre no puede tener más de 100 caracteres.' })
    mascota_nombre: string;

    /** Especie de la mascota */
    @ApiProperty({
        description: 'Especie de la mascota (por ejemplo: Perro, Gato, Ave, etc.).',
        example: 'Perro',
    })
    @IsString({ message: 'La especie debe ser una cadena de texto.' })
    @MaxLength(50, { message: 'La especie no puede tener más de 50 caracteres.' })
    mascota_especie: string;

    /** Raza de la mascota (opcional) */
    @ApiPropertyOptional({
        description: 'Raza de la mascota (opcional).',
        example: 'Labrador Retriever',
    })
    @IsString({ message: 'La raza debe ser una cadena de texto.' })
    @MaxLength(50, { message: 'La raza no puede tener más de 50 caracteres.' })
    @IsOptional()
    mascota_raza?: string;

    /** Edad de la mascota (opcional) */
    @ApiPropertyOptional({
        description: 'Edad de la mascota en años (opcional).',
        example: 3,
    })
    @IsNumber({}, { message: 'La edad debe ser un número.' })
    @IsInt({ message: 'La edad debe ser un número entero.' })
    @Min(0, { message: 'La edad no puede ser negativa.' })
    @IsOptional()
    mascota_edad?: number;

    /** ID del cliente dueño de la mascota */
    @ApiProperty({
        description: 'ID del cliente dueño de la mascota.',
        example: 1,
    })
    @IsInt({ message: 'El ID del cliente debe ser un número entero.' })
    cli_id: number;
}
