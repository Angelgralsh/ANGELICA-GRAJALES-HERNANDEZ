/**
 * Controlador del módulo Tienda.
 *
 * Gestiona las operaciones CRUD de las tiendas registradas en el sistema,
 * permitiendo crear, consultar, actualizar, activar/desactivar y eliminar tiendas.
 * 
 * Solo los usuarios con rol de administrador pueden crear, actualizar o eliminar tiendas.
 * Algunas rutas permiten el acceso a empleados.
 * 
 * Todas las rutas están protegidas mediante JWT.
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
    Query,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBody,
    ApiParam,
    ApiQuery,
} from '@nestjs/swagger';
import { TiendaService } from './tienda.service';
import { CreateTiendaDto } from './dtos/create-tienda.dto';
import { UpdateTiendaDto } from './dtos/update-tienda.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Tiendas')
@ApiBearerAuth()
@Controller('tienda')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TiendaController {
    constructor(private readonly tiendaService: TiendaService) {}

    // ============================================================
    // Crear Tienda
    // ============================================================

    /**
     * Crea una nueva tienda en el sistema (solo para administradores).
     */
    @Roles('admin')
    @Post()
    @ApiOperation({
        summary: 'Registrar una nueva tienda (solo administradores)',
        description: 'Permite a los administradores crear una nueva tienda en el sistema.',
    })
    @ApiBody({
        type: CreateTiendaDto,
        examples: {
            exitoso: {
                summary: 'Ejemplo exitoso',
                value: {
                    tie_nombre: 'Pet Paradise',
                    tie_direccion: 'Calle 123 #45-67',
                    tie_telefono: '3001234567',
                    tie_activa: true,
                },
            },
            error: {
                summary: 'Ejemplo con datos inválidos',
                value: {
                    tie_nombre: '',
                    tie_direccion: null,
                },
            },
        },
    })
    @ApiResponse({
        status: 201,
        description: 'Tienda registrada exitosamente.',
        content: {
            'application/json': {
                example: {
                    message: 'Tienda creada correctamente.',
                    data: {
                        tie_id: 1,
                        tie_nombre: 'Pet Paradise',
                        tie_direccion: 'Calle 123 #45-67',
                        tie_telefono: '3001234567',
                        tie_activa: true,
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
                    message: 'El campo tie_nombre es obligatorio.',
                    error: 'Bad Request',
                },
            },
        },
    })
    create(@Body() createTiendaDto: CreateTiendaDto) {
        return this.tiendaService.create(createTiendaDto);
    }

    // ============================================================
    // Listar Tiendas
    // ============================================================

    /**
     * Obtiene la lista completa de tiendas, con opción de filtrar por estado activo/inactivo.
     */
    @Get()
    @ApiOperation({
        summary: 'Listar todas las tiendas',
        description: 'Devuelve todas las tiendas registradas. Puede filtrarse por estado (activa/inactiva).',
    })
    @ApiQuery({
        name: 'activa',
        required: false,
        description: 'Filtrar por tiendas activas (true) o inactivas (false)',
    })
    @ApiResponse({
        status: 200,
        description: 'Lista de tiendas obtenida correctamente.',
        content: {
            'application/json': {
                example: {
                    data: [
                        {
                            tie_id: 1,
                            tie_nombre: 'Pet Paradise',
                            tie_direccion: 'Calle 123 #45-67',
                            tie_telefono: '3001234567',
                            tie_activa: true,
                        },
                        {
                            tie_id: 2,
                            tie_nombre: 'Animal World',
                            tie_direccion: 'Carrera 10 #20-30',
                            tie_telefono: '3109876543',
                            tie_activa: false,
                        },
                    ],
                },
            },
        },
    })
    findAll(@Query('activa') activa?: string) {
        const filterActiva =
            activa === 'true' ? true : activa === 'false' ? false : undefined;
        return this.tiendaService.findAll(filterActiva);
    }

    // ============================================================
    // Obtener Tienda por ID
    // ============================================================

    /**
     * Obtiene la información de una tienda específica según su ID.
     */
    @Get(':id')
    @ApiOperation({
        summary: 'Obtener una tienda por ID',
        description: 'Devuelve la información completa de una tienda según su identificador único.',
    })
    @ApiParam({ name: 'id', type: Number, description: 'ID de la tienda' })
    @ApiResponse({
        status: 200,
        description: 'Tienda encontrada correctamente.',
        content: {
            'application/json': {
                example: {
                    tie_id: 1,
                    tie_nombre: 'Pet Paradise',
                    tie_direccion: 'Calle 123 #45-67',
                    tie_telefono: '3001234567',
                    tie_activa: true,
                },
            },
        },
    })
    @ApiResponse({
        status: 404,
        description: 'Tienda no encontrada.',
        content: {
            'application/json': {
                example: {
                    statusCode: 404,
                    message: 'Tienda no encontrada.',
                    error: 'Not Found',
                },
            },
        },
    })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.tiendaService.findOne(id);
    }

    // ============================================================
    // Empleados por Tienda
    // ============================================================

    /**
     * Obtiene la lista de empleados asociados a una tienda específica.
     */
    @Roles('admin', 'empleado')
    @Get(':id/empleados')
    @ApiOperation({
        summary: 'Listar empleados de una tienda',
        description: 'Permite consultar los empleados que pertenecen a una tienda específica.',
    })
    @ApiParam({ name: 'id', type: Number, description: 'ID de la tienda' })
    @ApiResponse({
        status: 200,
        description: 'Lista de empleados obtenida correctamente.',
        content: {
            'application/json': {
                example: {
                    tienda_id: 1,
                    empleados: [
                        { emp_id: 1, emp_nombre: 'Laura Martínez', emp_cargo: 'Vendedora' },
                        { emp_id: 2, emp_nombre: 'Carlos Pérez', emp_cargo: 'Administrador' },
                    ],
                },
            },
        },
    })
    findEmpleados(@Param('id', ParseIntPipe) id: number) {
        return this.tiendaService.findEmpleados(id);
    }

    // ============================================================
    // Actualizar Tienda
    // ============================================================

    /**
     * Actualiza los datos de una tienda existente.
     */
    @Roles('admin')
    @Patch(':id')
    @ApiOperation({
        summary: 'Actualizar información de una tienda (solo administradores)',
        description: 'Permite modificar los datos de una tienda ya registrada.',
    })
    @ApiBody({
        type: UpdateTiendaDto,
        examples: {
            ejemplo: {
                summary: 'Ejemplo de actualización',
                value: {
                    tie_nombre: 'Pet Lovers',
                    tie_telefono: '3112223344',
                },
            },
        },
    })
    @ApiResponse({
        status: 200,
        description: 'Tienda actualizada correctamente.',
        content: {
            'application/json': {
                example: {
                    message: 'Tienda actualizada exitosamente.',
                    data: {
                        tie_id: 1,
                        tie_nombre: 'Pet Lovers',
                        tie_direccion: 'Calle 123 #45-67',
                        tie_telefono: '3112223344',
                        tie_activa: true,
                    },
                },
            },
        },
    })
    @ApiResponse({
        status: 404,
        description: 'Tienda no encontrada.',
        content: {
            'application/json': {
                example: {
                    statusCode: 404,
                    message: 'Tienda no encontrada.',
                    error: 'Not Found',
                },
            },
        },
    })
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTiendaDto) {
        return this.tiendaService.update(id, dto);
    }

    // ============================================================
    // Activar Tienda
    // ============================================================

    /**
     * Activa una tienda específica (solo administradores).
     */
    @Roles('admin')
    @Patch(':id/activar')
    @ApiOperation({
        summary: 'Activar una tienda (solo administradores)',
        description: 'Cambia el estado de la tienda a activa.',
    })
    @ApiResponse({
        status: 200,
        description: 'Tienda activada correctamente.',
        content: {
            'application/json': {
                example: {
                    message: 'Tienda activada exitosamente.',
                    data: { tie_id: 1, tie_activa: true },
                },
            },
        },
    })
    activate(@Param('id', ParseIntPipe) id: number) {
        return this.tiendaService.updateEstado(id, true);
    }

    // ============================================================
    // Desactivar Tienda
    // ============================================================

    /**
     * Desactiva una tienda específica (solo administradores).
     */
    @Roles('admin')
    @Patch(':id/desactivar')
    @ApiOperation({
        summary: 'Desactivar una tienda (solo administradores)',
        description: 'Cambia el estado de la tienda a inactiva.',
    })
    @ApiResponse({
        status: 200,
        description: 'Tienda desactivada correctamente.',
        content: {
            'application/json': {
                example: {
                    message: 'Tienda desactivada exitosamente.',
                    data: { tie_id: 1, tie_activa: false },
                },
            },
        },
    })
    deactivate(@Param('id', ParseIntPipe) id: number) {
        return this.tiendaService.updateEstado(id, false);
    }

    // ============================================================
    // Eliminar Tienda
    // ============================================================

    /**
     * Elimina una tienda del sistema (solo administradores).
     */
    @Roles('admin')
    @Delete(':id')
    @ApiOperation({
        summary: 'Eliminar una tienda',
        description: 'Elimina una tienda del sistema de forma permanente.',
    })
    @ApiResponse({
        status: 200,
        description: 'Tienda eliminada correctamente.',
        content: {
            'application/json': {
                example: {
                    message: 'Tienda eliminada exitosamente.',
                    deletedId: 1,
                },
            },
        },
    })
    @ApiResponse({
        status: 404,
        description: 'Tienda no encontrada.',
        content: {
            'application/json': {
                example: {
                    statusCode: 404,
                    message: 'Tienda no encontrada.',
                    error: 'Not Found',
                },
            },
        },
    })
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.tiendaService.remove(id);
    }
}
