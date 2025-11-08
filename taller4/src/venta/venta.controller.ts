/**
 * Controlador del módulo Venta.
 *
 * Gestiona las operaciones relacionadas con las ventas realizadas en el sistema.
 * Permite registrar nuevas ventas, consultarlas, actualizarlas, eliminarlas
 * y recalcular su total en función de los detalles asociados.
 *
 * Todas las rutas están protegidas mediante autenticación JWT.
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
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBody,
    ApiParam,
} from '@nestjs/swagger';
import { VentaService } from './venta.service';
import { CreateVentaDto } from './dtos/create-venta.dto';
import { UpdateVentaDto } from './dtos/update-venta.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Ventas')
@ApiBearerAuth()
@Controller('venta')
@UseGuards(JwtAuthGuard)
export class VentaController {
    constructor(private readonly ventaService: VentaService) {}

    // ============================================================
    // Crear Venta
    // ============================================================

    /**
     * Registra una nueva venta en el sistema.
     */
    @Post()
    @ApiOperation({
        summary: 'Registrar una nueva venta',
        description:
            'Crea una nueva venta con la información del cliente y el detalle de los productos vendidos.',
    })
    @ApiBody({
        type: CreateVentaDto,
        examples: {
            exitoso: {
                summary: 'Ejemplo exitoso',
                value: {
                    cli_id: 2,
                    ven_fecha: '2025-10-30',
                    ven_total: 0, // El total puede recalcularse automáticamente
                    detalles: [
                        { prod_id: 1, cantidad: 2 },
                        { prod_id: 3, cantidad: 1 },
                    ],
                },
            },
        },
    })
    @ApiResponse({
        status: 201,
        description: 'Venta registrada exitosamente.',
        content: {
            'application/json': {
                example: {
                    message: 'Venta creada correctamente.',
                    data: {
                        ven_id: 10,
                        cli_id: 2,
                        ven_fecha: '2025-10-30',
                        ven_total: 45000,
                    },
                },
            },
        },
    })
    create(@Body() dto: CreateVentaDto) {
        return this.ventaService.create(dto);
    }

    // ============================================================
    // Listar Ventas
    // ============================================================

    /**
     * Obtiene la lista completa de todas las ventas registradas.
     */
    @Get()
    @ApiOperation({
        summary: 'Listar todas las ventas',
        description:
            'Devuelve un listado completo con la información de todas las ventas registradas en el sistema.',
    })
    @ApiResponse({
        status: 200,
        description: 'Lista de ventas obtenida correctamente.',
        content: {
            'application/json': {
                example: {
                    data: [
                        {
                            ven_id: 1,
                            cli_id: 2,
                            ven_fecha: '2025-10-30',
                            ven_total: 45000,
                        },
                        {
                            ven_id: 2,
                            cli_id: 3,
                            ven_fecha: '2025-10-29',
                            ven_total: 38000,
                        },
                    ],
                },
            },
        },
    })
    findAll() {
        return this.ventaService.findAll();
    }

    // ============================================================
    // Obtener Venta por ID
    // ============================================================

    /**
     * Devuelve la información completa de una venta según su ID.
     */
    @Get(':id')
    @ApiOperation({
        summary: 'Obtener una venta por ID',
        description:
            'Devuelve los datos completos de una venta, incluyendo cliente y productos vendidos.',
    })
    @ApiParam({ name: 'id', type: Number, description: 'ID de la venta a consultar' })
    @ApiResponse({
        status: 200,
        description: 'Venta encontrada correctamente.',
        content: {
            'application/json': {
                example: {
                    ven_id: 1,
                    cli_id: 2,
                    ven_fecha: '2025-10-30',
                    ven_total: 45000,
                    detalles: [
                        {
                            prod_id: 1,
                            prod_nombre: 'Collar antipulgas',
                            cantidad: 2,
                            subtotal: 30000,
                        },
                        {
                            prod_id: 3,
                            prod_nombre: 'Juguete de cuerda',
                            cantidad: 1,
                            subtotal: 15000,
                        },
                    ],
                },
            },
        },
    })
    @ApiResponse({
        status: 404,
        description: 'Venta no encontrada.',
        content: {
            'application/json': {
                example: {
                    statusCode: 404,
                    message: 'Venta no encontrada.',
                    error: 'Not Found',
                },
            },
        },
    })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.ventaService.findOne(id);
    }

    // ============================================================
    // Actualizar Venta
    // ============================================================

    /**
     * Actualiza los datos de una venta existente.
     */
    @Patch(':id')
    @ApiOperation({
        summary: 'Actualizar datos de una venta',
        description:
            'Permite modificar información básica de una venta, como el cliente o los detalles de productos.',
    })
    @ApiBody({
        type: UpdateVentaDto,
        examples: {
            ejemplo: {
                summary: 'Ejemplo de actualización',
                value: {
                    cli_id: 5,
                    ven_fecha: '2025-11-01',
                },
            },
        },
    })
    @ApiResponse({
        status: 200,
        description: 'Venta actualizada correctamente.',
        content: {
            'application/json': {
                example: {
                    message: 'Venta actualizada exitosamente.',
                    data: {
                        ven_id: 1,
                        cli_id: 5,
                        ven_fecha: '2025-11-01',
                        ven_total: 45000,
                    },
                },
            },
        },
    })
    @ApiResponse({
        status: 404,
        description: 'Venta no encontrada.',
        content: {
            'application/json': {
                example: {
                    statusCode: 404,
                    message: 'Venta no encontrada.',
                    error: 'Not Found',
                },
            },
        },
    })
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateVentaDto) {
        return this.ventaService.update(id, dto);
    }

    // ============================================================
    // Eliminar Venta
    // ============================================================

    /**
     * Elimina una venta del sistema.
     */
    @Delete(':id')
    @ApiOperation({
        summary: 'Eliminar una venta',
        description:
            'Elimina de forma permanente una venta del sistema mediante su ID.',
    })
    @ApiResponse({
        status: 200,
        description: 'Venta eliminada correctamente.',
        content: {
            'application/json': {
                example: {
                    message: 'Venta eliminada exitosamente.',
                    deletedId: 1,
                },
            },
        },
    })
    @ApiResponse({
        status: 404,
        description: 'Venta no encontrada.',
        content: {
            'application/json': {
                example: {
                    statusCode: 404,
                    message: 'Venta no encontrada.',
                    error: 'Not Found',
                },
            },
        },
    })
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.ventaService.remove(id);
    }

    // ============================================================
    // Recalcular Total
    // ============================================================

    /**
     * Recalcula el total de una venta en función de los detalles asociados.
     */
    @Patch(':id/recalcular')
    @ApiOperation({
        summary: 'Recalcular el total de una venta',
        description:
            'Recalcula automáticamente el total de una venta tomando en cuenta los precios actuales de los productos y sus cantidades.',
    })
    @ApiParam({ name: 'id', type: Number, description: 'ID de la venta a recalcular' })
    @ApiResponse({
        status: 200,
        description: 'Total recalculado correctamente.',
        content: {
            'application/json': {
                example: {
                    message: 'Total de la venta recalculado exitosamente.',
                    data: {
                        ven_id: 1,
                        ven_total: 47000,
                    },
                },
            },
        },
    })
    @ApiResponse({
        status: 404,
        description: 'Venta no encontrada.',
        content: {
            'application/json': {
                example: {
                    statusCode: 404,
                    message: 'Venta no encontrada.',
                    error: 'Not Found',
                },
            },
        },
    })
    recalcular(@Param('id', ParseIntPipe) id: number) {
        return this.ventaService.recalcularTotal(id);
    }
}
