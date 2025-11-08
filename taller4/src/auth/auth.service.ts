/**
 * ============================================================
 * 🧩 Servicio de Autenticación (AuthService)
 * ============================================================
 *
 * Este servicio centraliza toda la lógica de autenticación del sistema.
 * 
 * Funcionalidades principales:
 * - Registro de nuevos clientes (con encriptación de contraseñas).
 * - Inicio de sesión para clientes, empleados y administradores.
 * - Generación y validación de tokens JWT.
 * - Validación de roles de usuario autenticado.
 *
 * Tecnologías utilizadas:
 * - `argon2`: para el hash seguro de contraseñas.
 * - `@nestjs/jwt`: para la generación de tokens JWT.
 * - `TypeORM`: a través de los servicios de dominio (Cliente, Empleado, Admin).
 */

import {
    Injectable,
    UnauthorizedException,
    BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { ClienteService } from '../cliente/cliente.service';
import { AdministradorService } from '../administrador/administrador.service';
import { EmpleadoService } from '../empleado/empleado.service';
import { LoginDto } from './dtos/login-cliente.dto';
import { RegisterDto } from './dtos/register-cliente.dto';
import { LoginAdminDto } from './dtos/login-admin.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly clienteService: ClienteService,
        private readonly adminService: AdministradorService,
        private readonly empleadoService: EmpleadoService,
    ) {}

    // ============================================================
    // 🧍 1️⃣ Registro de Clientes
    // ============================================================

    /**
     * Registra un nuevo cliente en el sistema con su contraseña encriptada.
     *
     * @param dto - Datos de registro del cliente (nombre, correo, contraseña, etc.)
     * @returns Objeto con mensaje de éxito y datos del cliente creado.
     * 
     * @throws BadRequestException Si el correo ya está registrado.
     */
    async registerCliente(dto: RegisterDto) {
        try {
        const hash = await argon2.hash(dto.contrasena);

        const nuevoCliente = await this.clienteService.create({
            cli_nombre: dto.nombre,
            cli_correo: dto.correo,
            cli_contrasena: hash,
            cli_telefono: dto.telefono,
            cli_direccion: dto.direccion,
        });

        // Remueve la contraseña antes de enviar la respuesta
        delete (nuevoCliente as any).cli_contrasena;

        return {
            message: 'Cliente registrado correctamente',
            cliente: nuevoCliente,
        };
        } catch (error) {
        if ((error as any).code === '23505') {
            throw new BadRequestException('El correo ya está registrado');
        }
        throw error;
        }
    }

    // ============================================================
    // 🔐 2️⃣ Inicio de Sesión General (Cliente / Empleado)
    // ============================================================

    /**
     * Permite iniciar sesión a un cliente o empleado según sus credenciales.
     *
     * @param dto - Datos de acceso (correo y contraseña)
     * @returns Token JWT y tipo de usuario autenticado.
     * 
     * @throws UnauthorizedException Si las credenciales no son válidas.
     */
    async login(dto: LoginDto) {
        const { correo, contrasena } = dto;

        // --- 1️⃣ Intento con Cliente ---
        const cliente = await this.clienteService.findByCorreoConContrasena(correo);
        if (cliente?.cli_contrasena && await argon2.verify(cliente.cli_contrasena, contrasena)) {
        const token = await this.generarToken({ id: cliente.cli_id, rol: 'cliente' });
        return { message: 'Inicio de sesión exitoso', tipo: 'Cliente', token };
        }

        // --- 2️⃣ Intento con Empleado ---
        const empleado = await this.empleadoService.findByCorreo(correo);
        if (empleado?.emp_contrasena && await argon2.verify(empleado.emp_contrasena, contrasena)) {
        const token = await this.generarToken({ id: empleado.emp_id, rol: 'empleado' });
        return { message: 'Inicio de sesión exitoso', tipo: 'Empleado', token };
        }

        // --- ❌ Falla ---
        throw new UnauthorizedException('Credenciales inválidas');
    }

    // ============================================================
    // 🧑‍💼 3️⃣ Inicio de Sesión de Administradores
    // ============================================================

    /**
     * Valida las credenciales de un administrador y genera su token JWT.
     *
     * @param dto - Credenciales del administrador (correo y contraseña)
     * @returns Token JWT firmado y rol asignado.
     * 
     * @throws UnauthorizedException Si las credenciales son incorrectas.
     */
    async loginAdmin(dto: LoginAdminDto) {
        const admin = await this.adminService.validateAdminLogin(dto.adm_correo, dto.adm_contrasena);

        const payload = { id: admin.adm_id, rol: 'admin' };
        const token = await this.jwtService.signAsync(payload);

        return {
        message: 'Login exitoso',
        token,
        rol: 'admin',
        };
    }

    // ============================================================
    // 👷 4️⃣ Inicio de Sesión de Empleados
    // ============================================================

    /**
     * Permite el login de un empleado mediante su correo y contraseña.
     * 
     * @param email - Correo electrónico del empleado.
     * @param password - Contraseña en texto plano.
     * @returns Token JWT y datos básicos del empleado autenticado.
     * 
     * @throws UnauthorizedException Si las credenciales no son válidas.
     */
    async loginEmpleado(email: string, password: string) {
        const empleado = await this.empleadoService.findByCorreoConContrasena(email);
        if (!empleado) throw new UnauthorizedException('Credenciales inválidas');

        const valid = await argon2.verify(empleado.emp_contrasena, password);
        if (!valid) throw new UnauthorizedException('Credenciales inválidas');

        const payload = { id: empleado.emp_id, rol: 'empleado' };
        const token = await this.jwtService.signAsync(payload);

        if ('emp_contrasena' in empleado) {
        delete (empleado as any).emp_contrasena;
        }

        return {
        message: 'Login exitoso',
        token,
        rol: 'empleado',
        empleado,
        };
    }

    // ============================================================
    // 🔑 5️⃣ Generación de Tokens JWT
    // ============================================================

    /**
     * Genera un token JWT firmado con los datos del usuario.
     *
     * @param payload - Información mínima del usuario (id, rol)
     * @returns Token JWT firmado.
     */
    async generarToken(payload: { id: number; rol: string }) {
        return this.jwtService.signAsync(payload);
    }

    // ============================================================
    // 🧾 6️⃣ Validación de Usuario por Token
    // ============================================================

    /**
     * Valida y retorna la información del usuario autenticado según su rol.
     *
     * @param payload - Datos decodificados del token JWT.
     * @returns Objeto con la información del usuario autenticado.
     * 
     * @throws UnauthorizedException Si el token es inválido o el usuario no existe.
     */
    async validarUsuario(payload: any) {
        if (payload.rol === 'admin') {
        const admin = await this.adminService.findOne(payload.id);
        if (admin) return { ...admin, rol: 'admin' };
        }

        if (payload.rol === 'cliente') {
        const cliente = await this.clienteService.findOne(payload.id);
        if (cliente) return { ...cliente, rol: 'cliente' };
        }

        if (payload.rol === 'empleado') {
        const empleado = await this.empleadoService.findOne(payload.id);
        if (empleado) return { ...empleado, rol: 'empleado' };
        }

        throw new UnauthorizedException('Token inválido o usuario no encontrado');
    }
}
