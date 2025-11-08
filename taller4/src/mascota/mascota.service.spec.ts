import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MascotaService } from './mascota.service';
import { Mascota } from './entities/mascota.entity';

describe('MascotaService', () => {
  let service: MascotaService;

  // Mocks de repositorio
  const mockMascotaRepo = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
    manager: { findOne: jest.fn() },
  };

  /**
   * Configura el módulo de pruebas antes de cada test.
   * Se inyecta el repositorio simulado (mock) en lugar del real.
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MascotaService,
        { provide: getRepositoryToken(Mascota), useValue: mockMascotaRepo },
      ],
    }).compile();

    service = module.get<MascotaService>(MascotaService);
    jest.clearAllMocks(); // Limpieza antes de cada prueba
  });

  // ---------------------------------------------------------------------------
  // 🧪 CREATE
  // ---------------------------------------------------------------------------

  describe('create', () => {
    it('debería crear una mascota correctamente', async () => {
      const dto = { cli_id: 1, nombre: 'Luna', especie: 'Perro' };
      const cliente = { cli_id: 1 };
      const mascotaCreada = { mascota_id: 1, ...dto, cliente };

      mockMascotaRepo.manager.findOne.mockResolvedValue(cliente);
      mockMascotaRepo.create.mockReturnValue(mascotaCreada);
      mockMascotaRepo.save.mockResolvedValue(mascotaCreada);

      const result = await service.create(dto as any);

      expect(mockMascotaRepo.manager.findOne).toHaveBeenCalledWith('clientes', {
        where: { cli_id: dto.cli_id },
      });
      expect(mockMascotaRepo.create).toHaveBeenCalledWith({
        ...dto,
        cliente: { cli_id: dto.cli_id },
      });
      expect(mockMascotaRepo.save).toHaveBeenCalledWith(mascotaCreada);
      expect(result).toEqual(mascotaCreada);
    });

    it('debería lanzar error si el cliente no existe', async () => {
      mockMascotaRepo.manager.findOne.mockResolvedValue(null);
      const dto = { cli_id: 99, nombre: 'Rocky' };

      await expect(service.create(dto as any)).rejects.toThrow(NotFoundException);
    });
  });

  // ---------------------------------------------------------------------------
  // 🧪 FIND ALL
  // ---------------------------------------------------------------------------

  describe('findAll', () => {
    it('debería devolver todas las mascotas', async () => {
      const mascotas = [
        { mascota_id: 1, nombre: 'Luna' },
        { mascota_id: 2, nombre: 'Max' },
      ];
      mockMascotaRepo.find.mockResolvedValue(mascotas);

      const result = await service.findAll();

      expect(mockMascotaRepo.find).toHaveBeenCalledWith({
        relations: ['cliente'],
      });
      expect(result).toEqual(mascotas);
    });
  });

  // ---------------------------------------------------------------------------
  // 🧪 FIND ONE
  // ---------------------------------------------------------------------------

  describe('findOne', () => {
    it('debería devolver una mascota por ID', async () => {
      const mascota = { mascota_id: 1, nombre: 'Luna' };
      mockMascotaRepo.findOne.mockResolvedValue(mascota);

      const result = await service.findOne(1);

      expect(mockMascotaRepo.findOne).toHaveBeenCalledWith({
        where: { mascota_id: 1 },
        relations: ['cliente'],
      });
      expect(result).toEqual(mascota);
    });

    it('debería lanzar error si la mascota no existe', async () => {
      mockMascotaRepo.findOne.mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  // ---------------------------------------------------------------------------
  // 🧪 FIND BY CLIENTE
  // ---------------------------------------------------------------------------

  describe('findByCliente', () => {
    it('debería devolver las mascotas de un cliente', async () => {
      const clienteId = 1;
      const mascotas = [
        { mascota_id: 1, nombre: 'Luna', cliente: { cli_id: clienteId } },
        { mascota_id: 2, nombre: 'Max', cliente: { cli_id: clienteId } },
      ];
      mockMascotaRepo.find.mockResolvedValue(mascotas);

      const result = await service.findByCliente(clienteId);

      expect(mockMascotaRepo.find).toHaveBeenCalledWith({
        where: { cliente: { cli_id: clienteId } },
        relations: ['cliente'],
      });
      expect(result).toEqual(mascotas);
    });
  });

  // ---------------------------------------------------------------------------
  // 🧪 UPDATE
  // ---------------------------------------------------------------------------

  describe('update', () => {
    it('debería actualizar una mascota correctamente', async () => {
      const mascota = { mascota_id: 1, nombre: 'Luna', especie: 'Perro' };
      const dto = { nombre: 'Luna Actualizada', especie: 'Gato' };
      const actualizada = { ...mascota, ...dto };

      jest.spyOn(service, 'findOne').mockResolvedValue(mascota as any);
      mockMascotaRepo.save.mockResolvedValue(actualizada);

      const result = await service.update(1, dto as any);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(mockMascotaRepo.save).toHaveBeenCalledWith(expect.objectContaining(dto));
      expect(result).toEqual(actualizada);
    });
  });

  // ---------------------------------------------------------------------------
  // 🧪 REMOVE
  // ---------------------------------------------------------------------------

  describe('remove', () => {
    it('debería eliminar una mascota correctamente', async () => {
      const mascota = { mascota_id: 1, nombre: 'Luna' };

      jest.spyOn(service, 'findOne').mockResolvedValue(mascota as any);
      mockMascotaRepo.remove.mockResolvedValue(undefined);

      const result = await service.remove(1);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(mockMascotaRepo.remove).toHaveBeenCalledWith(mascota);
      expect(result).toEqual({ message: 'Mascota con ID 1 eliminada correctamente' });
    });
  });
});
