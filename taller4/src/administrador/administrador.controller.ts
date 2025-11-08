/**
 * Controlador encargado de gestionar las operaciones del módulo de Administrador.
 *
 * Define los endpoints para crear, leer, actualizar y eliminar administradores.
 * 
 * Todas las rutas están protegidas mediante autenticación JWT y verificación de roles.
 * Solo los usuarios con rol `admin` pueden acceder a estos endpoints.
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
import { AdministradorService } from './administrador.service';
import { CreateAdministradorDto } from './dtos/create-administrador.dto';
import { UpdateAdministradorDto } from './dtos/update-administrador.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Administradores')
@ApiBearerAuth()
@Controller('administrador')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdministradorController {
    constructor(private readonly administradorService: AdministradorService) {}

    // ============================================================
    // Crear Administrador
    // ============================================================

    /**
     * Crea un nuevo administrador en el sistema.
     *
     * Solo accesible por usuarios con rol `admin`.
     */
    @Post()
    @Roles('admin')
    @ApiOperation({
        summary: 'Crear un nuevo administrador',
        description:
        'Registra un nuevo administrador con nombre, correo y contraseña. Solo accesible para otros administradores.',
    })
    @ApiBody({
        type: CreateAdministradorDto,
        required: true,
        examples: {
        exitoso: {
            summary: 'Ejemplo exitoso',
            value: {
            admin_nombre: 'Carlos Pérez',
            admin_correo: 'carlos@example.com',
            admin_contrasena: 'secure123',
            },
        },
        errorDuplicado: {
            summary: 'Correo duplicado',
            value: {
            admin_nombre: 'Carlos Pérez',
            admin_correo: 'admin@empresa.com',
            admin_contrasena: 'secure123',
            },
        },
        },
    })
    @ApiResponse({
        status: 201,
        description: 'Administrador creado exitosamente.',
        content: {
        'application/json': {
            example: {
            message: 'Administrador creado exitosamente.',
            data: {
                admin_id: 3,
                admin_nombre: 'Carlos Pérez',
                admin_correo: 'carlos@example.com',
                creado_en: '2025-10-30T17:22:55.000Z',
            },
            },
        },
        },
    })
    @ApiResponse({
        status: 400,
        description: 'Datos inválidos o correo ya registrado.',
        content: {
        'application/json': {
            examples: {
            correoDuplicado: {
                summary: 'Correo existente',
                value: {
                statusCode: 400,
                message: 'El correo ya está registrado',
                error: 'Bad Request',
                },
            },
            errorValidacion: {
                summary: 'Error de validación',
                value: {
                statusCode: 400,
                message: [
                    'admin_correo debe ser un correo válido',
                    'admin_contrasena debe tener al menos 6 caracteres',
                ],
                error: 'Bad Request',
                },
            },
            },
        },
        },
    })
    create(@Body() dto: CreateAdministradorDto) {
        return this.administradorService.create(dto);
    }

    // ============================================================
    // Obtener todos los administradores
    // ============================================================

    /**
     * Devuelve la lista completa de administradores registrados en el sistema.
     *
     * Solo accesible por usuarios con rol `admin`.
     */
    @Get()
    @Roles('admin')
    @ApiOperation({
        summary: 'Obtener todos los administradores',
        description:
        'Obtiene una lista con todos los administradores registrados. Solo disponible para usuarios con rol de administrador.',
    })
    @ApiResponse({
        status: 200,
        description: 'Lista de administradores obtenida correctamente.',
        content: {
        'application/json': {
            example: {
            data: [
                {
                admin_id: 1,
                admin_nombre: 'Super Admin',
                admin_correo: 'admin@empresa.com',
                },
                {
                admin_id: 2,
                admin_nombre: 'Carlos Pérez',
                admin_correo: 'carlos@example.com',
                },
            ],
            },
        },
        },
    })
    @ApiResponse({
        status: 403,
        description: 'Acceso denegado: se requiere rol de administrador.',
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
        return this.administradorService.findAll();
    }

    // ============================================================
    // Obtener administrador por ID
    // ============================================================

    /**
     * Busca un administrador por su identificador único.
     *
     * Solo accesible por usuarios con rol `admin`.
     */
    @Get(':id')
    @Roles('admin')
    @ApiOperation({
        summary: 'Obtener un administrador por ID',
        description:
        'Consulta los datos de un administrador específico a partir de su ID.',
    })
    @ApiResponse({
        status: 200,
        description: 'Administrador encontrado correctamente.',
        content: {
        'application/json': {
            example: {
            admin_id: 2,
            admin_nombre: 'Carlos Pérez',
            admin_correo: 'carlos@example.com',
            },
        },
        },
    })
    @ApiResponse({
        status: 404,
        description: 'Administrador no encontrado.',
        content: {
        'application/json': {
            example: {
            statusCode: 404,
            message: 'Administrador no encontrado',
            error: 'Not Found',
            },
        },
        },
    })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.administradorService.findOne(id);
    }

    // ============================================================
    // Actualizar administrador
    // ============================================================

    /**
     * Actualiza los datos de un administrador existente.
     *
     * Solo accesible por usuarios con rol `admin`.
     */
    @Patch(':id')
    @Roles('admin')
    @ApiOperation({
        summary: 'Actualizar un administrador existente',
        description:
        'Permite modificar los datos (nombre, correo, contraseña) de un administrador específico.',
    })
    @ApiBody({
        type: UpdateAdministradorDto,
        examples: {
        exitoso: {
            summary: 'Actualización exitosa',
            value: {
            admin_nombre: 'Carlos P. Martínez',
            admin_correo: 'carlos.martinez@example.com',
            },
        },
        },
    })
    @ApiResponse({
        status: 200,
        description: 'Administrador actualizado correctamente.',
        content: {
        'application/json': {
            example: {
            message: 'Administrador actualizado exitosamente.',
            data: {
                admin_id: 2,
                admin_nombre: 'Carlos P. Martínez',
                admin_correo: 'carlos.martinez@example.com',
                actualizado_en: '2025-10-30T17:45:23.000Z',
            },
            },
        },
        },
    })
    @ApiResponse({
        status: 404,
        description: 'Administrador no encontrado.',
    })
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateAdministradorDto) {
        return this.administradorService.update(id, dto);
    }

    // ============================================================
    // Eliminar administrador
    // ============================================================

    /**
     * Elimina un administrador del sistema.
     *
     * Solo accesible por usuarios con rol `admin`.
     */
    @Delete(':id')
    @Roles('admin')
    @ApiOperation({
        summary: 'Eliminar un administrador',
        description:
        'Elimina de forma permanente a un administrador del sistema. Solo disponible para administradores.',
    })
    @ApiResponse({
        status: 200,
        description: 'Administrador eliminado exitosamente.',
        content: {
        'application/json': {
            example: {
            message: 'Administrador eliminado correctamente.',
            deletedId: 2,
            },
        },
        },
    })
    @ApiResponse({
        status: 404,
        description: 'Administrador no encontrado.',
        content: {
        'application/json': {
            example: {
            statusCode: 404,
            message: 'Administrador no encontrado',
            error: 'Not Found',
            },
        },
        },
    })
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.administradorService.remove(id);
    }
}
