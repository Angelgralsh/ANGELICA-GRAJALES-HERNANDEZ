import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProveedorService } from './proveedor.service';
import { Proveedor } from './entities/proveedor.entity';

describe('ProveedorService', () => {
  let service: ProveedorService;

  // Mock del repositorio de TypeORM
  const mockProveedorRepo = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  /**
   * Configuración del módulo de pruebas
   * Antes de cada test, se inyecta el servicio con un mock del repositorio.
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProveedorService,
        { provide: getRepositoryToken(Proveedor), useValue: mockProveedorRepo },
      ],
    }).compile();

    service = module.get<ProveedorService>(ProveedorService);
    jest.clearAllMocks(); // Limpieza entre pruebas
  });

  // ---------------------------------------------------------------------------
  // 🧪 CREATE
  // ---------------------------------------------------------------------------

  describe('create', () => {
    it('debería crear un proveedor correctamente', async () => {
      const dto = { prove_nombre: 'PetFood S.A.', prove_telefono: '555-1234' };
      const proveedorGuardado = { prove_id: 1, ...dto };

      mockProveedorRepo.create.mockReturnValue(dto);
      mockProveedorRepo.save.mockResolvedValue(proveedorGuardado);

      const result = await service.create(dto as any);

      expect(mockProveedorRepo.create).toHaveBeenCalledWith(dto);
      expect(mockProveedorRepo.save).toHaveBeenCalledWith(dto);
      expect(result).toEqual(proveedorGuardado);
    });
  });

  // ---------------------------------------------------------------------------
  // 🧪 FIND ALL
  // ---------------------------------------------------------------------------

  describe('findAll', () => {
    it('debería devolver todos los proveedores', async () => {
      const proveedores = [
        { prove_id: 1, prove_nombre: 'PetShop Inc.' },
        { prove_id: 2, prove_nombre: 'AnimalSupply Co.' },
      ];

      mockProveedorRepo.find.mockResolvedValue(proveedores);

      const result = await service.findAll();

      expect(mockProveedorRepo.find).toHaveBeenCalledWith({ relations: ['productos'] });
      expect(result).toEqual(proveedores);
    });
  });

  // ---------------------------------------------------------------------------
  // 🧪 FIND ONE
  // ---------------------------------------------------------------------------

  describe('findOne', () => {
    it('debería devolver un proveedor existente', async () => {
      const proveedor = { prove_id: 1, prove_nombre: 'PetShop' };
      mockProveedorRepo.findOne.mockResolvedValue(proveedor);

      const result = await service.findOne(1);

      expect(mockProveedorRepo.findOne).toHaveBeenCalledWith({
        where: { prove_id: 1 },
        relations: ['productos'],
      });
      expect(result).toEqual(proveedor);
    });

    it('debería lanzar error si el proveedor no existe', async () => {
      mockProveedorRepo.findOne.mockResolvedValue(null);

      await expect(service.findOne(99)).rejects.toThrow(NotFoundException);
    });
  });

  // ---------------------------------------------------------------------------
  // 🧪 UPDATE
  // ---------------------------------------------------------------------------

  describe('update', () => {
    it('debería actualizar un proveedor correctamente', async () => {
      const proveedorExistente = { prove_id: 1, prove_nombre: 'OldName', prove_telefono: '111' };
      const dto = { prove_nombre: 'NewName', prove_telefono: '222' };
      const proveedorActualizado = { ...proveedorExistente, ...dto };

      jest.spyOn(service, 'findOne').mockResolvedValue(proveedorExistente as any);
      mockProveedorRepo.save.mockResolvedValue(proveedorActualizado);

      const result = await service.update(1, dto as any);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(mockProveedorRepo.save).toHaveBeenCalledWith(expect.objectContaining(dto));
      expect(result).toEqual(proveedorActualizado);
    });
  });

  // ---------------------------------------------------------------------------
  // 🧪 REMOVE
  // ---------------------------------------------------------------------------

  describe('remove', () => {
    it('debería eliminar un proveedor correctamente', async () => {
      const proveedor = { prove_id: 1, prove_nombre: 'PetShop' };

      jest.spyOn(service, 'findOne').mockResolvedValue(proveedor as any);
      mockProveedorRepo.remove.mockResolvedValue(undefined);

      await service.remove(1);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(mockProveedorRepo.remove).toHaveBeenCalledWith(proveedor);
    });
  });
});
