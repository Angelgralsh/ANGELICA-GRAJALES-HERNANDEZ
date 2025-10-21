import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pelicula } from './pelicula.entity';
import { CreatePeliculaDto } from './dto/create-pelicula.dto';
import { UpdatePeliculaDto } from './dto/actualizar-pelicula.dto';

@Injectable()
export class PeliculasService {
  constructor(
    @InjectRepository(Pelicula)
    private peliculaRepo: Repository<Pelicula>,
  ) {}

  async findAll(): Promise<Pelicula[]> {
    return this.peliculaRepo.find();
  }

  async findOne(id: string): Promise<Pelicula> {
    const pelicula = await this.peliculaRepo.findOne({ where: { id } });
    if (!pelicula) {
      throw new NotFoundException(`Película con id ${id} no encontrada`);
    }
    return pelicula;
  }

  async create(data: CreatePeliculaDto): Promise<Pelicula> {
    if (!data.titulo?.trim()) {
      throw new BadRequestException('El título de la película es requerido');
    }
    if (data.duracion <= 0) {
      throw new BadRequestException('La duración debe ser mayor a 0 minutos');
    }
    const nueva = this.peliculaRepo.create(data);
    return this.peliculaRepo.save(nueva);
  }

  async update(id: string, data: UpdatePeliculaDto): Promise<Pelicula> {
    const pelicula = await this.findOne(id);
    Object.assign(pelicula, data);
    return this.peliculaRepo.save(pelicula);
  }

  async remove(id: string): Promise<void> {
    const pelicula = await this.findOne(id);
    await this.peliculaRepo.remove(pelicula);
  }

  async findByGenero(genero: string): Promise<Pelicula[]> {
    return this.peliculaRepo.find({ where: { genero } });
  }

  async findActivas(): Promise<Pelicula[]> {
    return this.peliculaRepo.find({ where: { activo: true } });
  }
}