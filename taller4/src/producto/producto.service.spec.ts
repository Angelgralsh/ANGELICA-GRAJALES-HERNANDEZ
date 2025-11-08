import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductoService } from './producto.service';
import { Producto } from './entities/producto.entity';
import { Proveedor } from '../proveedor/entities/proveedor.entity';

describe('ProductoService', () => {
  let service: ProductoService;

  // Mocks de repositorios simulados
  const mockProductoRepo = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  const mockProveedorRepo = {
    findOne: jest.fn(),
  };

  /**
   * Configura el módulo de pruebas antes de cada test.
   * Se reemplazan los repositorios reales por mocks controlados.
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductoService,
        { provide: getRepositoryToken(Producto), useValue: mockProductoRepo },
        { provide: getRepositoryToken(Proveedor), useValue: mockProveedorRepo },
      ],
    }).compile();

    service = module.get<ProductoService>(ProductoService);
    jest.clearAllMocks(); // Limpieza antes de cada prueba
  });

  // ---------------------------------------------------------------------------
  // 🧪 CREATE
  // ---------------------------------------------------------------------------

  describe('create', () => {
    it('debería crear un producto sin proveedor', async () => {
      const dto = { prod_nombre: 'Collar para perro', prod_precio: 10 };
      const productoCreado = { prod_id: 1, ...dto };

      mockProductoRepo.create.mockReturnValue(dto);
      mockProductoRepo.save.mockResolvedValue(productoCreado);

      const result = await service.create(dto as any);

      expect(mockProductoRepo.create).toHaveBeenCalledWith(dto);
      expect(mockProductoRepo.save).toHaveBeenCalledWith(dto);
      expect(result).toEqual(productoCreado);
    });

    it('debería crear un producto con proveedor existente', async () => {
      const dto = { prod_nombre: 'Comida para gato', prod_precio: 20, prove_id: 1 };
      const proveedor = { prove_id: 1, prove_nombre: 'PetFood S.A.' };
      const productoCreado = { prod_id: 1, ...dto, proveedor };

      mockProductoRepo.create.mockReturnValue(dto);
      mockProveedorRepo.findOne.mockResolvedValue(proveedor);
      mockProductoRepo.save.mockResolvedValue(productoCreado);

      const result = await service.create(dto as any);

      expect(mockProveedorRepo.findOne).toHaveBeenCalledWith({ where: { prove_id: 1 } });
      expect(mockProductoRepo.save).toHaveBeenCalledWith({
        ...dto,
        proveedor,
      });
      expect(result).toEqual(productoCreado);
    });

    it('debería lanzar error si el proveedor no existe', async () => {
      const dto = { prod_nombre: 'Arena para gato', prove_id: 99 };
      mockProveedorRepo.findOne.mockResolvedValue(null);
      mockProductoRepo.create.mockReturnValue(dto);

      await expect(service.create(dto as any)).rejects.toThrow(NotFoundException);
    });
  });

  // ---------------------------------------------------------------------------
  // 🧪 FIND ALL
  // ---------------------------------------------------------------------------

  describe('findAll', () => {
    it('debería devolver todos los productos', async () => {
      const productos = [
        { prod_id: 1, prod_nombre: 'Collar' },
        { prod_id: 2, prod_nombre: 'Comida' },
      ];
      mockProductoRepo.find.mockResolvedValue(productos);

      const result = await service.findAll();

      expect(mockProductoRepo.find).toHaveBeenCalledWith({ relations: ['proveedor'] });
      expect(result).toEqual(productos);
    });
  });

  // ---------------------------------------------------------------------------
  // 🧪 FIND ONE
  // ---------------------------------------------------------------------------

  describe('findOne', () => {
    it('debería devolver un producto por ID', async () => {
      const producto = { prod_id: 1, prod_nombre: 'Collar' };
      mockProductoRepo.findOne.mockResolvedValue(producto);

      const result = await service.findOne(1);

      expect(mockProductoRepo.findOne).toHaveBeenCalledWith({
        where: { prod_id: 1 },
        relations: ['proveedor'],
      });
      expect(result).toEqual(producto);
    });

    it('debería lanzar error si el producto no existe', async () => {
      mockProductoRepo.findOne.mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  // ---------------------------------------------------------------------------
  // 🧪 UPDATE
  // ---------------------------------------------------------------------------

  describe('update', () => {
    it('debería actualizar un producto correctamente', async () => {
      const productoExistente = { prod_id: 1, prod_nombre: 'Collar', prod_precio: 10 };
      const dto = { prod_nombre: 'Collar de cuero', prod_precio: 15 };
      const productoActualizado = { ...productoExistente, ...dto };

      jest.spyOn(service, 'findOne').mockResolvedValue(productoExistente as any);
      mockProductoRepo.save.mockResolvedValue(productoActualizado);

      const result = await service.update(1, dto as any);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(mockProductoRepo.save).toHaveBeenCalledWith(expect.objectContaining(dto));
      expect(result).toEqual(productoActualizado);
    });

    it('debería actualizar un producto con nuevo proveedor', async () => {
      const productoExistente = { prod_id: 1, prod_nombre: 'Arena', prod_precio: 8 };
      const dto = { prod_precio: 9, prove_id: 2 };
      const proveedor = { prove_id: 2, prove_nombre: 'Pet Supply' };
      const actualizado = { ...productoExistente, ...dto, proveedor };

      jest.spyOn(service, 'findOne').mockResolvedValue(productoExistente as any);
      mockProveedorRepo.findOne.mockResolvedValue(proveedor);
      mockProductoRepo.save.mockResolvedValue(actualizado);

      const result = await service.update(1, dto as any);

      expect(mockProveedorRepo.findOne).toHaveBeenCalledWith({ where: { prove_id: dto.prove_id } });
      expect(mockProductoRepo.save).toHaveBeenCalledWith(expect.objectContaining({ proveedor }));
      expect(result).toEqual(actualizado);
    });

    it('debería lanzar error si el proveedor no existe durante la actualización', async () => {
      const productoExistente = { prod_id: 1, prod_nombre: 'Arena' };
      const dto = { prove_id: 99 };

      jest.spyOn(service, 'findOne').mockResolvedValue(productoExistente as any);
      mockProveedorRepo.findOne.mockResolvedValue(null);

      await expect(service.update(1, dto as any)).rejects.toThrow(NotFoundException);
    });
  });

  // ---------------------------------------------------------------------------
  // 🧪 REMOVE
  // ---------------------------------------------------------------------------

  describe('remove', () => {
    it('debería eliminar un producto correctamente', async () => {
      const producto = { prod_id: 1, prod_nombre: 'Collar' };

      jest.spyOn(service, 'findOne').mockResolvedValue(producto as any);
      mockProductoRepo.remove.mockResolvedValue(undefined);

      await service.remove(1);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(mockProductoRepo.remove).toHaveBeenCalledWith(producto);
    });
  });
});
