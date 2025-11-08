import { Test, TestingModule } from '@nestjs/testing';
import { VentaController } from './venta.controller';
import { VentaService } from './venta.service';

/**
 * ✅ Pruebas unitarias para el controlador VentaController.
 * 
 * Se mockea el servicio VentaService y se validan las llamadas
 * y retornos esperados de cada método del controlador.
 */
describe('VentaController', () => {
    let controller: VentaController;
    let service: VentaService;

    beforeEach(async () => {
        const mockVentaService = {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
        recalcularTotal: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
        controllers: [VentaController],
        providers: [{ provide: VentaService, useValue: mockVentaService }],
        }).compile();

        controller = module.get<VentaController>(VentaController);
        service = module.get<VentaService>(VentaService);
    });

    // ============================================================
    // 🧩 TEST: Crear Venta
    // ============================================================
    it('debería crear una venta correctamente', async () => {
        const dto = {
        cli_id: 2,
        emp_id: 1,
        tienda_id: 3,
        venta_activa: true,
        };

        const result = {
        venta_id: 1,
        cli_id: 2,
        emp_id: 1,
        tienda_id: 3,
        venta_total: 0,
        venta_activa: true,
        };

        jest.spyOn(service, 'create').mockResolvedValue(result as any);

        const response = await controller.create(dto as any);

        expect(service.create).toHaveBeenCalledWith(dto);
        expect(response).toEqual(result);
    });

    // ============================================================
    // 🧩 TEST: Listar Ventas
    // ============================================================
    it('debería listar todas las ventas', async () => {
        const result = [
        { venta_id: 1, venta_total: 30000 },
        { venta_id: 2, venta_total: 50000 },
        ];

        jest.spyOn(service, 'findAll').mockResolvedValue(result as any);

        const response = await controller.findAll();

        expect(service.findAll).toHaveBeenCalled();
        expect(response).toEqual(result);
    });

    // ============================================================
    // 🧩 TEST: Obtener Venta por ID
    // ============================================================
    it('debería obtener una venta por ID', async () => {
        const result = {
        venta_id: 1,
        venta_total: 45000,
        cliente: { cli_id: 2, cli_nombre: 'Carlos' },
        };

        jest.spyOn(service, 'findOne').mockResolvedValue(result as any);

        const response = await controller.findOne(1);

        expect(service.findOne).toHaveBeenCalledWith(1);
        expect(response).toEqual(result);
    });

    // ============================================================
    // 🧩 TEST: Actualizar Venta
    // ============================================================
    it('debería actualizar una venta correctamente', async () => {
        const dto = { cli_id: 5, ven_fecha: '2025-11-01' };
        const result = { venta_id: 1, ...dto };

        jest.spyOn(service, 'update').mockResolvedValue(result as any);

        const response = await controller.update(1, dto as any);

        expect(service.update).toHaveBeenCalledWith(1, dto);
        expect(response).toEqual(result);
    });

    // ============================================================
    // 🧩 TEST: Recalcular Total
    // ============================================================
    it('debería recalcular el total de una venta correctamente', async () => {
        const result = { venta_id: 1, venta_total: 47000 };

        jest.spyOn(service, 'recalcularTotal').mockResolvedValue(result as any);

        const response = await controller.recalcular(1);

        expect(service.recalcularTotal).toHaveBeenCalledWith(1);
        expect(response).toEqual(result);
    });

    // ============================================================
    // 🧩 TEST: Eliminar Venta
    // ============================================================
    it('debería eliminar una venta correctamente', async () => {
        jest.spyOn(service, 'remove').mockResolvedValue(undefined);

        const response = await controller.remove(1);

        expect(service.remove).toHaveBeenCalledWith(1);
        expect(response).toBeUndefined();
    });
});
