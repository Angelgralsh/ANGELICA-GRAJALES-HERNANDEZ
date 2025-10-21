import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Funcion } from './funcion.entity';
import { CreateFuncionDto } from './dto/crear-funcion.dto';
import { UpdateFuncionDto } from './dto/actualizar-funcion.dto';
import { Pelicula } from '../peliculas/pelicula.entity';
import { Sala } from '../sala/sala.entity';

@Injectable()
export class FuncionService {
  constructor(
    @InjectRepository(Funcion)
    private funcionRepo: Repository<Funcion>,

    @InjectRepository(Pelicula)
    private peliculaRepo: Repository<Pelicula>,

    @InjectRepository(Sala)
    private salaRepo: Repository<Sala>,
  ) {}

  async findAll(): Promise<Funcion[]> {
    return await this.funcionRepo.find({ relations: ['pelicula', 'sala'] });
  }

  async findOne(id: string): Promise<Funcion> {
    const funcion = await this.funcionRepo.findOne({
      where: { id },
      relations: ['pelicula', 'sala'],
    });
    if (!funcion) throw new NotFoundException(`Función con id ${id} no encontrada`);
    return funcion;
  }

  async create(data: CreateFuncionDto): Promise<Funcion> {
    const pelicula = await this.peliculaRepo.findOne({ where: { id: data.peliculaId, activo: true } });
    if (!pelicula) throw new BadRequestException(`Película con id ${data.peliculaId} no encontrada o inactiva`);

    const sala = await this.salaRepo.findOne({ where: { id: data.salaId, activo: true } });
    if (!sala) throw new BadRequestException(`Sala con id ${data.salaId} no encontrada o inactiva`);

    if (data.asientosDisponibles > sala.capacidad)
      throw new BadRequestException(`Los asientos disponibles no pueden exceder la capacidad (${sala.capacidad})`);

    const fecha = new Date(data.fechaHora);
    if (fecha <= new Date()) throw new BadRequestException('La fecha debe ser futura');

    const nuevaFuncion = this.funcionRepo.create({
      ...data,
      pelicula,
      sala,
      activo: true,
    });

    return await this.funcionRepo.save(nuevaFuncion);
  }

  async update(id: string, data: UpdateFuncionDto): Promise<Funcion> {
    const funcion = await this.findOne(id);

    if (data.salaId) {
      const sala = await this.salaRepo.findOne({ where: { id: data.salaId, activo: true } });
      if (!sala) throw new BadRequestException(`Sala con id ${data.salaId} no encontrada o inactiva`);
      if (data.asientosDisponibles && data.asientosDisponibles > sala.capacidad)
        throw new BadRequestException(`Los asientos disponibles no pueden exceder la capacidad (${sala.capacidad})`);
      funcion.sala = sala;
    }

    if (data.peliculaId) {
      const pelicula = await this.peliculaRepo.findOne({ where: { id: data.peliculaId, activo: true } });
      if (!pelicula) throw new BadRequestException(`Película con id ${data.peliculaId} no encontrada o inactiva`);
      funcion.pelicula = pelicula;
    }

    Object.assign(funcion, data);
    return await this.funcionRepo.save(funcion);
  }

  async remove(id: string): Promise<void> {
    const funcion = await this.findOne(id);
    await this.funcionRepo.remove(funcion);
  }

  async findByPelicula(peliculaId: string): Promise<Funcion[]> {
    return await this.funcionRepo.find({
      where: { pelicula: { id: peliculaId } },
      relations: ['pelicula', 'sala'],
    });
  }

  async findProximas(): Promise<Funcion[]> {
    const hoy = new Date();
    return await this.funcionRepo
      .createQueryBuilder('funcion')
      .leftJoinAndSelect('funcion.pelicula', 'pelicula')
      .leftJoinAndSelect('funcion.sala', 'sala')
      .where('funcion.fechaHora > :hoy', { hoy })
      .orderBy('funcion.fechaHora', 'ASC')
      .getMany();
  }

  async obtenerFuncionesPorFecha(fecha: Date): Promise<Funcion[]> {
    const inicio = new Date(fecha);
    inicio.setHours(0, 0, 0, 0);

    const fin = new Date(fecha);
    fin.setHours(23, 59, 59, 999);

    return await this.funcionRepo.find({
      where: {
        fechaHora: Between(inicio, fin),
      },
      relations: ['pelicula', 'sala'],
    });
  }
}