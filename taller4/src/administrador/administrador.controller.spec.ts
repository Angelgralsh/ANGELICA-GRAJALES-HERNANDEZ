import { Test, TestingModule } from '@nestjs/testing';
import { AdministradorController } from './administrador.controller';
import { AdministradorService } from './administrador.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateAdministradorDto } from './dtos/create-administrador.dto';
import { UpdateAdministradorDto } from './dtos/update-administrador.dto';

/**
 * Pruebas unitarias para el AdministradorController
 *
 * - Se usa Jest (el framework de testing por defecto de NestJS).
 * - El objetivo es verificar que el controlador:
 *   a) Llama correctamente a los métodos del servicio.
 *   b) Devuelve los resultados esperados.
 */
describe('AdministradorController', () => {
    let controller: AdministradorController;
    let service: AdministradorService;

    // 👇 Simulamos el servicio (mock) para no usar base de datos real.
    const mockAdministradorService = {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
    };

    // ============================================================
    // Configuración del módulo de pruebas
    // ============================================================
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        controllers: [AdministradorController],
        providers: [
            // Sustituimos el servicio real por el mock
            { provide: AdministradorService, useValue: mockAdministradorService },
        ],
        })
        // Mockeamos los guards para que no bloqueen las rutas
        .overrideGuard(JwtAuthGuard)
        .useValue({ canActivate: jest.fn(() => true) })
        .overrideGuard(RolesGuard)
        .useValue({ canActivate: jest.fn(() => true) })
        .compile();

        // Obtenemos las instancias listas para probar
        controller = module.get<AdministradorController>(AdministradorController);
        service = module.get<AdministradorService>(AdministradorService);
    });

    // Limpia los mocks entre pruebas
    afterEach(() => {
        jest.clearAllMocks();
    });

    // ============================================================
    // 🧪 PRUEBA: CREATE
    // ============================================================
    describe('create', () => {
        it('debería crear un administrador correctamente', async () => {
        const dto: CreateAdministradorDto = {
            adm_nombre: 'Carlos Pérez',
            adm_correo: 'carlos@example.com',
            adm_contrasena: 'secure123',
        } as any;

        // Valor esperado
        const result = {
            adm_id: 1,
            adm_nombre: dto.adm_nombre,
            adm_correo: dto.adm_correo,
        };

        // El mock del servicio devuelve este resultado
        mockAdministradorService.create.mockResolvedValue(result);

        // Ejecutamos el método del controlador
        const response = await controller.create(dto);

        // ✅ Verificaciones:
        expect(service.create).toHaveBeenCalledWith(dto);
        expect(response).toEqual(result);
        });
    });

    // ============================================================
    // 🧪 PRUEBA: FIND ALL
    // ============================================================
    describe('findAll', () => {
        it('debería retornar una lista de administradores', async () => {
        const result = [
            { adm_id: 1, adm_nombre: 'Admin 1', adm_correo: 'a1@example.com' },
            { adm_id: 2, adm_nombre: 'Admin 2', adm_correo: 'a2@example.com' },
        ];

        mockAdministradorService.findAll.mockResolvedValue(result);

        const response = await controller.findAll();

        expect(service.findAll).toHaveBeenCalled();
        expect(response).toEqual(result);
        });
    });

    // ============================================================
    // 🧪 PRUEBA: FIND ONE
    // ============================================================
    describe('findOne', () => {
        it('debería retornar un administrador por su ID', async () => {
        const result = {
            adm_id: 1,
            adm_nombre: 'Carlos Pérez',
            adm_correo: 'carlos@example.com',
        };

        mockAdministradorService.findOne.mockResolvedValue(result);

        const response = await controller.findOne(1);

        expect(service.findOne).toHaveBeenCalledWith(1);
        expect(response).toEqual(result);
        });
    });

    // ============================================================
    // 🧪 PRUEBA: UPDATE
    // ============================================================
    describe('update', () => {
        it('debería actualizar un administrador correctamente', async () => {
        const dto: UpdateAdministradorDto = {
            adm_nombre: 'Carlos M. Pérez',
            adm_correo: 'carlos.m@example.com',
        } as any;

        const result = {
            adm_id: 1,
            ...dto,
        };

        mockAdministradorService.update.mockResolvedValue(result);

        const response = await controller.update(1, dto);

        expect(service.update).toHaveBeenCalledWith(1, dto);
        expect(response).toEqual(result);
        });
    });

    // ============================================================
    // 🧪 PRUEBA: REMOVE
    // ============================================================
    describe('remove', () => {
        it('debería eliminar un administrador correctamente', async () => {
        mockAdministradorService.remove.mockResolvedValue(undefined);

        const response = await controller.remove(1);

        expect(service.remove).toHaveBeenCalledWith(1);
        expect(response).toBeUndefined();
        });
    });
});
