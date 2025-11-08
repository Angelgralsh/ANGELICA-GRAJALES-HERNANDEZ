import { Test, TestingModule } from '@nestjs/testing';
import { ClienteService } from './cliente.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { NotFoundException } from '@nestjs/common';

// Mock global de argon2
jest.mock('argon2', () => ({
  hash: jest.fn(async (v) => `hashed(${v})`),
  verify: jest.fn(async (hash, v) => hash === `hashed(${v})`),
}));

describe('ClienteService', () => {
  let service: ClienteService;
  let mockRepository: any;

  beforeEach(async () => {
    mockRepository = {
      create: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
      find: jest.fn(),
      remove: jest.fn(),
      createQueryBuilder: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClienteService,
        { provide: getRepositoryToken(Cliente), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<ClienteService>(ClienteService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // ============================================================
  // 🧪 CREATE
  // ============================================================
  describe('create', () => {
    it('debería crear un cliente correctamente', async () => {
      const dto = { cli_nombre: 'Ana', cli_correo: 'ana@mail.com', cli_contrasena: '12345' };
      const created = { ...dto };
      const saved = { cli_id: 1, cli_nombre: 'Ana', cli_correo: 'ana@mail.com' };

      mockRepository.create.mockReturnValue(created);
      mockRepository.save.mockResolvedValue(saved);

      const result = await service.create(dto as any);

      expect(mockRepository.create).toHaveBeenCalledWith(dto);
      expect(mockRepository.save).toHaveBeenCalled();
      expect(result.cli_contrasena).toBeUndefined();
      expect(result).toEqual(saved);
    });
  });

  // ============================================================
  // 🧪 FIND BY CORREO
  // ============================================================
  describe('findByCorreo', () => {
    it('debería retornar un cliente si existe', async () => {
      const cliente = { cli_correo: 'ana@mail.com' };
      mockRepository.findOne.mockResolvedValue(cliente);

      const result = await service.findByCorreo('ana@mail.com');
      expect(result).toEqual(cliente);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { cli_correo: 'ana@mail.com' } });
    });
  });

  // ============================================================
  // 🧪 FIND BY CORREO CON CONTRASEÑA
  // ============================================================
  describe('findByCorreoConContrasena', () => {
    it('debería obtener un cliente con contraseña usando query builder', async () => {
      const cliente = { cli_correo: 'ana@mail.com', cli_contrasena: 'hashed(123)' };

      const getOne = jest.fn().mockResolvedValue(cliente);
      const where = jest.fn().mockReturnValue({ getOne });
      const addSelect = jest.fn().mockReturnValue({ where });
      mockRepository.createQueryBuilder.mockReturnValue({ addSelect });

      const result = await service.findByCorreoConContrasena('ana@mail.com');

      expect(result).toEqual(cliente);
      expect(mockRepository.createQueryBuilder).toHaveBeenCalledWith('cliente');
      expect(addSelect).toHaveBeenCalledWith('cliente.cli_contrasena');
    });
  });

  // ============================================================
  // 🧪 FIND ALL
  // ============================================================
  describe('findAll', () => {
    it('debería retornar todos los clientes sin contraseñas', async () => {
      const clientes = [
        { cli_id: 1, cli_nombre: 'Ana', cli_contrasena: 'x' },
        { cli_id: 2, cli_nombre: 'Luis', cli_contrasena: 'y' },
      ];
      mockRepository.find.mockResolvedValue(clientes);

      const result = await service.findAll();

      expect(mockRepository.find).toHaveBeenCalledWith({
        relations: ['ventas', 'mascotas'],
      });
      expect(result.every(c => !c.cli_contrasena)).toBe(true);
    });
  });

  // ============================================================
  // 🧪 FIND ONE
  // ============================================================
  describe('findOne', () => {
    it('debería retornar un cliente existente', async () => {
      const cliente = { cli_id: 1, cli_nombre: 'Ana', cli_contrasena: 'x' };
      mockRepository.findOne.mockResolvedValue(cliente);

      const result = await service.findOne(1);

      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { cli_id: 1 },
        relations: ['ventas', 'mascotas'],
      });
      expect(result.cli_contrasena).toBeUndefined();
    });

    it('debería lanzar NotFoundException si el cliente no existe', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      await expect(service.findOne(99)).rejects.toThrow(NotFoundException);
    });
  });

  // ============================================================
  // 🧪 UPDATE
  // ============================================================
  describe('update', () => {
    it('debería actualizar un cliente correctamente', async () => {
      const dto = { cli_nombre: 'Nuevo Nombre', cli_contrasena: 'nueva' };
      const existing = { cli_id: 1, cli_nombre: 'Viejo Nombre', cli_contrasena: 'hashed(123)' };
      const saved = { ...existing, ...dto, cli_contrasena: 'hashed(nueva)' };

      jest.spyOn(service, 'findOne').mockResolvedValue(existing as any);
      mockRepository.save.mockResolvedValue(saved);

      const result = await service.update(1, dto);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(mockRepository.save).toHaveBeenCalled();
      expect(result.cli_nombre).toBe('Nuevo Nombre');
      expect(result.cli_contrasena).toBeUndefined();
    });
  });

  // ============================================================
  // 🧪 REMOVE
  // ============================================================
  describe('remove', () => {
    it('debería eliminar un cliente existente', async () => {
      const cliente = { cli_id: 1, cli_nombre: 'Ana' };
      jest.spyOn(service, 'findOne').mockResolvedValue(cliente as any);
      mockRepository.remove.mockResolvedValue(cliente);

      await service.remove(1);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(mockRepository.remove).toHaveBeenCalledWith(cliente);
    });
  });

  // ============================================================
  // 🧪 VERIFICAR CONTRASEÑA
  // ============================================================
  describe('verificarContrasena', () => {
    it('debería retornar true si la contraseña es correcta', async () => {
      const cliente = { cli_correo: 'ana@mail.com', cli_contrasena: 'hashed(12345)' };
      jest.spyOn(service, 'findByCorreoConContrasena').mockResolvedValue(cliente as any);

      const result = await service.verificarContrasena('ana@mail.com', '12345');

      expect(service.findByCorreoConContrasena).toHaveBeenCalledWith('ana@mail.com');
      expect(result).toBe(true);
    });

    it('debería retornar false si el cliente no tiene contraseña', async () => {
      jest.spyOn(service, 'findByCorreoConContrasena').mockResolvedValue({ cli_correo: 'ana@mail.com' } as any);
      const result = await service.verificarContrasena('ana@mail.com', '12345');
      expect(result).toBe(false);
    });

    it('debería retornar false si la contraseña no coincide', async () => {
      const cliente = { cli_correo: 'ana@mail.com', cli_contrasena: 'hashed(otra)' };
      jest.spyOn(service, 'findByCorreoConContrasena').mockResolvedValue(cliente as any);

      const result = await service.verificarContrasena('ana@mail.com', 'incorrecta');
      expect(result).toBe(false);
    });
  });
});
