import { Test, TestingModule } from '@nestjs/testing';
import { EmpleadoController } from './empleado.controller';
import { EmpleadoService } from './empleado.service';

/**
 * ✅ Este archivo prueba el controlador de empleados (EmpleadoController)
 * usando Jest + Mocks del servicio.
 */
describe('EmpleadoController', () => {
    let controller: EmpleadoController;
    let service: EmpleadoService;

    /**
     * 🔧 Configuración del módulo de pruebas:
     * - Usa el controlador real.
     * - Mockea el servicio para simular respuestas.
     */
    beforeEach(async () => {
        const mockEmpleadoService = {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        findByTienda: jest.fn(),
        findByCargo: jest.fn(),
        update: jest.fn(),
        updateEstado: jest.fn(),
        remove: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
        controllers: [EmpleadoController],
        providers: [
            { provide: EmpleadoService, useValue: mockEmpleadoService },
        ],
        }).compile();

        controller = module.get<EmpleadoController>(EmpleadoController);
        service = module.get<EmpleadoService>(EmpleadoService);
    });

    // ============================================================
    // 🧩 TEST: Crear empleado
    // ============================================================
    it('debería crear un empleado correctamente', async () => {
        const dto = {
        emp_nombre: 'Laura Gómez',
        emp_cargo: 'Recepcionista',
        emp_correo: 'laura@example.com',
        emp_contrasena: 'password123',
        tienda_id: 2,
        };

        const result = {
        emp_id: 5,
        ...dto,
        emp_activo: true,
        };

        jest.spyOn(service, 'create').mockResolvedValue(result as any);

        const response = await controller.create(dto as any);

        expect(service.create).toHaveBeenCalledWith(dto);
        expect(response).toEqual(result);
    });

    // ============================================================
    // 🧩 TEST: Listar empleados
    // ============================================================
    it('debería retornar una lista de empleados', async () => {
        const result = [
        { emp_id: 1, emp_nombre: 'Carlos', emp_cargo: 'Veterinario' },
        { emp_id: 2, emp_nombre: 'Ana', emp_cargo: 'Recepcionista' },
        ];

        jest.spyOn(service, 'findAll').mockResolvedValue(result as any);

        const response = await controller.findAll('true', undefined);

        expect(service.findAll).toHaveBeenCalledWith({ activo: true, cargo: undefined });
        expect(response).toEqual(result);
    });

    // ============================================================
    // 🧩 TEST: Buscar empleado por ID
    // ============================================================
    it('debería retornar un empleado por su ID', async () => {
        const result = { emp_id: 3, emp_nombre: 'Mario', emp_cargo: 'Veterinario' };

        jest.spyOn(service, 'findOne').mockResolvedValue(result as any);

        const response = await controller.findOne(3);

        expect(service.findOne).toHaveBeenCalledWith(3);
        expect(response).toEqual(result);
    });

    // ============================================================
    // 🧩 TEST: Buscar empleados por tienda
    // ============================================================
    it('debería retornar empleados por tienda', async () => {
        const result = [
        { emp_id: 4, emp_nombre: 'Lucía', emp_cargo: 'Asistente' },
        { emp_id: 5, emp_nombre: 'Pablo', emp_cargo: 'Veterinario' },
        ];

        jest.spyOn(service, 'findByTienda').mockResolvedValue(result as any);

        const response = await controller.findByTienda(2);

        expect(service.findByTienda).toHaveBeenCalledWith(2);
        expect(response).toEqual(result);
    });

    // ============================================================
    // 🧩 TEST: Buscar empleados por cargo
    // ============================================================
    it('debería retornar empleados por cargo', async () => {
        const result = [
        { emp_id: 1, emp_nombre: 'Carlos', emp_cargo: 'Veterinario' },
        { emp_id: 6, emp_nombre: 'Andrea', emp_cargo: 'Veterinario' },
        ];

        jest.spyOn(service, 'findByCargo').mockResolvedValue(result as any);

        const response = await controller.findByCargo('Veterinario');

        expect(service.findByCargo).toHaveBeenCalledWith('Veterinario');
        expect(response).toEqual(result);
    });

    // ============================================================
    // 🧩 TEST: Actualizar empleado
    // ============================================================
    it('debería actualizar un empleado correctamente', async () => {
        const dto = { emp_nombre: 'Laura Gómez Ramírez', emp_cargo: 'Veterinaria Senior' };

        const result = {
        emp_id: 5,
        ...dto,
        emp_activo: true,
        };

        jest.spyOn(service, 'update').mockResolvedValue(result as any);

        const response = await controller.update(5, dto as any);

        expect(service.update).toHaveBeenCalledWith(5, dto);
        expect(response).toEqual(result);
    });

    // ============================================================
    // 🧩 TEST: Activar empleado
    // ============================================================
    it('debería activar un empleado correctamente', async () => {
        const result = { emp_id: 5, emp_activo: true };

        jest.spyOn(service, 'updateEstado').mockResolvedValue(result as any);

        const response = await controller.activate(5);

        expect(service.updateEstado).toHaveBeenCalledWith(5, true);
        expect(response).toEqual(result);
    });

    // ============================================================
    // 🧩 TEST: Desactivar empleado
    // ============================================================
    it('debería desactivar un empleado correctamente', async () => {
        const result = { emp_id: 5, emp_activo: false };

        jest.spyOn(service, 'updateEstado').mockResolvedValue(result as any);

        const response = await controller.deactivate(5);

        expect(service.updateEstado).toHaveBeenCalledWith(5, false);
        expect(response).toEqual(result);
    });

    // ============================================================
    // 🧩 TEST: Eliminar empleado
    // ============================================================
    it('debería eliminar un empleado correctamente', async () => {
        jest.spyOn(service, 'remove').mockResolvedValue(undefined);

        const response = await controller.remove(7);

        expect(service.remove).toHaveBeenCalledWith(7);
        expect(response).toBeUndefined();
    });
});
