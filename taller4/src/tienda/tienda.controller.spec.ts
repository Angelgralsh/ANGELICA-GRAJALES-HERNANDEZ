import { Test, TestingModule } from '@nestjs/testing';
import { TiendaController } from './tienda.controller';
import { TiendaService } from './tienda.service';

/**
 * ✅ Pruebas unitarias para el controlador TiendaController.
 * 
 * Se mockea el servicio TiendaService y se verifican las llamadas
 * y retornos esperados del controlador.
 */
describe('TiendaController', () => {
    let controller: TiendaController;
    let service: TiendaService;

    beforeEach(async () => {
        const mockTiendaService = {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        findEmpleados: jest.fn(),
        update: jest.fn(),
        updateEstado: jest.fn(),
        remove: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
        controllers: [TiendaController],
        providers: [{ provide: TiendaService, useValue: mockTiendaService }],
        }).compile();

        controller = module.get<TiendaController>(TiendaController);
        service = module.get<TiendaService>(TiendaService);
    });

    // ============================================================
    // 🧩 TEST: Crear Tienda
    // ============================================================
    it('debería crear una tienda correctamente', async () => {
        const dto = {
        tie_nombre: 'Pet Paradise',
        tie_direccion: 'Calle 123 #45-67',
        tie_telefono: '3001234567',
        tie_activa: true,
        };

        const result = { tie_id: 1, ...dto };

        jest.spyOn(service, 'create').mockResolvedValue(result as any);

        const response = await controller.create(dto as any);

        expect(service.create).toHaveBeenCalledWith(dto);
        expect(response).toEqual(result);
    });

    // ============================================================
    // 🧩 TEST: Listar Tiendas
    // ============================================================
    it('debería listar todas las tiendas', async () => {
        const result = [
        { tie_id: 1, tie_nombre: 'Pet Paradise', tie_activa: true },
        { tie_id: 2, tie_nombre: 'Animal World', tie_activa: false },
        ];

        jest.spyOn(service, 'findAll').mockResolvedValue(result as any);

        const response = await controller.findAll(undefined);

        expect(service.findAll).toHaveBeenCalledWith(undefined);
        expect(response).toEqual(result);
    });

    it('debería filtrar tiendas activas correctamente', async () => {
        const result = [{ tie_id: 1, tie_nombre: 'Pet Paradise', tie_activa: true }];

        jest.spyOn(service, 'findAll').mockResolvedValue(result as any);

        const response = await controller.findAll('true');

        expect(service.findAll).toHaveBeenCalledWith(true);
        expect(response).toEqual(result);
    });

    // ============================================================
    // 🧩 TEST: Buscar Tienda por ID
    // ============================================================
    it('debería retornar una tienda por su ID', async () => {
        const result = {
        tie_id: 1,
        tie_nombre: 'Pet Paradise',
        tie_direccion: 'Calle 123 #45-67',
        };

        jest.spyOn(service, 'findOne').mockResolvedValue(result as any);

        const response = await controller.findOne(1);

        expect(service.findOne).toHaveBeenCalledWith(1);
        expect(response).toEqual(result);
    });

    // ============================================================
    // 🧩 TEST: Listar empleados de una tienda
    // ============================================================
    it('debería obtener los empleados de una tienda', async () => {
        const result = {
        tienda_id: 1,
        empleados: [
            { emp_id: 1, emp_nombre: 'Laura Martínez', emp_cargo: 'Vendedora' },
            { emp_id: 2, emp_nombre: 'Carlos Pérez', emp_cargo: 'Administrador' },
        ],
        };

        jest.spyOn(service, 'findEmpleados').mockResolvedValue(result as any);

        const response = await controller.findEmpleados(1);

        expect(service.findEmpleados).toHaveBeenCalledWith(1);
        expect(response).toEqual(result);
    });

    // ============================================================
    // 🧩 TEST: Actualizar Tienda
    // ============================================================
    it('debería actualizar una tienda correctamente', async () => {
        const dto = {
        tie_nombre: 'Pet Lovers',
        tie_telefono: '3112223344',
        };

        const result = { tie_id: 1, ...dto };

        jest.spyOn(service, 'update').mockResolvedValue(result as any);

        const response = await controller.update(1, dto as any);

        expect(service.update).toHaveBeenCalledWith(1, dto);
        expect(response).toEqual(result);
    });

    // ============================================================
    // 🧩 TEST: Activar y desactivar Tienda
    // ============================================================
    it('debería activar una tienda correctamente', async () => {
        const result = { tie_id: 1, tie_activa: true };

        jest.spyOn(service, 'updateEstado').mockResolvedValue(result as any);

        const response = await controller.activate(1);

        expect(service.updateEstado).toHaveBeenCalledWith(1, true);
        expect(response).toEqual(result);
    });

    it('debería desactivar una tienda correctamente', async () => {
        const result = { tie_id: 1, tie_activa: false };

        jest.spyOn(service, 'updateEstado').mockResolvedValue(result as any);

        const response = await controller.deactivate(1);

        expect(service.updateEstado).toHaveBeenCalledWith(1, false);
        expect(response).toEqual(result);
    });

    // ============================================================
    // 🧩 TEST: Eliminar Tienda
    // ============================================================
    it('debería eliminar una tienda correctamente', async () => {
        jest.spyOn(service, 'remove').mockResolvedValue(undefined);

        const response = await controller.remove(1);

        expect(service.remove).toHaveBeenCalledWith(1);
        expect(response).toBeUndefined();
    });
});
