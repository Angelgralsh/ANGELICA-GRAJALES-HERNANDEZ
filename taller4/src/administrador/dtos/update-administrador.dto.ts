/**
 * DTO para actualizar un administrador existente.
 * 
 * Hereda las propiedades del DTO de creación,
 * haciéndolas opcionales para permitir actualizaciones parciales.
 */

import { PartialType } from '@nestjs/swagger';
import { CreateAdministradorDto } from './create-administrador.dto';

export class UpdateAdministradorDto extends PartialType(CreateAdministradorDto) {}
