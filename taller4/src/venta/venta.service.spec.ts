import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { VentaService } from './venta.service';
import { Venta } from './entities/venta.entity';
import { Cliente } from '../cliente/entities/cliente.entity';
import { Empleado } from '../empleado/entities/empleado.entity';
import { Tienda } from '../tienda/entities/tienda.entity';
import { DetalleFactura } from '../detalle-factura/entities/detalle-factura.entity';

/**
 * Pruebas unitarias para el servicio VentaService.
 * 
 * Se mockean los repositorios de TypeORM y se prueban los métodos CRUD,
 * validaciones de existencia y el recalculo de totales.
 */
describe('VentaService', () => {
  let service: VentaService;

  // 🔹 Repositorios mockeados
  const mockRepo = () => ({
    findOne: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  });

  const mockVentaRepo = mockRepo();
  const mockClienteRepo = mockRepo();
  const mockEmpleadoRepo = mockRepo();
  const mockTiendaRepo = mockRepo();
  const mockDetalleRepo = mockRepo();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VentaService,
        { provide: getRepositoryToken(Venta), useValue: mockVentaRepo },
        { provide: getRepositoryToken(Cliente), useValue: mockClienteRepo },
        { provide: getRepositoryToken(Empleado), useValue: mockEmpleadoRepo },
        { provide: getRepositoryToken(Tienda), useValue: mockTiendaRepo },
        { provide: getRepositoryToken(DetalleFactura), useValue: mockDetalleRepo },
      ],
    }).compile();

    service = module.get<VentaService>(VentaService);
    jest.clearAllMocks();
  });

  // ---------------------------------------------------------------------------
  // 🧪 CREATE
  // ---------------------------------------------------------------------------
  describe('create', () => {
    const dto = { cli_id: 1, emp_id: 2, tienda_id: 3, venta_activa: true };

    it('debería crear una venta correctamente', async () => {
      const cliente = { cli_id: 1 };
      const empleado = { emp_id: 2 };
      const tienda = { tienda_id: 3 };
      const ventaCreada = { venta_id: 1, venta_total: 0, cliente, empleado, tienda };

      mockClienteRepo.findOne.mockResolvedValue(cliente);
      mockEmpleadoRepo.findOne.mockResolvedValue(empleado);
      mockTiendaRepo.findOne.mockResolvedValue(tienda);
      mockVentaRepo.create.mockReturnValue(ventaCreada);
      mockVentaRepo.save.mockResolvedValue(ventaCreada);

      const result = await service.create(dto as any);

      expect(mockClienteRepo.findOne).toHaveBeenCalledWith({ where: { cli_id: dto.cli_id } });
      expect(mockEmpleadoRepo.findOne).toHaveBeenCalledWith({ where: { emp_id: dto.emp_id } });
      expect(mockTiendaRepo.findOne).toHaveBeenCalledWith({ where: { tienda_id: dto.tienda_id } });
      expect(mockVentaRepo.create).toHaveBeenCalled();
      expect(mockVentaRepo.save).toHaveBeenCalledWith(ventaCreada);
      expect(result).toEqual(ventaCreada);
    });

    it('debería lanzar error si el cliente no existe', async () => {
      mockClienteRepo.findOne.mockResolvedValue(null);
      await expect(service.create(dto as any)).rejects.toThrow('Cliente no encontrado');
    });

    it('debería lanzar error si el empleado no existe', async () => {
      mockClienteRepo.findOne.mockResolvedValue({});
      mockEmpleadoRepo.findOne.mockResolvedValue(null);
      await expect(service.create(dto as any)).rejects.toThrow('Empleado no encontrado');
    });

    it('debería lanzar error si la tienda no existe', async () => {
      mockClienteRepo.findOne.mockResolvedValue({});
      mockEmpleadoRepo.findOne.mockResolvedValue({});
      mockTiendaRepo.findOne.mockResolvedValue(null);
      await expect(service.create(dto as any)).rejects.toThrow('Tienda no encontrada');
    });
  });

  // ---------------------------------------------------------------------------
  // 🧪 FIND ALL
  // ---------------------------------------------------------------------------
  describe('findAll', () => {
    it('debería retornar todas las ventas con relaciones', async () => {
      const ventas = [{ venta_id: 1 }, { venta_id: 2 }];
      mockVentaRepo.find.mockResolvedValue(ventas);

      const result = await service.findAll();

      expect(mockVentaRepo.find).toHaveBeenCalledWith({
        relations: ['detalles', 'cliente', 'empleado', 'tienda'],
        order: { venta_id: 'DESC' },
      });
      expect(result).toEqual(ventas);
    });
  });

  // ---------------------------------------------------------------------------
  // 🧪 FIND ONE
  // ---------------------------------------------------------------------------
  describe('findOne', () => {
    it('debería devolver una venta existente', async () => {
      const venta = { venta_id: 1 };
      mockVentaRepo.findOne.mockResolvedValue(venta);

      const result = await service.findOne(1);

      expect(mockVentaRepo.findOne).toHaveBeenCalledWith({
        where: { venta_id: 1 },
        relations: ['detalles', 'cliente', 'empleado', 'tienda'],
      });
      expect(result).toEqual(venta);
    });

    it('debería lanzar error si la venta no existe', async () => {
      mockVentaRepo.findOne.mockResolvedValue(null);
      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  // ---------------------------------------------------------------------------
  // 🧪 RECALCULAR TOTAL
  // ---------------------------------------------------------------------------
  describe('recalcularTotal', () => {
    it('debería recalcular el total correctamente', async () => {
      const venta = { venta_id: 1, venta_total: 0 };
      const detalles = [
        { det_subtotal: 50 },
        { det_subtotal: 100 },
        { det_subtotal: 25 },
      ];
      const ventaActualizada = { ...venta, venta_total: 175 };

      jest.spyOn(service, 'findOne').mockResolvedValue(venta as any);
      mockDetalleRepo.find.mockResolvedValue(detalles);
      mockVentaRepo.save.mockResolvedValue(ventaActualizada);

      const result = await service.recalcularTotal(1);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(mockDetalleRepo.find).toHaveBeenCalledWith({ where: { venta_id: 1 } });
      expect(mockVentaRepo.save).toHaveBeenCalledWith(expect.objectContaining({ venta_total: 175 }));
      expect(result).toEqual(ventaActualizada);
    });
  });

  // ---------------------------------------------------------------------------
  // 🧪 UPDATE
  // ---------------------------------------------------------------------------
  describe('update', () => {
    it('debería actualizar una venta correctamente', async () => {
      const venta = { venta_id: 1, venta_total: 50 };
      const dto = { venta_activa: false };
      const actualizada = { ...venta, ...dto };

      jest.spyOn(service, 'findOne').mockResolvedValue(venta as any);
      mockVentaRepo.save.mockResolvedValue(actualizada);

      const result = await service.update(1, dto as any);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(mockVentaRepo.save).toHaveBeenCalledWith(expect.objectContaining(dto));
      expect(result).toEqual(actualizada);
    });
  });

  // ---------------------------------------------------------------------------
  // 🧪 REMOVE
  // ---------------------------------------------------------------------------
  describe('remove', () => {
    it('debería eliminar una venta correctamente', async () => {
      const venta = { venta_id: 1 };
      jest.spyOn(service, 'findOne').mockResolvedValue(venta as any);
      mockVentaRepo.remove.mockResolvedValue(undefined);

      await service.remove(1);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(mockVentaRepo.remove).toHaveBeenCalledWith(venta);
    });
  });
});
