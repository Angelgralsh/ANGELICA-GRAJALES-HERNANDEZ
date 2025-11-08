import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { ClienteService } from '../cliente/cliente.service';
import { AdministradorService } from '../administrador/administrador.service';
import { EmpleadoService } from '../empleado/empleado.service';
import * as argon2 from 'argon2';
import { UnauthorizedException, BadRequestException } from '@nestjs/common';

// Mock global de argon2
jest.mock('argon2', () => ({
    hash: jest.fn().mockResolvedValue('hashed-password'),
    verify: jest.fn().mockImplementation(async (hash, plain) => plain === 'correct-password'),
    }));

    describe('AuthService', () => {
    let service: AuthService;
    let clienteService: jest.Mocked<ClienteService>;
    let adminService: jest.Mocked<AdministradorService>;
    let empleadoService: jest.Mocked<EmpleadoService>;
    let jwtService: jest.Mocked<JwtService>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        providers: [
            AuthService,
            {
            provide: JwtService,
            useValue: { signAsync: jest.fn().mockResolvedValue('mocked-jwt-token') },
            },
            {
            provide: ClienteService,
            useValue: {
                create: jest.fn(),
                findByCorreoConContrasena: jest.fn(),
                findOne: jest.fn(),
            },
            },
            {
            provide: AdministradorService,
            useValue: {
                validateAdminLogin: jest.fn(),
                findOne: jest.fn(),
            },
            },
            {
            provide: EmpleadoService,
            useValue: {
                findByCorreo: jest.fn(),
                findByCorreoConContrasena: jest.fn(),
                findOne: jest.fn(),
            },
            },
        ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        clienteService = module.get(ClienteService);
        adminService = module.get(AdministradorService);
        empleadoService = module.get(EmpleadoService);
        jwtService = module.get(JwtService);
    });

    // ============================================================
    // 🧩 registerCliente()
    // ============================================================
    it('debería registrar un cliente correctamente', async () => {
        const dto = {
        nombre: 'Carlos',
        correo: 'carlos@example.com',
        contrasena: 'correct-password',
        telefono: '3001234567',
        direccion: 'Calle 10 #20-30',
        };

        const savedCliente = { cli_id: 1, cli_nombre: 'Carlos', cli_correo: 'carlos@example.com' };
        clienteService.create.mockResolvedValue(savedCliente as any);

        const result = await service.registerCliente(dto as any);

        expect(argon2.hash).toHaveBeenCalledWith(dto.contrasena);
        expect(clienteService.create).toHaveBeenCalled();
        expect(result).toEqual({
        message: 'Cliente registrado correctamente',
        cliente: savedCliente,
        });
    });

    it('debería lanzar BadRequestException si el correo ya está registrado', async () => {
        const dto = { nombre: 'Carlos', correo: 'duplicado@mail.com', contrasena: '123456' };
        clienteService.create.mockRejectedValue({ code: '23505' });

        await expect(service.registerCliente(dto as any)).rejects.toThrow(BadRequestException);
    });

    // ============================================================
    // 🧩 login() - Cliente
    // ============================================================
    it('debería autenticar correctamente a un cliente', async () => {
        const cliente = { cli_id: 1, cli_contrasena: 'hashed-password' };
        clienteService.findByCorreoConContrasena.mockResolvedValue(cliente as any);

        const result = await service.login({
        correo: 'cliente@mail.com',
        contrasena: 'correct-password',
        } as any);

        expect(clienteService.findByCorreoConContrasena).toHaveBeenCalled();
        expect(jwtService.signAsync).toHaveBeenCalled();
        expect(result.tipo).toBe('Cliente');
    });

    // ============================================================
    // 🧩 login() - Empleado
    // ============================================================
    it('debería autenticar correctamente a un empleado', async () => {
        clienteService.findByCorreoConContrasena.mockResolvedValue(null);
        empleadoService.findByCorreo.mockResolvedValue({
        emp_id: 2,
        emp_contrasena: 'hashed-password',
        } as any);

        const result = await service.login({
        correo: 'empleado@mail.com',
        contrasena: 'correct-password',
        } as any);

        expect(empleadoService.findByCorreo).toHaveBeenCalled();
        expect(result.tipo).toBe('Empleado');
    });

    it('debería lanzar UnauthorizedException si las credenciales son inválidas', async () => {
        clienteService.findByCorreoConContrasena.mockResolvedValue(null);
        empleadoService.findByCorreo.mockResolvedValue(null);

        await expect(
        service.login({ correo: 'x@mail.com', contrasena: 'wrong-password' } as any),
        ).rejects.toThrow(UnauthorizedException);
    });

    // ============================================================
    // 🧩 loginAdmin()
    // ============================================================
    it('debería autenticar correctamente a un administrador', async () => {
        const admin = { adm_id: 1 };
        adminService.validateAdminLogin.mockResolvedValue(admin as any);

        const result = await service.loginAdmin({
        adm_correo: 'admin@mail.com',
        adm_contrasena: 'correct-password',
        } as any);

        expect(adminService.validateAdminLogin).toHaveBeenCalled();
        expect(result).toEqual({
        message: 'Login exitoso',
        token: 'mocked-jwt-token',
        rol: 'admin',
        });
    });

    // ============================================================
    // 🧩 loginEmpleado()
    // ============================================================
    it('debería autenticar correctamente a un empleado por loginEmpleado()', async () => {
        empleadoService.findByCorreoConContrasena.mockResolvedValue({
        emp_id: 2,
        emp_contrasena: 'hashed-password',
        emp_nombre: 'Juan Pérez',
        } as any);

        const result = await service.loginEmpleado('empleado@mail.com', 'correct-password');

        expect(result.rol).toBe('empleado');
        expect(jwtService.signAsync).toHaveBeenCalled();
    });

    it('debería lanzar UnauthorizedException si el empleado no existe', async () => {
        empleadoService.findByCorreoConContrasena.mockResolvedValue(null);

        await expect(service.loginEmpleado('no@mail.com', '123456')).rejects.toThrow(UnauthorizedException);
    });

    // ============================================================
    // 🧩 validarUsuario()
    // ============================================================
    it('debería devolver el usuario según su rol (admin)', async () => {
        adminService.findOne.mockResolvedValue({ adm_id: 1, nombre: 'Admin' } as any);
        const result = await service.validarUsuario({ id: 1, rol: 'admin' });
        expect(result.rol).toBe('admin');
    });

    it('debería devolver el usuario según su rol (cliente)', async () => {
        clienteService.findOne.mockResolvedValue({ cli_id: 1, nombre: 'Cliente' } as any);
        const result = await service.validarUsuario({ id: 1, rol: 'cliente' });
        expect(result.rol).toBe('cliente');
    });

    it('debería lanzar UnauthorizedException si el token no es válido', async () => {
        adminService.findOne.mockResolvedValue(null as any);
        clienteService.findOne.mockResolvedValue(null as any);
        empleadoService.findOne.mockResolvedValue(null as any);

        await expect(service.validarUsuario({ id: 99, rol: 'empleado' })).rejects.toThrow(
        UnauthorizedException,
        );
    });
});
