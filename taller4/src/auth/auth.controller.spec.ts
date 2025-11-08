import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

/**
 * ✅ Pruebas unitarias para el controlador AuthController.
 *
 * - Se mockea el AuthService.
 * - Se validan las llamadas y respuestas de cada endpoint.
 */
describe('AuthController', () => {
    let controller: AuthController;
    let service: AuthService;

    beforeEach(async () => {
        const mockAuthService = {
        registerCliente: jest.fn(),
        login: jest.fn(),
        loginAdmin: jest.fn(),
        loginEmpleado: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
        controllers: [AuthController],
        providers: [{ provide: AuthService, useValue: mockAuthService }],
        }).compile();

        controller = module.get<AuthController>(AuthController);
        service = module.get<AuthService>(AuthService);
    });

    // ============================================================
    // 🧩 TEST: Registro de Cliente
    // ============================================================
    it('debería registrar un cliente correctamente', async () => {
        const dto = {
        nombre: 'Carlos Gómez',
        correo: 'carlos@example.com',
        contrasena: '123456',
        telefono: '3001234567',
        direccion: 'Calle 10 #5-20',
        };

        const result = {
        message: 'Cliente registrado correctamente',
        cliente: { cli_id: 1, cli_nombre: 'Carlos Gómez', cli_correo: 'carlos@example.com' },
        };

        jest.spyOn(service, 'registerCliente').mockResolvedValue(result as any);

        const response = await controller.register(dto as any);

        expect(service.registerCliente).toHaveBeenCalledWith(dto);
        expect(response).toEqual(result);
    });

    // ============================================================
    // 🧩 TEST: Login de Cliente
    // ============================================================
    it('debería iniciar sesión como cliente correctamente', async () => {
        const dto = {
        correo: 'carlos@example.com',
        contrasena: '123456',
        };

        const result = {
        message: 'Inicio de sesión exitoso',
        tipo: 'Cliente',
        token: 'jwt-token-cliente',
        };

        jest.spyOn(service, 'login').mockResolvedValue(result as any);

        const response = await controller.login(dto as any);

        expect(service.login).toHaveBeenCalledWith(dto);
        expect(response).toEqual(result);
    });

    // ============================================================
    // 🧩 TEST: Login de Administrador
    // ============================================================
    it('debería iniciar sesión como administrador correctamente', async () => {
        const dto = {
        adm_correo: 'admin@empresa.com',
        adm_contrasena: 'admin123',
        };

        const result = {
        message: 'Login exitoso',
        token: 'jwt-token-admin',
        rol: 'admin',
        };

        jest.spyOn(service, 'loginAdmin').mockResolvedValue(result as any);

        const response = await controller.loginAdmin(dto as any);

        expect(service.loginAdmin).toHaveBeenCalledWith(dto);
        expect(response).toEqual(result);
    });

    // ============================================================
    // 🧩 TEST: Login de Empleado
    // ============================================================
    it('debería iniciar sesión como empleado correctamente', async () => {
        const dto = {
        emp_email: 'empleado@empresa.com',
        emp_contrasena: 'empleado123',
        };

        const result = {
        message: 'Login exitoso',
        token: 'jwt-token-empleado',
        rol: 'empleado',
        empleado: { emp_id: 3, emp_nombre: 'Juan Pérez' },
        };

        jest.spyOn(service, 'loginEmpleado').mockResolvedValue(result as any);

        const response = await controller.loginEmpleado(dto as any);

        expect(service.loginEmpleado).toHaveBeenCalledWith(dto.emp_email, dto.emp_contrasena);
        expect(response).toEqual(result);
    });
});
