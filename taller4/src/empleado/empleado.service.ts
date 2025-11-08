/**
 * Servicio encargado de la lógica de negocio de empleados.
 *
 * Implementa:
 * CRUD de empleados
 * Encriptación de contraseña con Argon2 (una sola vez)
 * Login (acceso a contraseña cifrada cuando se necesita)
 * Actualización sin romper password
 * Filtros de búsqueda
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empleado } from './entities/empleado.entity';
import { CreateEmpleadoDto } from './dtos/create-empleado.dto';
import { UpdateEmpleadoDto } from './dtos/update-empleado.dto';
import { Tienda } from '../tienda/entities/tienda.entity';
import { Venta } from '../venta/entities/venta.entity';
import * as argon2 from 'argon2';

@Injectable()
export class EmpleadoService {
    constructor(
        @InjectRepository(Empleado)
        private readonly empleadoRepository: Repository<Empleado>,

        @InjectRepository(Tienda)
        private readonly tiendaRepository: Repository<Tienda>,

        @InjectRepository(Venta)
        private readonly ventaRepository: Repository<Venta>,
    ) {}

    /**
     * Crea un nuevo empleado, cifrando su contraseña si se proporciona.
     */
    async create(createEmpleadoDto: CreateEmpleadoDto): Promise<Empleado> {
        const { tienda_id, emp_contrasena } = createEmpleadoDto;

        // Hash de la contraseña solo si viene en el DTO
        const hashedPass = emp_contrasena ? await argon2.hash(emp_contrasena) : null;

        // Armamos el objeto
        const empleado = this.empleadoRepository.create({
            ...createEmpleadoDto,
            emp_contrasena: hashedPass,
            tienda: tienda_id ? { tienda_id } : null, // relación FK
        } as any);

        // Guardamos — TypeORM puede devolver array, así que lo controlamos
        const saved = await this.empleadoRepository.save(empleado as any);

        return Array.isArray(saved) ? saved[0] as Empleado : saved as Empleado;
    }


    /**
     * Obtener empleados con filtros opcionales
     * @param filters activo? cargo?
     */
    async findAll(filters?: { activo?: boolean; cargo?: string }): Promise<Empleado[]> {
        const query = this.empleadoRepository
            .createQueryBuilder('empleado')
            .leftJoinAndSelect('empleado.tienda', 'tienda')
            .leftJoinAndSelect('empleado.ventas', 'ventas');

        if (filters?.activo !== undefined)
            query.andWhere('empleado.emp_activo = :activo', { activo: filters.activo });

        if (filters?.cargo)
            query.andWhere('empleado.emp_cargo LIKE :cargo', { cargo: `%${filters.cargo}%` });

        return await query.getMany();
    }

    /**
     * Buscar empleado por correo
     * Nota: no trae contraseña
     */
    async findByCorreo(emp_email: string): Promise<Empleado | null> {
        return await this.empleadoRepository.findOne({ where: { emp_email } });
    }

    /**
     * Buscar empleado por correo incluyendo contraseña
     * Necesario para LOGIN
     */
    async findByCorreoConContrasena(emp_email: string): Promise<Empleado | null> {
        return await this.empleadoRepository.findOne({
            where: { emp_email },
            select: [
                'emp_id',
                'emp_nombre',
                'emp_email',
                'emp_contrasena',
                'emp_cargo',
                'emp_activo',
            ],
            relations: ['tienda'],
        });
    }

    /**
     * Buscar un empleado por ID
     */
    async findOne(id: number): Promise<Empleado> {
        const empleado = await this.empleadoRepository.findOne({
            where: { emp_id: id },
            relations: ['tienda', 'ventas'],
        });

        if (!empleado)
            throw new NotFoundException(`Empleado con ID ${id} no encontrado`);

        return empleado;
    }

    /** Buscar empleados de una tienda */
    async findByTienda(tiendaId: number): Promise<Empleado[]> {
        return await this.empleadoRepository.find({
            where: { tienda: { tienda_id: tiendaId } },
            relations: ['tienda', 'ventas'],
        });
    }

    /** Buscar empleados por cargo */
    async findByCargo(cargo: string): Promise<Empleado[]> {
        return await this.empleadoRepository.find({
            where: { emp_cargo: cargo },
            relations: ['tienda', 'ventas'],
        });
    }

    /**
     * Actualizar empleado
     * Estrategia:
     *  - Si trae nueva contraseña → se encripta
     *  - Solo actualiza campos enviados
     *  - Manejo seguro de tienda_id
     *  - No borra contraseña existente
     */
    async update(id: number, updateEmpleadoDto: UpdateEmpleadoDto): Promise<Empleado> {
        const existe = await this.empleadoRepository.findOne({ where: { emp_id: id } });
        if (!existe) throw new NotFoundException(`Empleado con ID ${id} no encontrado`);

        const updateData: Partial<Empleado> = {};

        if (updateEmpleadoDto.emp_contrasena)
            updateData.emp_contrasena = await argon2.hash(updateEmpleadoDto.emp_contrasena);

        if (updateEmpleadoDto.emp_nombre !== undefined)
            updateData.emp_nombre = updateEmpleadoDto.emp_nombre;

        if (updateEmpleadoDto.emp_email !== undefined)
            updateData.emp_email = updateEmpleadoDto.emp_email;

        if (updateEmpleadoDto.emp_cargo !== undefined)
            updateData.emp_cargo = updateEmpleadoDto.emp_cargo;

        if (updateEmpleadoDto.emp_activo !== undefined)
            updateData.emp_activo = updateEmpleadoDto.emp_activo;

        if (updateEmpleadoDto.tienda_id !== undefined)
            updateData.tienda_id = updateEmpleadoDto.tienda_id as any;

        if (Object.keys(updateData).length === 0)
            return this.findOne(id);

        await this.empleadoRepository.update({ emp_id: id }, updateData);

        return this.findOne(id);
    }

    /**
     * Cambiar estado activo del empleado
     */
    async updateEstado(id: number, activo: boolean): Promise<Empleado> {
        const empleado = await this.findOne(id);
        empleado.emp_activo = activo;
        return await this.empleadoRepository.save(empleado as any);
    }

    /**
     * Eliminar empleado
     */
    async remove(id: number): Promise<void> {
        const empleado = await this.findOne(id);
        await this.empleadoRepository.remove(empleado);
    }
}
