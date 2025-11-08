/**
 * Controlador para la gestión del inventario de productos en tiendas.
 *
 * Proporciona los endpoints para realizar operaciones CRUD sobre los registros de stock,
 * asociando productos con tiendas y sus cantidades disponibles.
 *
 * Las rutas sensibles están protegidas con autenticación JWT.
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
import { InventarioService } from './inventario.service';
import { CreateInventarioDto } from './dtos/create-inventario.dto';
import { UpdateInventarioDto } from './dtos/update-inventario.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Inventario')
@ApiBearerAuth()
@Controller('inventario')
export class InventarioController {
    constructor(private readonly inventarioService: InventarioService) {}

    // ============================================================
    // Crear Registro de Inventario
    // ============================================================

    /**
     * Crea un nuevo registro de inventario (asocia un producto con una tienda).
     *
     * Requiere autenticación mediante JWT.
     */
    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiOperation({
        summary: 'Crear un nuevo registro de inventario',
        description:
        'Permite agregar un producto al inventario de una tienda con una cantidad inicial.',
    })
    @ApiBody({
        type: CreateInventarioDto,
        examples: {
        exitoso: {
            summary: 'Ejemplo exitoso',
            value: {
            tienda_id: 2,
            producto_id: 7,
            cantidad_disponible: 50,
            },
        },
        error: {
            summary: 'Ejemplo con datos inválidos',
            value: {
            tienda_id: null,
            producto_id: 7,
            cantidad_disponible: -10,
            },
        },
        },
    })
    @ApiResponse({
        status: 201,
        description: 'Inventario creado correctamente.',
        content: {
        'application/json': {
            example: {
            message: 'Inventario registrado exitosamente.',
            data: {
                inventario_id: 10,
                tienda_id: 2,
                producto_id: 7,
                cantidad_disponible: 50,
                creado_en: '2025-10-30T21:40:00.000Z',
            },
            },
        },
        },
    })
    @ApiResponse({
        status: 400,
        description: 'Error en los datos o referencia inválida.',
        content: {
        'application/json': {
            example: {
            statusCode: 400,
            message: 'El producto o la tienda especificada no existe.',
            error: 'Bad Request',
            },
        },
        },
    })
    create(@Body() dto: CreateInventarioDto) {
        return this.inventarioService.create(dto);
    }

    // ============================================================
    // Listar Inventarios
    // ============================================================

    /**
     * Obtiene todos los registros de inventario con sus relaciones de producto y tienda.
     */
    @Get()
    @ApiOperation({
        summary: 'Listar todos los registros de inventario',
        description:
        'Devuelve una lista con el stock de productos por tienda, incluyendo sus relaciones.',
    })
    @ApiResponse({
        status: 200,
        description: 'Lista de inventarios obtenida correctamente.',
        content: {
        'application/json': {
            example: {
            data: [
                {
                inventario_id: 1,
                tienda_id: 1,
                producto_id: 3,
                cantidad_disponible: 30,
                producto: { nombre: 'Shampoo para perros', categoria: 'Cuidado' },
                tienda: { nombre: 'PetShop Centro' },
                },
                {
                inventario_id: 2,
                tienda_id: 1,
                producto_id: 5,
                cantidad_disponible: 20,
                producto: { nombre: 'Collar grande', categoria: 'Accesorios' },
                tienda: { nombre: 'PetShop Centro' },
                },
            ],
            },
        },
        },
    })
    findAll() {
        return this.inventarioService.findAll();
    }

    // ============================================================
    // Obtener Inventario por ID
    // ============================================================

    /**
     * Busca un registro de inventario por su identificador único.
     */
    @Get(':id')
    @ApiOperation({
        summary: 'Obtener un inventario por ID',
        description:
        'Devuelve la información detallada de un registro de inventario específico.',
    })
    @ApiResponse({
        status: 200,
        description: 'Inventario encontrado correctamente.',
        content: {
        'application/json': {
            example: {
            inventario_id: 2,
            tienda_id: 1,
            producto_id: 5,
            cantidad_disponible: 20,
            producto: { nombre: 'Collar grande', categoria: 'Accesorios' },
            tienda: { nombre: 'PetShop Centro' },
            },
        },
        },
    })
    @ApiResponse({
        status: 404,
        description: 'Inventario no encontrado.',
        content: {
        'application/json': {
            example: {
            statusCode: 404,
            message: 'Inventario no encontrado.',
            error: 'Not Found',
            },
        },
        },
    })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.inventarioService.findOne(id);
    }

    // ============================================================
    // Actualizar Inventario
    // ============================================================

    /**
     * Actualiza la cantidad disponible de un inventario existente.
     *
     * Requiere autenticación JWT.
     */
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    @ApiOperation({
        summary: 'Actualizar inventario',
        description:
        'Permite modificar la cantidad disponible de un producto en el inventario.',
    })
    @ApiBody({
        type: UpdateInventarioDto,
        examples: {
        ejemplo: {
            summary: 'Ejemplo de actualización',
            value: {
            cantidad_disponible: 80,
            },
        },
        },
    })
    @ApiResponse({
        status: 200,
        description: 'Inventario actualizado correctamente.',
        content: {
        'application/json': {
            example: {
            message: 'Inventario actualizado exitosamente.',
            data: {
                inventario_id: 2,
                tienda_id: 1,
                producto_id: 5,
                cantidad_disponible: 80,
                actualizado_en: '2025-10-30T21:50:00.000Z',
            },
            },
        },
        },
    })
    @ApiResponse({
        status: 404,
        description: 'Inventario no encontrado.',
        content: {
        'application/json': {
            example: {
            statusCode: 404,
            message: 'Inventario no encontrado.',
            error: 'Not Found',
            },
        },
        },
    })
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateInventarioDto) {
        return this.inventarioService.update(id, dto);
    }

    // ============================================================
    // Eliminar Inventario
    // ============================================================

    /**
     * Elimina un registro de inventario por su ID.
     *
     * Requiere autenticación JWT.
     */
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiOperation({
        summary: 'Eliminar inventario',
        description:
        'Permite eliminar un registro de inventario específico del sistema.',
    })
    @ApiResponse({
        status: 200,
        description: 'Inventario eliminado correctamente.',
        content: {
        'application/json': {
            example: {
            message: 'Inventario eliminado exitosamente.',
            deletedId: 2,
            },
        },
        },
    })
    @ApiResponse({
        status: 404,
        description: 'Inventario no encontrado.',
        content: {
        'application/json': {
            example: {
            statusCode: 404,
            message: 'Inventario no encontrado.',
            error: 'Not Found',
            },
        },
        },
    })
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.inventarioService.remove(id);
    }
}
