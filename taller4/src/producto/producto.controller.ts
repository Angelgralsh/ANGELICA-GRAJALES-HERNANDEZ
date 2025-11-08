/**
 * Controlador del módulo Producto.
 *
 * Gestiona las operaciones CRUD relacionadas con los productos
 * registrados en el sistema. Permite crear, listar, actualizar
 * y eliminar productos.
 *
 * Las operaciones de creación, actualización y eliminación
 * requieren autenticación mediante JWT.
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
    ApiTags,
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiBody,
} from '@nestjs/swagger';
import { ProductoService } from './producto.service';
import { CreateProductoDto } from './dtos/create-producto.dto';
import { UpdateProductoDto } from './dtos/update-producto.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Productos')
@Controller('producto')
export class ProductoController {
    constructor(private readonly productoService: ProductoService) {}

    // ============================================================
    // Crear Producto
    // ============================================================

    /**
     * Crea un nuevo producto en el sistema.
     */
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Post()
    @ApiOperation({
        summary: 'Registrar un nuevo producto',
        description:
        'Permite registrar un producto en el sistema. Requiere autenticación JWT.',
    })
    @ApiBody({
        type: CreateProductoDto,
        examples: {
        exitoso: {
            summary: 'Ejemplo exitoso',
            value: {
            prod_nombre: 'Croquetas Premium 10kg',
            prod_descripcion: 'Alimento balanceado para perros adultos',
            prod_precio: 85000,
            prod_stock: 30,
            },
        },
        error: {
            summary: 'Ejemplo con datos inválidos',
            value: {
            prod_nombre: '',
            prod_precio: -500,
            },
        },
        },
    })
    @ApiResponse({
        status: 201,
        description: 'Producto creado exitosamente.',
        content: {
        'application/json': {
            example: {
            message: 'Producto registrado correctamente.',
            data: {
                prod_id: 12,
                prod_nombre: 'Croquetas Premium 10kg',
                prod_descripcion: 'Alimento balanceado para perros adultos',
                prod_precio: 85000,
                prod_stock: 30,
                creadoEn: '2025-10-30T14:00:00.000Z',
            },
            },
        },
        },
    })
    @ApiResponse({
        status: 400,
        description: 'Error de validación o datos incompletos.',
        content: {
        'application/json': {
            example: {
            statusCode: 400,
            message: ['prod_nombre no puede estar vacío', 'prod_precio debe ser mayor a 0'],
            error: 'Bad Request',
            },
        },
        },
    })
    create(@Body() dto: CreateProductoDto) {
        return this.productoService.create(dto);
    }

    // ============================================================
    // Listar Productos
    // ============================================================

    /**
     * Obtiene la lista completa de productos disponibles.
     */
    @Get()
    @ApiOperation({
        summary: 'Listar todos los productos',
        description:
        'Devuelve un listado completo con todos los productos registrados en el sistema.',
    })
    @ApiResponse({
        status: 200,
        description: 'Lista de productos obtenida correctamente.',
        content: {
        'application/json': {
            example: {
            data: [
                {
                prod_id: 1,
                prod_nombre: 'Arena para gato 5kg',
                prod_precio: 20000,
                prod_stock: 50,
                },
                {
                prod_id: 2,
                prod_nombre: 'Juguete mordedor',
                prod_precio: 15000,
                prod_stock: 80,
                },
            ],
            },
        },
        },
    })
    findAll() {
        return this.productoService.findAll();
    }

    // ============================================================
    // Buscar Producto por ID
    // ============================================================

    /**
     * Busca un producto por su identificador único.
     */
    @Get(':id')
    @ApiOperation({
        summary: 'Obtener un producto por ID',
        description:
        'Devuelve los detalles de un producto específico según su identificador único.',
    })
    @ApiResponse({
        status: 200,
        description: 'Producto encontrado correctamente.',
        content: {
        'application/json': {
            example: {
            prod_id: 3,
            prod_nombre: 'Collar para perro',
            prod_descripcion: 'Collar ajustable de nylon con hebilla metálica',
            prod_precio: 25000,
            prod_stock: 45,
            },
        },
        },
    })
    @ApiResponse({
        status: 404,
        description: 'Producto no encontrado.',
        content: {
        'application/json': {
            example: {
            statusCode: 404,
            message: 'Producto no encontrado.',
            error: 'Not Found',
            },
        },
        },
    })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.productoService.findOne(id);
    }

    // ============================================================
    // Actualizar Producto
    // ============================================================

    /**
     * Actualiza los datos de un producto existente.
     */
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Patch(':id')
    @ApiOperation({
        summary: 'Actualizar un producto existente',
        description:
        'Permite modificar los datos de un producto registrado. Requiere autenticación JWT.',
    })
    @ApiBody({
        type: UpdateProductoDto,
        examples: {
        ejemplo: {
            summary: 'Ejemplo de actualización',
            value: {
            prod_precio: 78000,
            prod_stock: 40,
            },
        },
        },
    })
    @ApiResponse({
        status: 200,
        description: 'Producto actualizado correctamente.',
        content: {
        'application/json': {
            example: {
            message: 'Producto actualizado exitosamente.',
            data: {
                prod_id: 1,
                prod_nombre: 'Arena para gato 5kg',
                prod_precio: 78000,
                prod_stock: 40,
            },
            },
        },
        },
    })
    @ApiResponse({
        status: 404,
        description: 'Producto no encontrado.',
        content: {
        'application/json': {
            example: {
            statusCode: 404,
            message: 'Producto no encontrado.',
            error: 'Not Found',
            },
        },
        },
    })
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProductoDto) {
        return this.productoService.update(id, dto);
    }

    // ============================================================
    // Eliminar Producto
    // ============================================================

    /**
     * Elimina un producto del sistema.
     */
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Delete(':id')
    @ApiOperation({
        summary: 'Eliminar un producto',
        description:
        'Elimina de forma permanente un producto existente. Requiere autenticación JWT.',
    })
    @ApiResponse({
        status: 200,
        description: 'Producto eliminado correctamente.',
        content: {
        'application/json': {
            example: {
            message: 'Producto eliminado correctamente.',
            deletedId: 5,
            },
        },
        },
    })
    @ApiResponse({
        status: 404,
        description: 'Producto no encontrado.',
        content: {
        'application/json': {
            example: {
            statusCode: 404,
            message: 'Producto no encontrado.',
            error: 'Not Found',
            },
        },
        },
    })
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.productoService.remove(id);
    }
}
