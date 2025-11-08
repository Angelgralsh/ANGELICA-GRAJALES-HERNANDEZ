import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { InventarioService } from './inventario.service';
import { Inventario } from './entities/inventario.entity';
import { Producto } from '../producto/entities/producto.entity';
import { Tienda } from '../tienda/entities/tienda.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('InventarioService', () => {
  let service: InventarioService;

  // Repositorios simulados (mocks)
  const mockInventarioRepo = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  const mockProductoRepo = {
    findOne: jest.fn(),
  };

  const mockTiendaRepo = {
    findOne: jest.fn(),
  };

  /**
   * Configuración del módulo de pruebas antes de cada test.
   * Se inyectan los repositorios simulados en lugar de los reales.
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InventarioService,
        { provide: getRepositoryToken(Inventario), useValue: mockInventarioRepo },
        { provide: getRepositoryToken(Producto), useValue: mockProductoRepo },
        { provide: getRepositoryToken(Tienda), useValue: mockTiendaRepo },
      ],
    }).compile();

    service = module.get<InventarioService>(InventarioService);
    jest.clearAllMocks(); // Limpia los mocks para evitar contaminación entre tests
  });

  // ---------------------------------------------------------------------------
  // 🧪 CREATE
  // ---------------------------------------------------------------------------

  describe('create', () => {

    it('debería crear un inventario correctamente', async () => {
      const dto = { prod_id: 1, tienda_id: 2, inv_stock: 10 };
      const producto = { prod_id: 1 };
      const tienda = { tienda_id: 2 };
      const inventarioCreado = { inv_id: 1, ...dto, producto, tienda };

      mockProductoRepo.findOne.mockResolvedValue(producto);
      mockTiendaRepo.findOne.mockResolvedValue(tienda);
      mockInventarioRepo.create.mockReturnValue(inventarioCreado);
      mockInventarioRepo.save.mockResolvedValue(inventarioCreado);

      const result = await service.create(dto as any);

      expect(mockProductoRepo.findOne).toHaveBeenCalledWith({ where: { prod_id: 1 } });
      expect(mockTiendaRepo.findOne).toHaveBeenCalledWith({ where: { tienda_id: 2 } });
      expect(mockInventarioRepo.create).toHaveBeenCalledWith({
        ...dto,
        producto,
        tienda,
      });
      expect(result).toEqual(inventarioCreado);
    });

    it('debería lanzar error si el producto no existe', async () => {
      mockProductoRepo.findOne.mockResolvedValue(null);
      const dto = { prod_id: 99, tienda_id: 2, inv_stock: 10 };

      await expect(service.create(dto as any)).rejects.toThrow(NotFoundException);
    });

    it('debería lanzar error si la tienda no existe', async () => {
      mockProductoRepo.findOne.mockResolvedValue({ prod_id: 1 });
      mockTiendaRepo.findOne.mockResolvedValue(null);
      const dto = { prod_id: 1, tienda_id: 99, inv_stock: 10 };

      await expect(service.create(dto as any)).rejects.toThrow(NotFoundException);
    });
  });

  // ---------------------------------------------------------------------------
  // 🧪 FIND ALL
  // ---------------------------------------------------------------------------

  describe('findAll', () => {

    it('debería devolver todos los inventarios', async () => {
      const inventarios = [
        { inv_id: 1, inv_stock: 10 },
        { inv_id: 2, inv_stock: 5 },
      ];
      mockInventarioRepo.find.mockResolvedValue(inventarios);

      const result = await service.findAll();

      expect(mockInventarioRepo.find).toHaveBeenCalledWith({
        relations: ['producto', 'tienda'],
      });
      expect(result).toEqual(inventarios);
    });
  });

  // ---------------------------------------------------------------------------
  // 🧪 FIND ONE
  // ---------------------------------------------------------------------------

  describe('findOne', () => {

    it('debería devolver un inventario por ID', async () => {
      const inventario = { inv_id: 1, inv_stock: 10 };
      mockInventarioRepo.findOne.mockResolvedValue(inventario);

      const result = await service.findOne(1);

      expect(mockInventarioRepo.findOne).toHaveBeenCalledWith({
        where: { inv_id: 1 },
        relations: ['producto', 'tienda'],
      });
      expect(result).toEqual(inventario);
    });

    it('debería lanzar error si no existe', async () => {
      mockInventarioRepo.findOne.mockResolvedValue(null);
      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  // ---------------------------------------------------------------------------
  // 🧪 UPDATE
  // ---------------------------------------------------------------------------

  describe('update', () => {
    const dto = { inv_stock: 20, prod_id: 1, tienda_id: 2 };

    it('debería actualizar un inventario correctamente', async () => {
      const inv = { inv_id: 1, inv_stock: 5 };
      const producto = { prod_id: 1 };
      const tienda = { tienda_id: 2 };
      const actualizado = { ...inv, ...dto, producto, tienda };

      jest.spyOn(service, 'findOne').mockResolvedValue(inv as any);
      mockProductoRepo.findOne.mockResolvedValue(producto);
      mockTiendaRepo.findOne.mockResolvedValue(tienda);
      mockInventarioRepo.save.mockResolvedValue(actualizado);

      const result = await service.update(1, dto as any);

      expect(mockInventarioRepo.save).toHaveBeenCalledWith(
        expect.objectContaining({ inv_stock: 20 })
      );
      expect(result).toEqual(actualizado);
    });

    it('debería lanzar error si el producto no existe', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue({ inv_id: 1 } as any);
      mockProductoRepo.findOne.mockResolvedValue(null);
      const dto = { prod_id: 99 };

      await expect(service.update(1, dto as any)).rejects.toThrow(NotFoundException);
    });

    it('debería lanzar error si la tienda no existe', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue({ inv_id: 1 } as any);
      mockProductoRepo.findOne.mockResolvedValue({ prod_id: 1 });
      mockTiendaRepo.findOne.mockResolvedValue(null);
      const dto = { tienda_id: 99 };

      await expect(service.update(1, dto as any)).rejects.toThrow(NotFoundException);
    });
  });

  // ---------------------------------------------------------------------------
  // 🧪 REMOVE
  // ---------------------------------------------------------------------------

  describe('remove', () => {
    it('debería eliminar un inventario correctamente', async () => {
      const inv = { inv_id: 1 };
      jest.spyOn(service, 'findOne').mockResolvedValue(inv as any);
      mockInventarioRepo.remove.mockResolvedValue(undefined);

      await service.remove(1);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(mockInventarioRepo.remove).toHaveBeenCalledWith(inv);
    });
  });
});
