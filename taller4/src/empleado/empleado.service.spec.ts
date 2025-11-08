import { Test, TestingModule } from '@nestjs/testing';
import { EmpleadoService } from './empleado.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Empleado } from './entities/empleado.entity';
import { Tienda } from '../tienda/entities/tienda.entity';
import { Venta } from '../venta/entities/venta.entity';
import { NotFoundException } from '@nestjs/common';
import * as argon2 from 'argon2';

// Mock global de argon2
jest.mock('argon2', () => ({
  hash: jest.fn(async (v) => `hashed(${v})`),
  verify: jest.fn(async (hash, v) => hash === `hashed(${v})`),
}));

describe('EmpleadoService', () => {
  let service: EmpleadoService;
  let mockEmpleadoRepo: any;
  let mockTiendaRepo: any;
  let mockVentaRepo: any;

  beforeEach(async () => {
    mockEmpleadoRepo = {
      create: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
      find: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
      createQueryBuilder: jest.fn(() => ({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getMany: jest.fn(),
      })),
    };

    mockTiendaRepo = {};
    mockVentaRepo = {};

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmpleadoService,
        { provide: getRepositoryToken(Empleado), useValue: mockEmpleadoRepo },
        { provide: getRepositoryToken(Tienda), useValue: mockTiendaRepo },
        { provide: getRepositoryToken(Venta), useValue: mockVentaRepo },
      ],
    }).compile();

    service = module.get<EmpleadoService>(EmpleadoService);
  });

  afterEach(() => jest.clearAllMocks());

  // ============================================================
  // 🧪 CREATE
  // ============================================================
  describe('create', () => {
    it('debería crear un empleado con contraseña cifrada', async () => {
      const dto = { emp_nombre: 'Ana', emp_email: 'ana@mail.com', emp_contrasena: '12345', tienda_id: 2 };
      const empleado = { ...dto, emp_contrasena: 'hashed(12345)' };
      const saved = { emp_id: 1, ...empleado };

      mockEmpleadoRepo.create.mockReturnValue(empleado);
      mockEmpleadoRepo.save.mockResolvedValue(saved);

      const result = await service.create(dto as any);

      expect(argon2.hash).toHaveBeenCalledWith('12345');
      expect(mockEmpleadoRepo.create).toHaveBeenCalledWith({
        ...dto,
        emp_contrasena: 'hashed(12345)',
        tienda: { tienda_id: 2 },
      });
      expect(mockEmpleadoRepo.save).toHaveBeenCalled();
      expect(result).toEqual(saved);
    });

    it('debería crear un empleado sin contraseña si no se proporciona', async () => {
      const dto = { emp_nombre: 'Luis', emp_email: 'luis@mail.com' };
      const empleado = { ...dto, emp_contrasena: null };
      mockEmpleadoRepo.create.mockReturnValue(empleado);
      mockEmpleadoRepo.save.mockResolvedValue(empleado);

      const result = await service.create(dto as any);

      expect(mockEmpleadoRepo.create).toHaveBeenCalledWith({
        ...dto,
        emp_contrasena: null,
        tienda: null,
      });
      expect(result).toEqual(empleado);
    });
  });

  // ============================================================
  // 🧪 FIND ALL (con filtros)
  // ============================================================
  describe('findAll', () => {
    it('debería retornar empleados sin filtros', async () => {
      const empleados = [{ emp_id: 1 }, { emp_id: 2 }];
      const queryBuilder = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(empleados),
      };
      mockEmpleadoRepo.createQueryBuilder.mockReturnValue(queryBuilder);

      const result = await service.findAll();

      expect(queryBuilder.leftJoinAndSelect).toHaveBeenCalledTimes(2);
      expect(result).toEqual(empleados);
    });

    it('debería aplicar filtros de activo y cargo', async () => {
      const queryBuilder = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue([]),
      };
      mockEmpleadoRepo.createQueryBuilder.mockReturnValue(queryBuilder);

      await service.findAll({ activo: true, cargo: 'Gerente' });

      expect(queryBuilder.andWhere).toHaveBeenCalledWith('empleado.emp_activo = :activo', { activo: true });
      expect(queryBuilder.andWhere).toHaveBeenCalledWith('empleado.emp_cargo LIKE :cargo', { cargo: '%Gerente%' });
    });
  });

  // ============================================================
  // 🧪 FIND BY CORREO
  // ============================================================
  describe('findByCorreo', () => {
    it('debería retornar un empleado por correo', async () => {
      const empleado = { emp_email: 'ana@mail.com' };
      mockEmpleadoRepo.findOne.mockResolvedValue(empleado);

      const result = await service.findByCorreo('ana@mail.com');

      expect(mockEmpleadoRepo.findOne).toHaveBeenCalledWith({ where: { emp_email: 'ana@mail.com' } });
      expect(result).toEqual(empleado);
    });
  });

  // ============================================================
  // 🧪 FIND BY CORREO CON CONTRASEÑA
  // ============================================================
  describe('findByCorreoConContrasena', () => {
    it('debería retornar un empleado incluyendo contraseña', async () => {
      const empleado = { emp_email: 'ana@mail.com', emp_contrasena: 'hashed(123)' };
      mockEmpleadoRepo.findOne.mockResolvedValue(empleado);

      const result = await service.findByCorreoConContrasena('ana@mail.com');

      expect(mockEmpleadoRepo.findOne).toHaveBeenCalledWith({
        where: { emp_email: 'ana@mail.com' },
        select: [
          'emp_id',
          'emp_nombre',
          'emp_email',
          'emp_contrasena',
          'emp_cargo',
          'emp_activo',
        ],
        relations: ['tienda'],
      });
      expect(result).toEqual(empleado);
    });
  });

  // ============================================================
  // 🧪 FIND ONE
  // ============================================================
  describe('findOne', () => {
    it('debería retornar un empleado existente', async () => {
      const empleado = { emp_id: 1, emp_nombre: 'Carlos' };
      mockEmpleadoRepo.findOne.mockResolvedValue(empleado);

      const result = await service.findOne(1);

      expect(mockEmpleadoRepo.findOne).toHaveBeenCalledWith({
        where: { emp_id: 1 },
        relations: ['tienda', 'ventas'],
      });
      expect(result).toEqual(empleado);
    });

    it('debería lanzar NotFoundException si no existe', async () => {
      mockEmpleadoRepo.findOne.mockResolvedValue(null);
      await expect(service.findOne(99)).rejects.toThrow(NotFoundException);
    });
  });

  // ============================================================
  // 🧪 UPDATE
  // ============================================================
  describe('update', () => {
    it('debería actualizar un empleado con nueva contraseña', async () => {
      const existente = { emp_id: 1, emp_nombre: 'Ana' };
      const dto = { emp_contrasena: 'nueva123', emp_nombre: 'Ana Gómez' };
      const updated = { ...existente, emp_nombre: 'Ana Gómez', emp_contrasena: 'hashed(nueva123)' };

      mockEmpleadoRepo.findOne.mockResolvedValue(existente);
      mockEmpleadoRepo.update.mockResolvedValue({});
      jest.spyOn(service, 'findOne').mockResolvedValue(updated as any);

      const result = await service.update(1, dto as any);

      expect(argon2.hash).toHaveBeenCalledWith('nueva123');
      expect(mockEmpleadoRepo.update).toHaveBeenCalledWith({ emp_id: 1 }, expect.objectContaining({
        emp_contrasena: 'hashed(nueva123)',
        emp_nombre: 'Ana Gómez',
      }));
      expect(result).toEqual(updated);
    });

    it('debería lanzar NotFoundException si el empleado no existe', async () => {
      mockEmpleadoRepo.findOne.mockResolvedValue(null);
      await expect(service.update(99, {} as any)).rejects.toThrow(NotFoundException);
    });
  });

  // ============================================================
  // 🧪 UPDATE ESTADO
  // ============================================================
  describe('updateEstado', () => {
    it('debería cambiar el estado activo de un empleado', async () => {
      const empleado = { emp_id: 1, emp_activo: false };
      jest.spyOn(service, 'findOne').mockResolvedValue(empleado as any);
      mockEmpleadoRepo.save.mockResolvedValue({ ...empleado, emp_activo: true });

      const result = await service.updateEstado(1, true);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(mockEmpleadoRepo.save).toHaveBeenCalledWith({ ...empleado, emp_activo: true });
      expect(result.emp_activo).toBe(true);
    });
  });

  // ============================================================
  // 🧪 REMOVE
  // ============================================================
  describe('remove', () => {
    it('debería eliminar un empleado existente', async () => {
      const empleado = { emp_id: 1 };
      jest.spyOn(service, 'findOne').mockResolvedValue(empleado as any);
      mockEmpleadoRepo.remove.mockResolvedValue(undefined);

      await service.remove(1);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(mockEmpleadoRepo.remove).toHaveBeenCalledWith(empleado);
    });
  });
});
