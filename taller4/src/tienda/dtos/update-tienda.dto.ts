import { PartialType } from '@nestjs/swagger';
import { CreateTiendaDto } from './create-tienda.dto';

/**
 * DTO (Data Transfer Object) para actualizar los datos de una tienda existente.
 * 
 * Hereda las validaciones del DTO de creación (`CreateTiendaDto`) y convierte
 * todas sus propiedades en opcionales, lo que permite actualizaciones parciales.
 * 
 * Este DTO se usa principalmente en operaciones tipo PATCH o PUT.
 */
export class UpdateTiendaDto extends PartialType(CreateTiendaDto) {}
