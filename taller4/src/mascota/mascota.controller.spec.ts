import { Test, TestingModule } from '@nestjs/testing';
import { MascotaController } from './mascota.controller';
import { MascotaService } from './mascota.service';

/**
 * ✅ Pruebas unitarias para el controlador de Mascota.
 * 
 * Se validan las llamadas correctas al servicio y las respuestas esperadas.
 */
describe('MascotaController', () => {
    let controller: MascotaController;
    let service: MascotaService;

    beforeEach(async () => {
        const mockMascotaService = {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        findByCliente: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
        controllers: [MascotaController],
        providers: [
            { provide: MascotaService, useValue: mockMascotaService },
        ],
        }).compile();

        controller = module.get<MascotaController>(MascotaController);
        service = module.get<MascotaService>(MascotaService);
    });

    // ============================================================
    // 🧩 TEST: Crear mascota
    // ============================================================
    it('debería crear una nueva mascota correctamente', async () => {
        const dto = {
        mascota_nombre: 'Firulais',
        mascota_especie: 'Perro',
        mascota_raza: 'Labrador',
        mascota_edad: 3,
        cli_id: 1,
        };

        const result = {
        mascota_id: 10,
        ...dto,
        };

        jest.spyOn(service, 'create').mockResolvedValue(result as any);

        const response = await controller.create(dto as any);

        expect(service.create).toHaveBeenCalledWith(dto);
        expect(response).toEqual(result);
    });

    // ============================================================
    // 🧩 TEST: Listar todas las mascotas
    // ============================================================
    it('debería retornar todas las mascotas registradas', async () => {
        const result = [
        { mascota_id: 1, mascota_nombre: 'Firulais', mascota_especie: 'Perro' },
        { mascota_id: 2, mascota_nombre: 'Misu', mascota_especie: 'Gato' },
        ];

        jest.spyOn(service, 'findAll').mockResolvedValue(result as any);

        const response = await controller.findAll();

        expect(service.findAll).toHaveBeenCalled();
        expect(response).toEqual(result);
    });

    // ============================================================
    // 🧩 TEST: Obtener mascota por ID
    // ============================================================
    it('debería retornar una mascota por su ID', async () => {
        const result = {
        mascota_id: 1,
        mascota_nombre: 'Milo',
        mascota_especie: 'Perro',
        mascota_raza: 'Beagle',
        mascota_edad: 2,
        };

        jest.spyOn(service, 'findOne').mockResolvedValue(result as any);

        const response = await controller.findOne(1);

        expect(service.findOne).toHaveBeenCalledWith(1);
        expect(response).toEqual(result);
    });

    // ============================================================
    // 🧩 TEST: Obtener mascotas por cliente
    // ============================================================
    it('debería retornar las mascotas asociadas a un cliente', async () => {
        const result = [
        { mascota_id: 3, mascota_nombre: 'Rocky', mascota_especie: 'Perro' },
        { mascota_id: 5, mascota_nombre: 'Luna', mascota_especie: 'Gato' },
        ];

        jest.spyOn(service, 'findByCliente').mockResolvedValue(result as any);

        const response = await controller.findByCliente(1);

        expect(service.findByCliente).toHaveBeenCalledWith(1);
        expect(response).toEqual(result);
    });

    // ============================================================
    // 🧩 TEST: Actualizar mascota
    // ============================================================
    it('debería actualizar los datos de una mascota', async () => {
        const dto = { mascota_nombre: 'Rocky Jr.', mascota_edad: 5 };

        const result = {
        mascota_id: 1,
        mascota_nombre: 'Rocky Jr.',
        mascota_especie: 'Perro',
        mascota_raza: 'Pitbull',
        mascota_edad: 5,
        };

        jest.spyOn(service, 'update').mockResolvedValue(result as any);

        const response = await controller.update(1, dto as any);

        expect(service.update).toHaveBeenCalledWith(1, dto);
        expect(response).toEqual(result);
    });

    // ============================================================
    // 🧩 TEST: Eliminar mascota
    // ============================================================
    it('debería eliminar una mascota correctamente', async () => {
        const result = { message: 'Mascota con ID 3 eliminada correctamente' };

        jest.spyOn(service, 'remove').mockResolvedValue(result as any);

        const response = await controller.remove(3);

        expect(service.remove).toHaveBeenCalledWith(3);
        expect(response).toEqual(result);
    });
});
