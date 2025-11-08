/**
 * Controlador del módulo Proveedor.
 *
 * Gestiona las operaciones CRUD de los proveedores registrados en el sistema,
 * permitiendo crear, consultar, actualizar y eliminar registros.
 *
 * Algunas operaciones requieren autenticación mediante JWT
 * y solo los administradores pueden modificarlos o eliminarlos.
 */

import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBody,
    ApiParam,
} from '@nestjs/swagger';
import { ProveedorService } from './proveedor.service';
import { CreateProveedorDto } from './dtos/create-proveedor.dto';
import { UpdateProveedorDto } from './dtos/update-proveedor.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Proveedores')
@ApiBearerAuth()
@Controller('proveedor')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProveedorController {
    constructor(private readonly proveedorService: ProveedorService) {}

    // ============================================================
    // Crear Proveedor
    // ============================================================

    /**
     * Registra un nuevo proveedor en el sistema.
     */
    @Roles('admin')
    @Post()
    @ApiOperation({
        summary: 'Registrar un nuevo proveedor (solo administradores)',
        description:
            'Permite registrar un nuevo proveedor con sus datos básicos como nombre, contacto y dirección.',
    })
    @ApiBody({
        type: CreateProveedorDto,
        examples: {
            exitoso: {
                summary: 'Ejemplo exitoso',
                value: {
                    prov_nombre: 'Distribuidora Animalia',
                    prov_direccion: 'Carrera 10 #20-30',
                    prov_telefono: '3101234567',
                    prov_email: 'contacto@animalia.com',
                },
            },
            error: {
                summary: 'Ejemplo con datos inválidos',
                value: {
                    prov_nombre: '',
                    prov_telefono: '123',
                },
            },
        },
    })
    @ApiResponse({
        status: 201,
        description: 'Proveedor registrado exitosamente.',
        content: {
            'application/json': {
                example: {
                    message: 'Proveedor creado correctamente.',
                    data: {
                        prov_id: 1,
                        prov_nombre: 'Distribuidora Animalia',
                        prov_direccion: 'Carrera 10 #20-30',
                        prov_telefono: '3101234567',
                        prov_email: 'contacto@animalia.com',
                    },
                },
            },
        },
    })
    @ApiResponse({
        status: 400,
        description: 'Datos inválidos o faltantes.',
        content: {
            'application/json': {
                example: {
                    statusCode: 400,
                    message: 'El campo prov_nombre es obligatorio.',
                    error: 'Bad Request',
                },
            },
        },
    })
    create(@Body() dto: CreateProveedorDto) {
        return this.proveedorService.create(dto);
    }

    // ============================================================
    // Listar Proveedores
    // ============================================================

    /**
     * Obtiene la lista completa de proveedores registrados.
     */
    @Get()
    @ApiOperation({
        summary: 'Listar todos los proveedores',
        description: 'Devuelve la lista completa de proveedores registrados en el sistema.',
    })
    @ApiResponse({
        status: 200,
        description: 'Lista de proveedores obtenida correctamente.',
        content: {
            'application/json': {
                example: {
                    data: [
                        {
                            prov_id: 1,
                            prov_nombre: 'Distribuidora Animalia',
                            prov_direccion: 'Carrera 10 #20-30',
                            prov_telefono: '3101234567',
                            prov_email: 'contacto@animalia.com',
                        },
                        {
                            prov_id: 2,
                            prov_nombre: 'PetMarket S.A.',
                            prov_direccion: 'Calle 50 #25-45',
                            prov_telefono: '3009876543',
                            prov_email: 'ventas@petmarket.com',
                        },
                    ],
                },
            },
        },
    })
    findAll() {
        return this.proveedorService.findAll();
    }

    // ============================================================
    // Buscar Proveedor por ID
    // ============================================================

    /**
     * Obtiene la información de un proveedor según su ID único.
     */
    @Get(':id')
    @ApiOperation({
        summary: 'Obtener un proveedor por ID',
        description: 'Devuelve los detalles completos de un proveedor mediante su identificador único.',
    })
    @ApiParam({ name: 'id', type: Number, description: 'ID del proveedor a consultar' })
    @ApiResponse({
        status: 200,
        description: 'Proveedor encontrado correctamente.',
        content: {
            'application/json': {
                example: {
                    prov_id: 1,
                    prov_nombre: 'Distribuidora Animalia',
                    prov_direccion: 'Carrera 10 #20-30',
                    prov_telefono: '3101234567',
                    prov_email: 'contacto@animalia.com',
                },
            },
        },
    })
    @ApiResponse({
        status: 404,
        description: 'Proveedor no encontrado.',
        content: {
            'application/json': {
                example: {
                    statusCode: 404,
                    message: 'Proveedor no encontrado.',
                    error: 'Not Found',
                },
            },
        },
    })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.proveedorService.findOne(id);
    }

    // ============================================================
    // Actualizar Proveedor
    // ============================================================

    /**
     * Actualiza los datos de un proveedor existente.
     */
    @Roles('admin')
    @Patch(':id')
    @ApiOperation({
        summary: 'Actualizar datos de un proveedor (solo administradores)',
        description: 'Permite modificar los datos de un proveedor ya existente.',
    })
    @ApiBody({
        type: UpdateProveedorDto,
        examples: {
            ejemplo: {
                summary: 'Ejemplo de actualización',
                value: {
                    prov_telefono: '3125556677',
                    prov_email: 'nuevo_contacto@animalia.com',
                },
            },
        },
    })
    @ApiResponse({
        status: 200,
        description: 'Proveedor actualizado correctamente.',
        content: {
            'application/json': {
                example: {
                    message: 'Proveedor actualizado exitosamente.',
                    data: {
                        prov_id: 1,
                        prov_nombre: 'Distribuidora Animalia',
                        prov_direccion: 'Carrera 10 #20-30',
                        prov_telefono: '3125556677',
                        prov_email: 'nuevo_contacto@animalia.com',
                    },
                },
            },
        },
    })
    @ApiResponse({
        status: 404,
        description: 'Proveedor no encontrado.',
        content: {
            'application/json': {
                example: {
                    statusCode: 404,
                    message: 'Proveedor no encontrado.',
                    error: 'Not Found',
                },
            },
        },
    })
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProveedorDto) {
        return this.proveedorService.update(id, dto);
    }

    // ============================================================
    // Eliminar Proveedor
    // ============================================================

    /**
     * Elimina un proveedor del sistema (solo administradores).
     */
    @Roles('admin')
    @Delete(':id')
    @ApiOperation({
        summary: 'Eliminar un proveedor (solo administradores)',
        description: 'Elimina un proveedor del sistema de forma permanente según su identificador único.',
    })
    @ApiResponse({
        status: 200,
        description: 'Proveedor eliminado correctamente.',
        content: {
            'application/json': {
                example: {
                    message: 'Proveedor eliminado exitosamente.',
                    deletedId: 1,
                },
            },
        },
    })
    @ApiResponse({
        status: 404,
        description: 'Proveedor no encontrado.',
        content: {
            'application/json': {
                example: {
                    statusCode: 404,
                    message: 'Proveedor no encontrado.',
                    error: 'Not Found',
                },
            },
        },
    })
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.proveedorService.remove(id);
    }
}
