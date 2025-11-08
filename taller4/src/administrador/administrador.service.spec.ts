import { Test, TestingModule } from '@nestjs/testing';
import { AdministradorService } from './administrador.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Administrador } from './entities/administrador.entity';
import { BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';

// Mock global de argon2 (evita redefinir propiedades en cada test)
jest.mock('argon2', () => ({
  hash: jest.fn(async (v) => `hashed(${v})`),
  verify: jest.fn(async (hash, v) => hash === `hashed(${v})`),
}));

describe('AdministradorService', () => {
  let service: AdministradorService;
  let mockRepository: any;

  beforeEach(async () => {
    mockRepository = {
      create: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
      find: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdministradorService,
        { provide: getRepositoryToken(Administrador), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<AdministradorService>(AdministradorService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // ============================================================
  // 🧪 CREATE
  // ============================================================
  describe('create', () => {
    it('debería crear un administrador correctamente', async () => {
      const dto = { adm_nombre: 'Carlos', adm_correo: 'carlos@mail.com', adm_contrasena: '12345' };
      const saved = { adm_id: 1, adm_nombre: 'Carlos', adm_correo: 'carlos@mail.com' };

      mockRepository.create.mockReturnValue(dto);
      mockRepository.save.mockResolvedValue(saved);

      const result = await service.create(dto as any);

      expect(mockRepository.create).toHaveBeenCalledWith(dto);
      expect(mockRepository.save).toHaveBeenCalled();
      expect(result).toEqual(saved);
    });

    it('debería lanzar BadRequestException si no viene contraseña', async () => {
      const dto = { adm_nombre: 'Carlos', adm_correo: 'carlos@mail.com' } as any;

      await expect(service.create(dto)).rejects.toThrow(BadRequestException);
    });
  });

  // ============================================================
  // 🧪 FIND ALL
  // ============================================================
  describe('findAll', () => {
    it('debería retornar todos los administradores sin contraseñas', async () => {
      const admins = [
        { adm_id: 1, adm_nombre: 'Admin 1', adm_contrasena: 'x' },
        { adm_id: 2, adm_nombre: 'Admin 2', adm_contrasena: 'y' },
      ];
      mockRepository.find.mockResolvedValue(admins);

      const result = await service.findAll();

      expect(mockRepository.find).toHaveBeenCalled();
      expect(result.every(a => !a.adm_contrasena)).toBe(true);
    });
  });

  // ============================================================
  // 🧪 FIND ONE
  // ============================================================
  describe('findOne', () => {
    it('debería retornar un administrador existente', async () => {
      const admin = { adm_id: 1, adm_nombre: 'Carlos', adm_contrasena: 'x' };
      mockRepository.findOne.mockResolvedValue(admin);

      const result = await service.findOne(1);

      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { adm_id: 1 } });
      expect(result.adm_id).toBe(1);
      expect(result.adm_contrasena).toBeUndefined();
    });

    it('debería lanzar NotFoundException si no existe', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  // ============================================================
  // 🧪 UPDATE
  // ============================================================
  describe('update', () => {
    it('debería actualizar un administrador correctamente', async () => {
      const dto = { adm_nombre: 'Nuevo Nombre', adm_contrasena: 'nueva' };
      const existing = {
        adm_id: 1,
        adm_nombre: 'Viejo Nombre',
        adm_contrasena: 'hashed(123)',
      };
      const saved = { ...existing, ...dto, adm_contrasena: 'hashed(nueva)' };

      mockRepository.findOne.mockResolvedValue(existing);
      mockRepository.save.mockResolvedValue(saved);

      const result = await service.update(1, dto);

      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { adm_id: 1 },
        select: [
          'adm_id',
          'adm_nombre',
          'adm_usuario',
          'adm_correo',
          'adm_activo',
          'adm_contrasena',
        ],
      });
      expect(mockRepository.save).toHaveBeenCalled();
      expect(result.adm_nombre).toBe('Nuevo Nombre');
      expect(result.adm_contrasena).toBeUndefined();
    });

    it('debería lanzar NotFoundException si el admin no existe', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      await expect(service.update(99, {} as any)).rejects.toThrow(NotFoundException);
    });
  });

  // ============================================================
  // 🧪 REMOVE
  // ============================================================
  describe('remove', () => {
    it('debería eliminar un administrador existente', async () => {
      const admin = { adm_id: 1, adm_nombre: 'Carlos' };
      jest.spyOn(service, 'findOne').mockResolvedValue(admin as any);
      mockRepository.remove.mockResolvedValue(admin);

      await service.remove(1);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(mockRepository.remove).toHaveBeenCalledWith(admin);
    });
  });

  // ============================================================
  // 🧪 VALIDATE ADMIN LOGIN
  // ============================================================
  describe('validateAdminLogin', () => {
    it('debería retornar el administrador si las credenciales son correctas', async () => {
      const admin = {
        adm_id: 1,
        adm_correo: 'carlos@mail.com',
        adm_contrasena: 'hashed(12345)',
      };

      jest.spyOn(service, 'findByCorreoConContrasena').mockResolvedValue(admin as any);

      const result = await service.validateAdminLogin('carlos@mail.com', '12345');

      expect(service.findByCorreoConContrasena).toHaveBeenCalledWith('carlos@mail.com');
      expect(result.adm_contrasena).toBeUndefined();
    });

    it('debería lanzar UnauthorizedException si el correo no existe', async () => {
      jest.spyOn(service, 'findByCorreoConContrasena').mockResolvedValue(null);
      await expect(service.validateAdminLogin('noexiste@mail.com', '12345')).rejects.toThrow(UnauthorizedException);
    });

    it('debería lanzar UnauthorizedException si la contraseña es incorrecta', async () => {
      const admin = { adm_correo: 'carlos@mail.com', adm_contrasena: 'hashed(123)' };
      jest.spyOn(service, 'findByCorreoConContrasena').mockResolvedValue(admin as any);

      await expect(service.validateAdminLogin('carlos@mail.com', 'wrong')).rejects.toThrow(UnauthorizedException);
    });
  });
});
