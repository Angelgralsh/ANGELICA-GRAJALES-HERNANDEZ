import { IsString, IsInt, IsOptional, IsBoolean } from 'class-validator';

export class CreatePeliculaDto {
  @IsString()
  titulo: string;

  @IsString()
  genero: string;

  @IsInt()
  duracion: number;

  @IsOptional()
  @IsString()
  sinopsis?: string;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}