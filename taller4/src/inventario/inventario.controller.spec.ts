import { Test, TestingModule } from '@nestjs/testing';
import { InventarioController } from './inventario.controller';
import { InventarioService } from './inventario.service';

/**
 * ✅ Pruebas unitarias del controlador de Inventario.
 * 
 * - Se usan mocks del servicio (`InventarioService`) para simular la lógica de negocio.
 * - Se validan las llamadas y respuestas del controlador.
 */
describe('InventarioController', () => {
    let controller: InventarioController;
    let service: InventarioService;

    /**
     * 🔧 Configuración inicial del entorno de pruebas.
     */
    beforeEach(async () => {
        const mockInventarioService = {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
        controllers: [InventarioController],
        providers: [
            { provide: InventarioService, useValue: mockInventarioService },
        ],
        }).compile();

        controller = module.get<InventarioController>(InventarioController);
        service = module.get<InventarioService>(InventarioService);
    });

    // ============================================================
    // 🧩 TEST: Crear registro de inventario
    // ============================================================
    it('debería crear un nuevo inventario correctamente', async () => {
        const dto = {
        tienda_id: 2,
        producto_id: 7,
        cantidad_disponible: 50,
        };

        const result = {
        inventario_id: 10,
        ...dto,
        };

        jest.spyOn(service, 'create').mockResolvedValue(result as any);

        const response = await controller.create(dto as any);

        expect(service.create).toHaveBeenCalledWith(dto);
        expect(response).toEqual(result);
    });

    // ============================================================
    // 🧩 TEST: Listar todos los inventarios
    // ============================================================
    it('debería retornar todos los registros de inventario', async () => {
        const result = [
        {
            inventario_id: 1,
            tienda_id: 1,
            producto_id: 3,
            cantidad_disponible: 30,
        },
        {
            inventario_id: 2,
            tienda_id: 1,
            producto_id: 5,
            cantidad_disponible: 20,
        },
        ];

        jest.spyOn(service, 'findAll').mockResolvedValue(result as any);

        const response = await controller.findAll();

        expect(service.findAll).toHaveBeenCalled();
        expect(response).toEqual(result);
    });

    // ============================================================
    // 🧩 TEST: Obtener inventario por ID
    // ============================================================
    it('debería retornar un inventario por su ID', async () => {
        const result = {
        inventario_id: 2,
        tienda_id: 1,
        producto_id: 5,
        cantidad_disponible: 20,
        };

        jest.spyOn(service, 'findOne').mockResolvedValue(result as any);

        const response = await controller.findOne(2);

        expect(service.findOne).toHaveBeenCalledWith(2);
        expect(response).toEqual(result);
    });

    // ============================================================
    // 🧩 TEST: Actualizar inventario
    // ============================================================
    it('debería actualizar un inventario correctamente', async () => {
        const dto = { cantidad_disponible: 80 };

        const result = {
        inventario_id: 2,
        tienda_id: 1,
        producto_id: 5,
        cantidad_disponible: 80,
        };

        jest.spyOn(service, 'update').mockResolvedValue(result as any);

        const response = await controller.update(2, dto as any);

        expect(service.update).toHaveBeenCalledWith(2, dto);
        expect(response).toEqual(result);
    });

    // ============================================================
    // 🧩 TEST: Eliminar inventario
    // ============================================================
    it('debería eliminar un inventario correctamente', async () => {
        jest.spyOn(service, 'remove').mockResolvedValue(undefined);

        const response = await controller.remove(3);

        expect(service.remove).toHaveBeenCalledWith(3);
        expect(response).toBeUndefined();
    });
});
