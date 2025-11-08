import { Test, TestingModule } from '@nestjs/testing';
import { DetalleFacturaController } from './detalle-factura.controller';
import { DetalleFacturaService } from './detalle-factura.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateDetalleFacturaDto } from './dtos/create-detalle-factura.dto';
import { UpdateDetalleFacturaDto } from './dtos/update-detalle-factura.dto';

describe('DetalleFacturaController', () => {
    let controller: DetalleFacturaController;
    let service: DetalleFacturaService;

    // 🧩 Mock del servicio (para evitar base de datos real)
    const mockDetalleFacturaService = {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
    };

    // ============================================================
    // 🧱 Configuración del módulo de testing
    // ============================================================
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        controllers: [DetalleFacturaController],
        providers: [
            { provide: DetalleFacturaService, useValue: mockDetalleFacturaService },
        ],
        })
        // Mockeamos el JwtAuthGuard para permitir acceso libre durante las pruebas
        .overrideGuard(JwtAuthGuard)
        .useValue({ canActivate: jest.fn(() => true) })
        .compile();

        controller = module.get<DetalleFacturaController>(DetalleFacturaController);
        service = module.get<DetalleFacturaService>(DetalleFacturaService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    // ============================================================
    // 🧪 CREATE
    // ============================================================
    describe('create', () => {
        it('debería crear un detalle de factura correctamente', async () => {
        const dto: CreateDetalleFacturaDto = {
            venta_id: 1,
            producto_id: 5,
            det_cantidad: 2,
            det_precio_unitario: 15000,
        } as any;

        const result = {
            det_id: 1,
            ...dto,
            det_subtotal: dto.det_cantidad * dto.det_precio_unitario,
        };

        mockDetalleFacturaService.create.mockResolvedValue(result);

        const response = await controller.create(dto);

        expect(service.create).toHaveBeenCalledWith(dto);
        expect(response).toEqual(result);
        });
    });

    // ============================================================
    // 🧪 FIND ALL
    // ============================================================
    describe('findAll', () => {
        it('debería devolver una lista de detalles de factura', async () => {
        const result = [
            { det_id: 1, venta_id: 1, producto_id: 3, det_cantidad: 1, det_precio_unitario: 25000 },
            { det_id: 2, venta_id: 1, producto_id: 4, det_cantidad: 2, det_precio_unitario: 15000 },
        ];

        mockDetalleFacturaService.findAll.mockResolvedValue(result);

        const response = await controller.findAll();

        expect(service.findAll).toHaveBeenCalled();
        expect(response).toEqual(result);
        });
    });

    // ============================================================
    // 🧪 FIND ONE
    // ============================================================
    describe('findOne', () => {
        it('debería devolver un detalle de factura por ID', async () => {
        const result = {
            det_id: 2,
            venta_id: 1,
            producto_id: 4,
            det_cantidad: 2,
            det_precio_unitario: 15000,
            det_subtotal: 30000,
        };

        mockDetalleFacturaService.findOne.mockResolvedValue(result);

        const response = await controller.findOne(2);

        expect(service.findOne).toHaveBeenCalledWith(2);
        expect(response).toEqual(result);
        });
    });

    // ============================================================
    // 🧪 UPDATE
    // ============================================================
    describe('update', () => {
    it('debería actualizar un detalle correctamente', async () => {
        const dto: Partial<UpdateDetalleFacturaDto> = {
        det_cantidad: 3,
        det_precio_unitario: 14000,
        };

        const cantidad = dto.det_cantidad!;
        const precioUnitario = dto.det_precio_unitario!;
        const result = {
        det_id: 2,
        det_cantidad: cantidad,
        det_precio_unitario: precioUnitario,
        det_subtotal: cantidad * precioUnitario,
        };

        mockDetalleFacturaService.update.mockResolvedValue(result);

        const response = await controller.update(2, dto as any);

        expect(service.update).toHaveBeenCalledWith(2, dto);
        expect(response).toEqual(result);
    });
    });


    // ============================================================
    // 🧪 REMOVE
    // ============================================================
    describe('remove', () => {
        it('debería eliminar un detalle de factura correctamente', async () => {
        mockDetalleFacturaService.remove.mockResolvedValue(undefined);

        const response = await controller.remove(3);

        expect(service.remove).toHaveBeenCalledWith(3);
        expect(response).toBeUndefined();
        });
    });
});
