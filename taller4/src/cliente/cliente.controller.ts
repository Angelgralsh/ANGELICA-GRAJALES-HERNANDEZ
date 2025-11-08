/**
 * Controlador que gestiona las operaciones del módulo de Clientes.
 *
 * Este controlador define los endpoints relacionados con la creación,
 * consulta, actualización y eliminación de clientes.
 *
 * Algunas rutas son públicas (como el registro),
 * mientras que otras requieren autenticación JWT y validación de roles.
 */

import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Body,
    ParseIntPipe,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiBody,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dtos/create-cliente.dto';
import { UpdateClienteDto } from './dtos/update-cliente.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('Clientes')
@ApiBearerAuth()
@Controller('cliente')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ClienteController {
    constructor(private readonly clienteService: ClienteService) {}

    // ============================================================
    // Crear Cliente (PÚBLICO)
    // ============================================================

    /**
     * Crea un nuevo cliente en el sistema.
     *
     * Este endpoint es público y no requiere autenticación.
     * Se utiliza para registrar un nuevo cliente en la plataforma.
     */
    @Public()
    @Post()
    @ApiOperation({
        summary: 'Registrar un nuevo cliente (público)',
        description:
        'Crea un cliente con nombre, correo, contraseña y teléfono. No requiere token JWT.',
    })
    @ApiBody({
        type: CreateClienteDto,
        required: true,
        description: 'Datos necesarios para crear un nuevo cliente.',
        examples: {
        exitoso: {
            summary: 'Ejemplo exitoso',
            value: {
            cli_nombre: 'María López',
            cli_correo: 'maria@example.com',
            cli_contrasena: '123456',
            cli_telefono: '3105551234',
            },
        },
        errorValidacion: {
            summary: 'Ejemplo de error (correo duplicado)',
            value: {
            cli_nombre: 'María López',
            cli_correo: 'laura@example.com',
            cli_contrasena: '123456',
            cli_telefono: '3105551234',
            },
        },
        },
    })
    @ApiResponse({
        status: 201,
        description: 'Cliente creado correctamente.',
        content: {
        'application/json': {
            example: {
            message: 'Cliente creado exitosamente.',
            data: {
                cli_id: 1,
                cli_nombre: 'María López',
                cli_correo: 'maria@example.com',
                cli_telefono: '3105551234',
                createdAt: '2025-10-30T15:32:11.000Z',
            },
            },
        },
        },
    })
    @ApiResponse({
        status: 400,
        description: 'Datos inválidos o correo duplicado.',
        content: {
        'application/json': {
            examples: {
            correoDuplicado: {
                summary: 'Correo ya registrado',
                value: {
                statusCode: 400,
                message: 'El correo ya está en uso',
                error: 'Bad Request',
                },
            },
            errorFormato: {
                summary: 'Errores de validación en los datos',
                value: {
                statusCode: 400,
                message: [
                    'cli_correo debe ser un correo válido',
                    'cli_contrasena debe tener al menos 6 caracteres',
                ],
                error: 'Bad Request',
                },
            },
            },
        },
        },
    })
    create(@Body() dto: CreateClienteDto) {
        return this.clienteService.create(dto);
    }

    // ============================================================
    // Obtener todos los clientes (SOLO ADMIN)
    // ============================================================

    /**
     * Obtiene la lista de todos los clientes registrados.
     *
     * Solo accesible por usuarios con rol de administrador.
     */
    @Get()
    @Roles('admin')
    @ApiOperation({
        summary: 'Obtener todos los clientes (solo admin)',
        description:
        'Devuelve una lista con todos los clientes registrados en el sistema. Solo accesible para administradores.',
    })
    @ApiResponse({
        status: 200,
        description: 'Lista de clientes obtenida correctamente.',
        content: {
        'application/json': {
            example: {
            data: [
                {
                cli_id: 1,
                cli_nombre: 'María López',
                cli_correo: 'maria@example.com',
                cli_telefono: '3105551234',
                },
                {
                cli_id: 2,
                cli_nombre: 'Pedro Torres',
                cli_correo: 'pedro@example.com',
                cli_telefono: '3127778899',
                },
            ],
            },
        },
        },
    })
    @ApiResponse({
        status: 403,
        description: 'Acceso denegado: requiere rol de administrador.',
        content: {
        'application/json': {
            example: {
            statusCode: 403,
            message: 'Acceso denegado',
            error: 'Forbidden',
            },
        },
        },
    })
    findAll() {
        return this.clienteService.findAll();
    }

    // ============================================================
    // Obtener cliente por ID
    // ============================================================

    /**
     * Busca un cliente por su identificador único.
     *
     * Accesible por el propio cliente o por un administrador.
     */
    @Get(':id')
    @Roles('cliente', 'admin')
    @ApiOperation({
        summary: 'Obtener un cliente por su ID',
        description:
        'Permite a un cliente ver su propio perfil o a un administrador consultar cualquier cliente.',
    })
    @ApiResponse({
        status: 200,
        description: 'Cliente encontrado exitosamente.',
        content: {
        'application/json': {
            example: {
            cli_id: 1,
            cli_nombre: 'María López',
            cli_correo: 'maria@example.com',
            cli_telefono: '3105551234',
            },
        },
        },
    })
    @ApiResponse({
        status: 404,
        description: 'Cliente no encontrado.',
        content: {
        'application/json': {
            example: {
            statusCode: 404,
            message: 'Cliente no encontrado',
            error: 'Not Found',
            },
        },
        },
    })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.clienteService.findOne(id);
    }

    // ============================================================
    // Actualizar cliente
    // ============================================================

    /**
     * Actualiza los datos de un cliente existente.
     *
     * Accesible por el propio cliente o por un administrador.
     */
    @Patch(':id')
    @Roles('cliente', 'admin')
    @ApiOperation({
        summary: 'Actualizar los datos de un cliente',
        description:
        'Permite al cliente modificar su información personal o al administrador actualizar cualquier cliente.',
    })
    @ApiBody({
        type: UpdateClienteDto,
        examples: {
        exitoso: {
            summary: 'Actualización exitosa',
            value: {
            cli_nombre: 'María López de Torres',
            cli_telefono: '3109991122',
            },
        },
        },
    })
    @ApiResponse({
        status: 200,
        description: 'Cliente actualizado correctamente.',
        content: {
        'application/json': {
            example: {
            message: 'Cliente actualizado exitosamente.',
            data: {
                cli_id: 1,
                cli_nombre: 'María López de Torres',
                cli_correo: 'maria@example.com',
                cli_telefono: '3109991122',
                updatedAt: '2025-10-30T16:10:45.000Z',
            },
            },
        },
        },
    })
    @ApiResponse({
        status: 404,
        description: 'Cliente no encontrado.',
    })
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateClienteDto) {
        return this.clienteService.update(id, dto);
    }

    // ============================================================
    // Eliminar cliente (SOLO ADMIN)
    // ============================================================

    /**
     * Elimina un cliente del sistema.
     *
     * Solo accesible por usuarios con rol de administrador.
     */
    @Delete(':id')
    @Roles('admin')
    @ApiOperation({
        summary: 'Eliminar un cliente (solo admin)',
        description:
        'Elimina permanentemente un cliente del sistema. Solo puede realizarlo un administrador.',
    })
    @ApiResponse({
        status: 200,
        description: 'Cliente eliminado correctamente.',
        content: {
        'application/json': {
            example: {
            message: 'Cliente eliminado correctamente.',
            deletedId: 5,
            },
        },
        },
    })
    @ApiResponse({
        status: 404,
        description: 'Cliente no encontrado.',
    })
    @ApiResponse({
        status: 403,
        description: 'Acceso denegado: requiere rol de administrador.',
    })
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.clienteService.remove(id);
    }
}
