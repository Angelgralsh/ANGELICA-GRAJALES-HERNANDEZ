import { Test, TestingModule } from '@nestjs/testing';
import { DetalleFacturaService } from './detalle-factura.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DetalleFactura } from './entities/detalle-factura.entity';
import { Producto } from '../producto/entities/producto.entity';
import { VentaService } from '../venta/venta.service';
import { NotFoundException } from '@nestjs/common';

describe('DetalleFacturaService', () => {
  let service: DetalleFacturaService;
  let mockDetalleRepo: any;
  let mockProductoRepo: any;
  let mockVentaService: any;

  beforeEach(async () => {
    mockDetalleRepo = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      remove: jest.fn(),
    };

    mockProductoRepo = {
      findOne: jest.fn(),
    };

    mockVentaService = {
      recalcularTotal: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DetalleFacturaService,
        { provide: getRepositoryToken(DetalleFactura), useValue: mockDetalleRepo },
        { provide: getRepositoryToken(Producto), useValue: mockProductoRepo },
        { provide: VentaService, useValue: mockVentaService },
      ],
    }).compile();

    service = module.get<DetalleFacturaService>(DetalleFacturaService);
  });

  afterEach(() => jest.clearAllMocks());

  // ============================================================
  // 🧪 CREATE
  // ============================================================
  describe('create', () => {
    it('debería crear un detalle correctamente', async () => {
      const dto = {
        producto_id: 1,
        venta_id: 10,
        det_cantidad: 2,
        det_precio_unitario: 50,
      };

      const producto = { prod_id: 1, prod_nombre: 'Collar' };
      const detalle = { ...dto, det_subtotal: 100, producto };
      const saved = { det_id: 1, ...detalle };

      mockProductoRepo.findOne.mockResolvedValue(producto);
      mockDetalleRepo.create.mockReturnValue(detalle);
      mockDetalleRepo.save.mockResolvedValue(saved);

      const result = await service.create(dto as any);

      expect(mockProductoRepo.findOne).toHaveBeenCalledWith({ where: { prod_id: 1 } });
      expect(mockDetalleRepo.create).toHaveBeenCalledWith({
        ...dto,
        det_subtotal: 100,
        producto,
      });
      expect(mockDetalleRepo.save).toHaveBeenCalledWith(detalle);
      expect(mockVentaService.recalcularTotal).toHaveBeenCalledWith(10);
      expect(result).toEqual(saved);
    });

    it('debería lanzar NotFoundException si el producto no existe', async () => {
      mockProductoRepo.findOne.mockResolvedValue(null);
      const dto = { producto_id: 99 } as any;

      await expect(service.create(dto)).rejects.toThrow(NotFoundException);
    });
  });

  // ============================================================
  // 🧪 FIND ALL
  // ============================================================
  describe('findAll', () => {
    it('debería retornar todos los detalles con relaciones', async () => {
      const detalles = [{ det_id: 1 }, { det_id: 2 }];
      mockDetalleRepo.find.mockResolvedValue(detalles);

      const result = await service.findAll();

      expect(mockDetalleRepo.find).toHaveBeenCalledWith({
        relations: ['venta', 'producto'],
      });
      expect(result).toEqual(detalles);
    });
  });

  // ============================================================
  // 🧪 FIND ONE
  // ============================================================
  describe('findOne', () => {
    it('debería retornar un detalle existente', async () => {
      const detalle = { det_id: 1 };
      mockDetalleRepo.findOne.mockResolvedValue(detalle);

      const result = await service.findOne(1);

      expect(mockDetalleRepo.findOne).toHaveBeenCalledWith({
        where: { det_id: 1 },
        relations: ['venta', 'producto'],
      });
      expect(result).toEqual(detalle);
    });

    it('debería lanzar NotFoundException si no existe', async () => {
      mockDetalleRepo.findOne.mockResolvedValue(null);
      await expect(service.findOne(99)).rejects.toThrow(NotFoundException);
    });
  });

  // ============================================================
  // 🧪 UPDATE
  // ============================================================
  describe('update', () => {
    it('debería actualizar un detalle correctamente y recalcular el total', async () => {
      const dto = { det_cantidad: 3, det_precio_unitario: 40 };
      const detalle = {
        det_id: 1,
        venta_id: 10,
        det_cantidad: 2,
        det_precio_unitario: 50,
      };
      const updated = { ...detalle, ...dto, det_subtotal: 120 };

      jest.spyOn(service, 'findOne').mockResolvedValue(detalle as any);
      mockDetalleRepo.save.mockResolvedValue(updated);

      const result = await service.update(1, dto);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(mockDetalleRepo.save).toHaveBeenCalled();
      expect(mockVentaService.recalcularTotal).toHaveBeenCalledWith(10);
      expect(result.det_subtotal).toBe(120);
    });
  });

  // ============================================================
  // 🧪 REMOVE
  // ============================================================
  describe('remove', () => {
    it('debería eliminar un detalle y recalcular el total', async () => {
      const detalle = { det_id: 1, venta_id: 10 };
      jest.spyOn(service, 'findOne').mockResolvedValue(detalle as any);
      mockDetalleRepo.remove.mockResolvedValue(undefined);

      await service.remove(1);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(mockDetalleRepo.remove).toHaveBeenCalledWith(detalle);
      expect(mockVentaService.recalcularTotal).toHaveBeenCalledWith(10);
    });
  });
});
