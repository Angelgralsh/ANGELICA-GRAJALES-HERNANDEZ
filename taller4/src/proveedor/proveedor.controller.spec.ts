import { Test, TestingModule } from '@nestjs/testing';
import { ProveedorController } from './proveedor.controller';
import { ProveedorService } from './proveedor.service';

/**
 * ✅ Pruebas unitarias del controlador de Proveedor.
 * 
 * - Se mockea el servicio `ProveedorService`.
 * - Se validan las llamadas y los retornos esperados del controlador.
 */
describe('ProveedorController', () => {
    let controller: ProveedorController;
    let service: ProveedorService;

    beforeEach(async () => {
        const mockProveedorService = {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
        controllers: [ProveedorController],
        providers: [{ provide: ProveedorService, useValue: mockProveedorService }],
        }).compile();

        controller = module.get<ProveedorController>(ProveedorController);
        service = module.get<ProveedorService>(ProveedorService);
    });

    // ============================================================
    // 🧩 TEST: Crear proveedor
    // ============================================================
    it('debería crear un nuevo proveedor correctamente', async () => {
        const dto = {
        prov_nombre: 'Distribuidora Animalia',
        prov_direccion: 'Carrera 10 #20-30',
        prov_telefono: '3101234567',
        prov_email: 'contacto@animalia.com',
        };

        const result = { prov_id: 1, ...dto };

        jest.spyOn(service, 'create').mockResolvedValue(result as any);

        const response = await controller.create(dto as any);

        expect(service.create).toHaveBeenCalledWith(dto);
        expect(response).toEqual(result);
    });

    // ============================================================
    // 🧩 TEST: Listar todos los proveedores
    // ============================================================
    it('debería retornar todos los proveedores registrados', async () => {
        const result = [
        {
            prov_id: 1,
            prov_nombre: 'Distribuidora Animalia',
            prov_direccion: 'Carrera 10 #20-30',
        },
        {
            prov_id: 2,
            prov_nombre: 'PetMarket S.A.',
            prov_direccion: 'Calle 50 #25-45',
        },
        ];

        jest.spyOn(service, 'findAll').mockResolvedValue(result as any);

        const response = await controller.findAll();

        expect(service.findAll).toHaveBeenCalled();
        expect(response).toEqual(result);
    });

    // ============================================================
    // 🧩 TEST: Buscar proveedor por ID
    // ============================================================
    it('debería retornar un proveedor por su ID', async () => {
        const result = {
        prov_id: 1,
        prov_nombre: 'Distribuidora Animalia',
        prov_direccion: 'Carrera 10 #20-30',
        prov_telefono: '3101234567',
        prov_email: 'contacto@animalia.com',
        };

        jest.spyOn(service, 'findOne').mockResolvedValue(result as any);

        const response = await controller.findOne(1);

        expect(service.findOne).toHaveBeenCalledWith(1);
        expect(response).toEqual(result);
    });

    // ============================================================
    // 🧩 TEST: Actualizar proveedor
    // ============================================================
    it('debería actualizar un proveedor correctamente', async () => {
        const dto = {
        prov_telefono: '3125556677',
        prov_email: 'nuevo_contacto@animalia.com',
        };

        const result = {
        prov_id: 1,
        prov_nombre: 'Distribuidora Animalia',
        prov_direccion: 'Carrera 10 #20-30',
        ...dto,
        };

        jest.spyOn(service, 'update').mockResolvedValue(result as any);

        const response = await controller.update(1, dto as any);

        expect(service.update).toHaveBeenCalledWith(1, dto);
        expect(response).toEqual(result);
    });

    // ============================================================
    // 🧩 TEST: Eliminar proveedor
    // ============================================================
    it('debería eliminar un proveedor correctamente', async () => {
        jest.spyOn(service, 'remove').mockResolvedValue(undefined);

        const response = await controller.remove(1);

        expect(service.remove).toHaveBeenCalledWith(1);
        expect(response).toBeUndefined();
    });
});
