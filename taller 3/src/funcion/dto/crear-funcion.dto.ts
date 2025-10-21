import { IsUUID, IsDateString, IsNumber, IsInt } from 'class-validator';

export class CreateFuncionDto {
  @IsUUID()
  peliculaId: string;

  @IsUUID()
  salaId: string;

  @IsDateString()
  fechaHora: Date;

  @IsNumber()
  precio: number;

  @IsInt()
  asientosDisponibles: number;
}