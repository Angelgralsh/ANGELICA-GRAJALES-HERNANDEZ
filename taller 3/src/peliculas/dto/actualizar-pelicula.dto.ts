import { PartialType } from '@nestjs/mapped-types';
import { CreatePeliculaDto } from './crear-pelicula.dto';

export class UpdatePeliculaDto extends PartialType(CreatePeliculaDto) {}