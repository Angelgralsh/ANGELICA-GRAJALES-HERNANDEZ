import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreatePeliculaDto {
  @IsString()
  titulo: string;

  @IsString()
  genero: string;

  @IsNumber()
  duracion: number;

  @IsString()
  @IsOptional()
  descripcion?: string;
}