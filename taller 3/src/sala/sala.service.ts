import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sala } from './sala.entity';

@Injectable()
export class SalaService {
  constructor(
    @InjectRepository(Sala)
    private readonly salaRepository: Repository<Sala>,
  ) {}

  async findAll(): Promise<Sala[]> {
    return await this.salaRepository.find();
  }

  async findOne(id: string): Promise<Sala> {
    const sala = await this.salaRepository.findOne({ where: { id } });
    if (!sala) {
      throw new NotFoundException(`No se encontró la sala con ID ${id}`);
    }
    return sala;
  }

  async create(data: Partial<Sala>): Promise<Sala> {
    const nuevaSala = this.salaRepository.create(data);
    return await this.salaRepository.save(nuevaSala);
  }

  async update(id: string, data: Partial<Sala>): Promise<Sala> {
    const sala = await this.findOne(id);
    Object.assign(sala, data);
    return await this.salaRepository.save(sala);
  }

  async remove(id: string): Promise<void> {
    const sala = await this.findOne(id);
    await this.salaRepository.remove(sala);
  }
}