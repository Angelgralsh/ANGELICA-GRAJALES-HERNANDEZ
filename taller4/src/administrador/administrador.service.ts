/**
 * Servicio encargado de la lógica de negocio para la gestión de administradores.
 *
 * Este servicio maneja todas las operaciones relacionadas con la entidad `Administrador`,
 * incluyendo la creación, actualización, eliminación, búsqueda y validación de contraseñas.
 */

import { Injectable, NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Administrador } from './entities/administrador.entity';
import { CreateAdministradorDto } from './dtos/create-administrador.dto';
import { UpdateAdministradorDto } from './dtos/update-administrador.dto';
import * as argon2 from 'argon2';

@Injectable()
export class AdministradorService {
    constructor(
        @InjectRepository(Administrador)
        private readonly adminRepository: Repository<Administrador>,
    ) {}

    /**
     * Crea un nuevo administrador en la base de datos.
     *
     * @param dto - Datos del nuevo administrador.
     * @returns El administrador creado (sin incluir la contraseña).
     */
    async create(dto: CreateAdministradorDto): Promise<Administrador> {
        // Validar que venga contraseña para evitar hash vacío
        if (!dto.adm_contrasena || dto.adm_contrasena.trim() === '') {
            throw new BadRequestException('La contraseña es obligatoria para crear un administrador');
        }

        const admin = this.adminRepository.create(dto); // hash lo hace la entidad antes de guardar

        const saved = await this.adminRepository.save(admin);
        return this.sanitizeAdmin(saved);
    }

    /**
     * Busca un administrador por su correo electrónico.
     *
     * @param adm_correo - Correo del administrador.
     * @returns El administrador sin contraseña o null si no existe.
     */
    async findByCorreo(adm_correo: string): Promise<Administrador | null> {
        return await this.adminRepository.findOne({ where: { adm_correo } });
    }

    /**
     * Busca un administrador por su correo incluyendo contraseña (para login).
     *
     * @param adm_correo - Correo del administrador.
     * @returns El administrador con su contraseña.
     */
    async findByCorreoConContrasena(adm_correo: string): Promise<Administrador | null> {
        return await this.adminRepository.findOne({
            where: { adm_correo },
            select: ['adm_id', 'adm_nombre', 'adm_usuario', 'adm_correo', 'adm_activo', 'adm_contrasena'],
        });
    }

    /**
     * Obtiene la lista completa de administradores.
     *
     * @returns Arreglo con todos los administradores (sin contraseñas).
     */
    async findAll(): Promise<Administrador[]> {
        const admins = await this.adminRepository.find();
        return admins.map(a => this.sanitizeAdmin(a));
    }

    /**
     * Busca un administrador por su identificador único.
     *
     * @param id - ID del administrador.
     * @returns El administrador correspondiente.
     * @throws NotFoundException - Si no se encuentra el administrador.
     */
    async findOne(id: number): Promise<Administrador> {
        const admin = await this.adminRepository.findOne({ where: { adm_id: id } });
        if (!admin) throw new NotFoundException(`Administrador con ID ${id} no encontrado`);
        return this.sanitizeAdmin(admin);
    }

    /**
     * Actualiza los datos de un administrador existente.
     *
     * @param id - ID del administrador a actualizar.
     * @param dto - Datos nuevos del administrador.
     * @returns El administrador actualizado (sin contraseña).
     * @throws NotFoundException - Si el administrador no existe.
     */
    async update(id: number, dto: UpdateAdministradorDto): Promise<Administrador> {
        // Buscar admin con contraseña SI se va a cambiar
        let admin = await this.adminRepository.findOne({
            where: { adm_id: id },
            select: ['adm_id', 'adm_nombre', 'adm_usuario', 'adm_correo', 'adm_activo', 'adm_contrasena']
        });

        if (!admin) {
            throw new NotFoundException(`Administrador con ID ${id} no encontrado`);
        }

        // Si viene nueva contraseña — encriptar
        if (dto.adm_contrasena) {
            dto.adm_contrasena = await argon2.hash(dto.adm_contrasena);
        } else {
            // Si NO viene contraseña, no tocar la existente
            delete dto.adm_contrasena;
        }

        Object.assign(admin, dto);

        const updated = await this.adminRepository.save(admin);
        return this.sanitizeAdmin(updated);
    }

    /**
     * Elimina un administrador de la base de datos.
     *
     * @param id - ID del administrador a eliminar.
     * @throws NotFoundException - Si el administrador no existe.
     */
    async remove(id: number): Promise<void> {
        const admin = await this.findOne(id);
        await this.adminRepository.remove(admin);
    }

    /**
     * Método usado para login en AuthService
     */
    async validateAdminLogin(adm_correo: string, password: string) {
        const admin = await this.findByCorreoConContrasena(adm_correo);
        if (!admin) throw new UnauthorizedException('Credenciales inválidas');

        const valid = await argon2.verify(admin.adm_contrasena, password);
        if (!valid) throw new UnauthorizedException('Credenciales inválidas');

        return this.sanitizeAdmin(admin);
    }

    /**
     * Elimina la contraseña del objeto antes de devolverlo
     */
    private sanitizeAdmin(admin: Administrador): Administrador {
        const { adm_contrasena, ...safe } = admin;
        return safe as Administrador;
    }
}
