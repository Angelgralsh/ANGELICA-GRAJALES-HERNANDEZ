/**
 * Controlador del módulo DetalleFactura.
 * 
 * Gestiona las operaciones CRUD de los detalles de facturas (líneas de productos dentro de una venta).
 * 
 * Cada detalle representa un producto o servicio asociado a una factura.
 * 
 * Algunas rutas están protegidas con autenticación JWT.
 */

import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
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
import { DetalleFacturaService } from './detalle-factura.service';
import { CreateDetalleFacturaDto } from './dtos/create-detalle-factura.dto';
import { UpdateDetalleFacturaDto } from './dtos/update-detalle-factura.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Detalles de Factura')
@ApiBearerAuth()
@Controller('detalle-factura')
export class DetalleFacturaController {
    constructor(private readonly detalleService: DetalleFacturaService) {}

    // ============================================================
    // Crear Detalle de Factura
    // ============================================================

    /**
     * Crea un nuevo detalle de factura (línea de producto).
     * 
     * Requiere autenticación mediante JWT.
     */
    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiOperation({
        summary: 'Crear un nuevo detalle de factura',
        description: 'Permite registrar un producto o servicio dentro de una factura existente.',
    })
    @ApiBody({
        type: CreateDetalleFacturaDto,
        examples: {
        exitoso: {
            summary: 'Ejemplo exitoso',
            value: {
            factura_id: 1,
            producto_id: 5,
            cantidad: 2,
            precio_unitario: 15000,
            },
        },
        invalido: {
            summary: 'Ejemplo con datos inválidos',
            value: {
            factura_id: null,
            producto_id: 5,
            cantidad: -3,
            precio_unitario: 0,
            },
        },
        },
    })
    @ApiResponse({
        status: 201,
        description: 'Detalle de factura creado correctamente.',
        content: {
        'application/json': {
            example: {
            message: 'Detalle de factura registrado exitosamente.',
            data: {
                detalle_id: 10,
                factura_id: 1,
                producto_id: 5,
                cantidad: 2,
                precio_unitario: 15000,
                subtotal: 30000,
                creado_en: '2025-10-30T20:10:45.000Z',
            },
            },
        },
        },
    })
    @ApiResponse({
        status: 400,
        description: 'Datos inválidos o factura inexistente.',
        content: {
        'application/json': {
            example: {
            statusCode: 400,
            message: 'La factura especificada no existe.',
            error: 'Bad Request',
            },
        },
        },
    })
    create(@Body() dto: CreateDetalleFacturaDto) {
        return this.detalleService.create(dto);
    }

    // ============================================================
    // Obtener Todos los Detalles
    // ============================================================

    /**
     * Lista todos los detalles de factura registrados en el sistema.
     */
    @Get()
    @ApiOperation({
        summary: 'Obtener todos los detalles de factura',
        description: 'Devuelve una lista con todos los detalles registrados, incluyendo productos y cantidades.',
    })
    @ApiResponse({
        status: 200,
        description: 'Lista de detalles obtenida correctamente.',
        content: {
        'application/json': {
            example: {
            data: [
                {
                detalle_id: 1,
                factura_id: 1,
                producto_id: 3,
                cantidad: 1,
                precio_unitario: 25000,
                subtotal: 25000,
                },
                {
                detalle_id: 2,
                factura_id: 1,
                producto_id: 4,
                cantidad: 2,
                precio_unitario: 15000,
                subtotal: 30000,
                },
            ],
            },
        },
        },
    })
    findAll() {
        return this.detalleService.findAll();
    }

    // ============================================================
    // Obtener Detalle por ID
    // ============================================================

    /**
     * Obtiene la información de un detalle de factura específico.
     */
    @Get(':id')
    @ApiOperation({
        summary: 'Obtener detalle de factura por ID',
        description: 'Devuelve los datos de un detalle específico según su identificador único.',
    })
    @ApiResponse({
        status: 200,
        description: 'Detalle encontrado correctamente.',
        content: {
        'application/json': {
            example: {
            detalle_id: 2,
            factura_id: 1,
            producto_id: 4,
            cantidad: 2,
            precio_unitario: 15000,
            subtotal: 30000,
            },
        },
        },
    })
    @ApiResponse({
        status: 404,
        description: 'Detalle no encontrado.',
        content: {
        'application/json': {
            example: {
            statusCode: 404,
            message: 'Detalle de factura no encontrado.',
            error: 'Not Found',
            },
        },
        },
    })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.detalleService.findOne(id);
    }

    // ============================================================
    // Actualizar Detalle
    // ============================================================

    /**
     * Actualiza los datos de un detalle de factura existente.
     * 
     * Requiere autenticación JWT.
     */
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    @ApiOperation({
        summary: 'Actualizar detalle de factura',
        description: 'Permite modificar la cantidad o el precio unitario de un producto dentro de una factura.',
    })
    @ApiBody({
        type: UpdateDetalleFacturaDto,
        examples: {
        ejemplo: {
            summary: 'Ejemplo de actualización',
            value: {
            cantidad: 3,
            precio_unitario: 14000,
            },
        },
        },
    })
    @ApiResponse({
        status: 200,
        description: 'Detalle actualizado correctamente.',
        content: {
        'application/json': {
            example: {
            message: 'Detalle de factura actualizado exitosamente.',
            data: {
                detalle_id: 2,
                factura_id: 1,
                producto_id: 4,
                cantidad: 3,
                precio_unitario: 14000,
                subtotal: 42000,
            },
            },
        },
        },
    })
    @ApiResponse({
        status: 404,
        description: 'Detalle no encontrado.',
        content: {
        'application/json': {
            example: {
            statusCode: 404,
            message: 'Detalle de factura no encontrado.',
            error: 'Not Found',
            },
        },
        },
    })
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateDetalleFacturaDto) {
        return this.detalleService.update(id, dto);
    }

    // ============================================================
    // Eliminar Detalle
    // ============================================================

    /**
     * Elimina un detalle de factura por su identificador.
     * 
     * Requiere autenticación JWT.
     */
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiOperation({
        summary: 'Eliminar detalle de factura',
        description: 'Permite eliminar una línea de producto asociada a una factura.',
    })
    @ApiResponse({
        status: 200,
        description: 'Detalle eliminado correctamente.',
        content: {
        'application/json': {
            example: {
            message: 'Detalle eliminado exitosamente.',
            deletedId: 2,
            },
        },
        },
    })
    @ApiResponse({
        status: 404,
        description: 'Detalle no encontrado.',
        content: {
        'application/json': {
            example: {
            statusCode: 404,
            message: 'No se encontró el detalle de factura.',
            error: 'Not Found',
            },
        },
        },
    })
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.detalleService.remove(id);
    }
}
