/**
 * Controlador encargado de la gestión del módulo de Empleados.
 * 
 * Define las rutas para crear, listar, filtrar, actualizar, activar/desactivar
 * y eliminar empleados del sistema.
 * 
 * Todas las rutas están protegidas con autenticación JWT y verificación de roles.
 * Solo los usuarios con rol `admin` o `empleado` pueden acceder a ciertas operaciones.
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
    Query,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiBody,
    ApiOperation,
    ApiQuery,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { EmpleadoService } from './empleado.service';
import { CreateEmpleadoDto } from './dtos/create-empleado.dto';
import { UpdateEmpleadoDto } from './dtos/update-empleado.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Empleados')
@ApiBearerAuth()
@Controller('empleado')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EmpleadoController {
    constructor(private readonly empleadoService: EmpleadoService) {}

    // ============================================================
    // Crear Empleado
    // ============================================================

    /**
     * Crea un nuevo empleado dentro del sistema.
     * 
     * Solo accesible por administradores.
     */
    @Roles('admin')
    @Post()
    @ApiOperation({
        summary: 'Crear un nuevo empleado',
        description: 'Permite registrar un nuevo empleado con su información básica.',
    })
    @ApiBody({
        type: CreateEmpleadoDto,
        examples: {
        exitoso: {
            summary: 'Ejemplo exitoso',
            value: {
            emp_nombre: 'Laura Gómez',
            emp_cargo: 'Recepcionista',
            emp_correo: 'laura@example.com',
            emp_contrasena: 'password123',
            tienda_id: 2,
            },
        },
        },
    })
    @ApiResponse({
        status: 201,
        description: 'Empleado creado correctamente.',
        content: {
        'application/json': {
            example: {
            message: 'Empleado creado exitosamente.',
            data: {
                emp_id: 5,
                emp_nombre: 'Laura Gómez',
                emp_cargo: 'Recepcionista',
                emp_correo: 'laura@example.com',
                activo: true,
                creado_en: '2025-10-30T18:05:12.000Z',
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
            example: {
            statusCode: 400,
            message: 'El correo ya está registrado.',
            error: 'Bad Request',
            },
        },
        },
    })
    create(@Body() dto: CreateEmpleadoDto) {
        return this.empleadoService.create(dto);
    }

    // ============================================================
    // Listar Empleados (con filtros opcionales)
    // ============================================================

    /**
     * Obtiene una lista de empleados, con filtros opcionales por estado o cargo.
     * 
     * Accesible para administradores y empleados.
     */
    @Roles('admin', 'empleado')
    @Get()
    @ApiOperation({
        summary: 'Listar empleados con filtros opcionales',
        description:
        'Devuelve todos los empleados. Puede filtrarse por estado (`activo=true/false`) o por cargo.',
    })
    @ApiQuery({ name: 'activo', required: false, example: 'true', description: 'Filtra empleados activos o inactivos' })
    @ApiQuery({ name: 'cargo', required: false, example: 'Veterinario', description: 'Filtra por cargo específico' })
    @ApiResponse({
        status: 200,
        description: 'Lista de empleados obtenida correctamente.',
        content: {
        'application/json': {
            example: {
            data: [
                {
                emp_id: 1,
                emp_nombre: 'Carlos Pérez',
                emp_cargo: 'Veterinario',
                activo: true,
                },
                {
                emp_id: 2,
                emp_nombre: 'Ana Ramírez',
                emp_cargo: 'Recepcionista',
                activo: false,
                },
            ],
            },
        },
        },
    })
    findAll(
        @Query('activo') activo?: string,
        @Query('cargo') cargo?: string,
    ) {
        const filters = {
        activo:
            activo === 'true' ? true : activo === 'false' ? false : undefined,
        cargo,
        };
        return this.empleadoService.findAll(filters);
    }

    // ============================================================
    // Obtener Empleado por ID
    // ============================================================

    /**
     * Devuelve la información de un empleado según su ID.
     * 
     * Accesible por administradores y empleados.
     */
    @Roles('admin', 'empleado')
    @Get(':id')
    @ApiOperation({
        summary: 'Obtener empleado por ID',
        description: 'Permite obtener los datos de un empleado específico por su ID.',
    })
    @ApiResponse({
        status: 200,
        description: 'Empleado encontrado correctamente.',
        content: {
        'application/json': {
            example: {
            emp_id: 1,
            emp_nombre: 'Carlos Pérez',
            emp_cargo: 'Veterinario',
            emp_correo: 'carlos@veterinaria.com',
            activo: true,
            },
        },
        },
    })
    @ApiResponse({
        status: 404,
        description: 'Empleado no encontrado.',
        content: {
        'application/json': {
            example: {
            statusCode: 404,
            message: 'Empleado no encontrado.',
            error: 'Not Found',
            },
        },
        },
    })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.empleadoService.findOne(id);
    }

    // ============================================================
    // Buscar Empleados por Tienda
    // ============================================================

    /**
     * Obtiene todos los empleados asociados a una tienda específica.
     * 
     * Accesible por administradores y empleados.
     */
    @Roles('admin', 'empleado')
    @Get('tienda/:tiendaId')
    @ApiOperation({
        summary: 'Buscar empleados por tienda',
        description: 'Devuelve todos los empleados asociados al ID de una tienda.',
    })
    @ApiResponse({
        status: 200,
        description: 'Empleados encontrados correctamente.',
        content: {
        'application/json': {
            example: {
            data: [
                { emp_id: 3, emp_nombre: 'María López', emp_cargo: 'Veterinaria' },
                { emp_id: 4, emp_nombre: 'David Ruiz', emp_cargo: 'Recepcionista' },
            ],
            },
        },
        },
    })
    findByTienda(@Param('tiendaId', ParseIntPipe) tiendaId: number) {
        return this.empleadoService.findByTienda(tiendaId);
    }

    // ============================================================
    // Buscar Empleados por Cargo
    // ============================================================

    /**
     * Busca empleados según su cargo dentro del sistema.
     * 
     * Accesible por administradores y empleados.
     */
    @Roles('admin', 'empleado')
    @Get('cargo/:cargo')
    @ApiOperation({
        summary: 'Buscar empleados por cargo',
        description: 'Obtiene una lista de empleados filtrados por su cargo.',
    })
    @ApiResponse({
        status: 200,
        description: 'Lista de empleados filtrada por cargo.',
        content: {
        'application/json': {
            example: {
            data: [
                { emp_id: 1, emp_nombre: 'Carlos Pérez', cargo: 'Veterinario' },
                { emp_id: 6, emp_nombre: 'Andrea Díaz', cargo: 'Veterinario' },
            ],
            },
        },
        },
    })
    findByCargo(@Param('cargo') cargo: string) {
        return this.empleadoService.findByCargo(cargo);
    }

    // ============================================================
    // Actualizar Empleado
    // ============================================================

    /**
     * Actualiza la información de un empleado.
     * 
     * Solo accesible por administradores.
     */
    @Roles('admin')
    @Patch(':id')
    @ApiOperation({
        summary: 'Actualizar empleado',
        description:
        'Permite modificar los datos personales o laborales de un empleado existente.',
    })
    @ApiBody({
        type: UpdateEmpleadoDto,
        examples: {
        ejemplo: {
            summary: 'Actualización básica',
            value: {
            emp_nombre: 'Laura Gómez Ramírez',
            emp_cargo: 'Veterinaria Senior',
            },
        },
        },
    })
    @ApiResponse({
        status: 200,
        description: 'Empleado actualizado correctamente.',
        content: {
        'application/json': {
            example: {
            message: 'Empleado actualizado exitosamente.',
            data: {
                emp_id: 5,
                emp_nombre: 'Laura Gómez Ramírez',
                emp_cargo: 'Veterinaria Senior',
                actualizado_en: '2025-10-30T18:30:00.000Z',
            },
            },
        },
        },
    })
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateEmpleadoDto) {
        return this.empleadoService.update(id, dto);
    }

    // ============================================================
    // Activar / Desactivar Empleado
    // ============================================================

    /**
     * Activa un empleado deshabilitado.
     * Solo accesible por administradores.
     */
    @Roles('admin')
    @Patch(':id/activar')
    @ApiOperation({
        summary: 'Activar un empleado',
        description: 'Permite reactivar el acceso y estado de un empleado.',
    })
    @ApiResponse({
        status: 200,
        description: 'Empleado activado correctamente.',
        content: {
        'application/json': {
            example: {
            message: 'Empleado activado exitosamente.',
            emp_id: 5,
            activo: true,
            },
        },
        },
    })
    activate(@Param('id', ParseIntPipe) id: number) {
        return this.empleadoService.updateEstado(id, true);
    }

    /**
     * Desactiva un empleado activo.
     * Solo accesible por administradores.
     */
    @Roles('admin')
    @Patch(':id/desactivar')
    @ApiOperation({
        summary: 'Desactivar un empleado',
        description: 'Deshabilita temporalmente el acceso y estado del empleado.',
    })
    @ApiResponse({
        status: 200,
        description: 'Empleado desactivado correctamente.',
        content: {
        'application/json': {
            example: {
            message: 'Empleado desactivado exitosamente.',
            emp_id: 5,
            activo: false,
            },
        },
        },
    })
    deactivate(@Param('id', ParseIntPipe) id: number) {
        return this.empleadoService.updateEstado(id, false);
    }

    // ============================================================
    // Eliminar Empleado
    // ============================================================

    /**
     * Elimina un empleado del sistema.
     * 
     * Solo accesible por administradores.
     */
    @Roles('admin')
    @Delete(':id')
    @ApiOperation({
        summary: 'Eliminar un empleado',
        description: 'Elimina de forma permanente un registro de empleado.',
    })
    @ApiResponse({
        status: 200,
        description: 'Empleado eliminado correctamente.',
        content: {
        'application/json': {
            example: {
            message: 'Empleado eliminado exitosamente.',
            deletedId: 7,
            },
        },
        },
    })
    @ApiResponse({
        status: 404,
        description: 'Empleado no encontrado.',
    })
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.empleadoService.remove(id);
    }
}
