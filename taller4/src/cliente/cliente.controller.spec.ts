import { Test, TestingModule } from '@nestjs/testing';
import { ClienteController } from './cliente.controller';
import { ClienteService } from './cliente.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateClienteDto } from './dtos/create-cliente.dto';
import { UpdateClienteDto } from './dtos/update-cliente.dto';

describe('ClienteController', () => {
    let controller: ClienteController;
    let service: ClienteService;

    // 🧩 Mock del servicio para evitar llamadas reales a la base de datos
    const mockClienteService = {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
    };

    // ============================================================
    // 🧱 Configuración del módulo de testing
    // ============================================================
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        controllers: [ClienteController],
        providers: [
            { provide: ClienteService, useValue: mockClienteService },
        ],
        })
        // Se mockean los guards para permitir el acceso en los tests
        .overrideGuard(JwtAuthGuard)
        .useValue({ canActivate: jest.fn(() => true) })
        .overrideGuard(RolesGuard)
        .useValue({ canActivate: jest.fn(() => true) })
        .compile();

        controller = module.get<ClienteController>(ClienteController);
        service = module.get<ClienteService>(ClienteService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    // ============================================================
    // 🧪 CREATE (endpoint público)
    // ============================================================
    describe('create', () => {
        it('debería crear un cliente correctamente', async () => {
        const dto: CreateClienteDto = {
            cli_nombre: 'María López',
            cli_correo: 'maria@example.com',
            cli_contrasena: '123456',
            cli_telefono: '3105551234',
        } as any;

        const result = {
            cli_id: 1,
            cli_nombre: dto.cli_nombre,
            cli_correo: dto.cli_correo,
            cli_telefono: dto.cli_telefono,
        };

        mockClienteService.create.mockResolvedValue(result);

        const response = await controller.create(dto);

        expect(service.create).toHaveBeenCalledWith(dto);
        expect(response).toEqual(result);
        });
    });

    // ============================================================
    // 🧪 FIND ALL (solo admin)
    // ============================================================
    describe('findAll', () => {
        it('debería devolver una lista de clientes', async () => {
        const result = [
            { cli_id: 1, cli_nombre: 'María López', cli_correo: 'maria@example.com' },
            { cli_id: 2, cli_nombre: 'Pedro Torres', cli_correo: 'pedro@example.com' },
        ];

        mockClienteService.findAll.mockResolvedValue(result);

        const response = await controller.findAll();

        expect(service.findAll).toHaveBeenCalled();
        expect(response).toEqual(result);
        });
    });

    // ============================================================
    // 🧪 FIND ONE (cliente o admin)
    // ============================================================
    describe('findOne', () => {
        it('debería devolver un cliente por su ID', async () => {
        const result = {
            cli_id: 1,
            cli_nombre: 'María López',
            cli_correo: 'maria@example.com',
        };

        mockClienteService.findOne.mockResolvedValue(result);

        const response = await controller.findOne(1);

        expect(service.findOne).toHaveBeenCalledWith(1);
        expect(response).toEqual(result);
        });
    });

    // ============================================================
    // 🧪 UPDATE (cliente o admin)
    // ============================================================
    describe('update', () => {
        it('debería actualizar un cliente correctamente', async () => {
        const dto: UpdateClienteDto = {
            cli_nombre: 'María López de Torres',
            cli_telefono: '3109991122',
        } as any;

        const result = {
            cli_id: 1,
            ...dto,
        };

        mockClienteService.update.mockResolvedValue(result);

        const response = await controller.update(1, dto);

        expect(service.update).toHaveBeenCalledWith(1, dto);
        expect(response).toEqual(result);
        });
    });

    // ============================================================
    // 🧪 REMOVE (solo admin)
    // ============================================================
    describe('remove', () => {
        it('debería eliminar un cliente correctamente', async () => {
        mockClienteService.remove.mockResolvedValue(undefined);

        const response = await controller.remove(1);

        expect(service.remove).toHaveBeenCalledWith(1);
        expect(response).toBeUndefined();
        });
    });
});
