import { Test, TestingModule } from '@nestjs/testing';
import { TiendaService } from './tienda.service';
import { Tienda } from './entities/tienda.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

/**
 * Pruebas unitarias para el servicio TiendaService.
 * 
 * Este archivo valida las operaciones CRUD principales,
 * así como la búsqueda de tiendas y su relación con empleados.
 * 
 * Se usan repositorios mockeados con Jest para simular TypeORM.
 */
describe('TiendaService', () => {
  let service: TiendaService;
  let mockRepo: any;

  beforeEach(async () => {
    // Simulación del repositorio de TypeORM
    mockRepo = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TiendaService,
        { provide: getRepositoryToken(Tienda), useValue: mockRepo },
      ],
    }).compile();

    service = module.get<TiendaService>(TiendaService);
  });

  afterEach(() => jest.clearAllMocks());

  // ============================================================
  // 🧪 CREATE
  // ============================================================
  describe('create', () => {
    it('debería crear una tienda correctamente', async () => {
      const dto = { tienda_nombre: 'Sucursal Centro', tienda_activa: true };
      const tiendaCreada = { tienda_id: 1, ...dto };

      mockRepo.create.mockReturnValue(tiendaCreada);
      mockRepo.save.mockResolvedValue(tiendaCreada);

      const result = await service.create(dto as any);

      expect(mockRepo.create).toHaveBeenCalledWith(dto);
      expect(mockRepo.save).toHaveBeenCalledWith(tiendaCreada);
      expect(result).toEqual(tiendaCreada);
    });
  });

  // ============================================================
  // 🧪 FIND ALL
  // ============================================================
  describe('findAll', () => {
    it('debería retornar todas las tiendas sin filtro', async () => {
      const tiendas = [{ tienda_id: 1 }, { tienda_id: 2 }];
      mockRepo.find.mockResolvedValue(tiendas);

      const result = await service.findAll();

      expect(mockRepo.find).toHaveBeenCalledWith({ where: {} });
      expect(result).toEqual(tiendas);
    });

    it('debería filtrar tiendas activas', async () => {
      const tiendas = [{ tienda_id: 1, tienda_activa: true }];
      mockRepo.find.mockResolvedValue(tiendas);

      const result = await service.findAll(true);

      expect(mockRepo.find).toHaveBeenCalledWith({ where: { tienda_activa: true } });
      expect(result).toEqual(tiendas);
    });
  });

  // ============================================================
  // 🧪 FIND ONE
  // ============================================================
  describe('findOne', () => {
    it('debería retornar una tienda existente', async () => {
      const tienda = { tienda_id: 1, tienda_nombre: 'Sucursal Norte' };
      mockRepo.findOne.mockResolvedValue(tienda);

      const result = await service.findOne(1);

      expect(mockRepo.findOne).toHaveBeenCalledWith({ where: { tienda_id: 1 } });
      expect(result).toEqual(tienda);
    });

    it('debería lanzar NotFoundException si no existe', async () => {
      mockRepo.findOne.mockResolvedValue(null);

      await expect(service.findOne(99)).rejects.toThrow(NotFoundException);
    });
  });

  // ============================================================
  // 🧪 FIND EMPLEADOS
  // ============================================================
  describe('findEmpleados', () => {
    it('debería retornar una tienda con sus empleados', async () => {
      const tienda = { tienda_id: 1, empleados: [{ emp_id: 10 }] };
      mockRepo.findOne.mockResolvedValue(tienda);

      const result = await service.findEmpleados(1);

      expect(mockRepo.findOne).toHaveBeenCalledWith({
        where: { tienda_id: 1 },
        relations: ['empleados'],
      });
      expect(result).toEqual(tienda);
    });

    it('debería lanzar NotFoundException si no encuentra la tienda', async () => {
      mockRepo.findOne.mockResolvedValue(null);

      await expect(service.findEmpleados(5)).rejects.toThrow(NotFoundException);
    });
  });

  // ============================================================
  // 🧪 UPDATE
  // ============================================================
  describe('update', () => {
    it('debería actualizar los datos de una tienda', async () => {
      const existente = { tienda_id: 1, tienda_nombre: 'Sucursal Antigua' };
      const dto = { tienda_nombre: 'Sucursal Nueva' };
      const actualizado = { ...existente, ...dto };

      jest.spyOn(service, 'findOne').mockResolvedValue(existente as any);
      mockRepo.save.mockResolvedValue(actualizado);

      const result = await service.update(1, dto as any);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(mockRepo.save).toHaveBeenCalledWith(actualizado);
      expect(result).toEqual(actualizado);
    });
  });

  // ============================================================
  // 🧪 UPDATE ESTADO
  // ============================================================
  describe('updateEstado', () => {
    it('debería cambiar el estado de la tienda a inactiva', async () => {
      const tienda = { tienda_id: 1, tienda_activa: true };
      jest.spyOn(service, 'findOne').mockResolvedValue(tienda as any);
      mockRepo.save.mockResolvedValue({ ...tienda, tienda_activa: false });

      const result = await service.updateEstado(1, false);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(mockRepo.save).toHaveBeenCalledWith({ ...tienda, tienda_activa: false });
      expect(result.tienda_activa).toBe(false);
    });
  });

  // ============================================================
  // 🧪 REMOVE
  // ============================================================
  describe('remove', () => {
    it('debería eliminar una tienda existente', async () => {
      const tienda = { tienda_id: 1 };
      jest.spyOn(service, 'findOne').mockResolvedValue(tienda as any);
      mockRepo.remove.mockResolvedValue(undefined);

      await service.remove(1);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(mockRepo.remove).toHaveBeenCalledWith(tienda);
    });
  });
});
