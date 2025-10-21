import { PartialType } from '@nestjs/mapped-types';
import { CreateFuncionDto } from './crear-funcion.dto';

export class UpdateFuncionDto extends PartialType(CreateFuncionDto) {}