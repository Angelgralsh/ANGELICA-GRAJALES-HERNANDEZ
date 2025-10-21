import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import * as bcrypt from 'bcryptjs';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepo: Repository<Usuario>,
  ) {}

  async create(dto: CreateUsuarioDto) {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(dto.password, salt);
    const usuario = this.usuariosRepo.create({ ...dto, password: hashed });
    return this.usuariosRepo.save(usuario);
  }

  findAll() {
    return this.usuariosRepo.find();
  }

  async findOne(id: string) {
    const u = await this.usuariosRepo.findOne({ where: { id } });
    if (!u) throw new NotFoundException('Usuario no encontrado');
    return u;
  }

  async remove(id: string) {
    const res = await this.usuariosRepo.delete(id);
    return res;
  }
}