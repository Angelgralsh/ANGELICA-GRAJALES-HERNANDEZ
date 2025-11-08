import { Test, TestingModule } from '@nestjs/testing';
import { ProductoController } from './producto.controller';
import { ProductoService } from './producto.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateProductoDto } from './dtos/create-producto.dto';
import { UpdateProductoDto } from './dtos/update-producto.dto';

describe('ProductoController', () => {
    let controller: ProductoController;
    let service: ProductoService;

    // 🧩 Mock del servicio (evita conexión real a BD)
    const mockProductoService = {
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
        controllers: [ProductoController],
        providers: [
            { provide: ProductoService, useValue: mockProductoService },
        ],
        })
        // 🔐 Mock del guard JWT para no requerir token real
        .overrideGuard(JwtAuthGuard)
        .useValue({ canActivate: jest.fn(() => true) })
        .compile();

        controller = module.get<ProductoController>(ProductoController);
        service = module.get<ProductoService>(ProductoService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    // ============================================================
    // 🧪 CREATE
    // ============================================================
    describe('create', () => {
        it('debería crear un producto correctamente', async () => {
        const dto: CreateProductoDto = {
            prod_nombre: 'Croquetas Premium 10kg',
            prod_descripcion: 'Alimento balanceado para perros adultos',
            prod_precio: 85000,
            prod_stock: 30,
        } as any;

        const result = {
            prod_id: 1,
            ...dto,
        };

        mockProductoService.create.mockResolvedValue(result);

        const response = await controller.create(dto);

        expect(service.create).toHaveBeenCalledWith(dto);
        expect(response).toEqual(result);
        });
    });

    // ============================================================
    // 🧪 FIND ALL
    // ============================================================
    describe('findAll', () => {
        it('debería retornar una lista de productos', async () => {
        const result = [
            { prod_id: 1, prod_nombre: 'Arena para gato 5kg', prod_precio: 20000, prod_stock: 50 },
            { prod_id: 2, prod_nombre: 'Juguete mordedor', prod_precio: 15000, prod_stock: 80 },
        ];

        mockProductoService.findAll.mockResolvedValue(result);

        const response = await controller.findAll();

        expect(service.findAll).toHaveBeenCalled();
        expect(response).toEqual(result);
        });
    });

    // ============================================================
    // 🧪 FIND ONE
    // ============================================================
    describe('findOne', () => {
        it('debería devolver un producto por su ID', async () => {
        const result = {
            prod_id: 3,
            prod_nombre: 'Collar para perro',
            prod_precio: 25000,
            prod_stock: 45,
        };

        mockProductoService.findOne.mockResolvedValue(result);

        const response = await controller.findOne(3);

        expect(service.findOne).toHaveBeenCalledWith(3);
        expect(response).toEqual(result);
        });
    });

    // ============================================================
    // 🧪 UPDATE
    // ============================================================
    describe('update', () => {
        it('debería actualizar un producto correctamente', async () => {
        const dto: UpdateProductoDto = {
            prod_precio: 78000,
            prod_stock: 40,
        } as any;

        const result = {
            prod_id: 1,
            prod_nombre: 'Arena para gato 5kg',
            ...dto,
        };

        mockProductoService.update.mockResolvedValue(result);

        const response = await controller.update(1, dto);

        expect(service.update).toHaveBeenCalledWith(1, dto);
        expect(response).toEqual(result);
        });
    });

    // ============================================================
    // 🧪 REMOVE
    // ============================================================
    describe('remove', () => {
        it('debería eliminar un producto correctamente', async () => {
        mockProductoService.remove.mockResolvedValue(undefined);

        const response = await controller.remove(5);

        expect(service.remove).toHaveBeenCalledWith(5);
        expect(response).toBeUndefined();
        });
    });
});
