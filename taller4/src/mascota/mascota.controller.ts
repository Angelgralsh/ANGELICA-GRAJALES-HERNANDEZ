/**
 * Controlador del módulo Mascota.
 *
 * Gestiona las operaciones CRUD de las mascotas registradas en el sistema,
 * permitiendo crear, consultar, actualizar y eliminar mascotas.
 * También permite obtener las mascotas asociadas a un cliente específico.
 *
 * Todas las rutas requieren autenticación mediante JWT.
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
} from '@nestjs/swagger';
import { MascotaService } from './mascota.service';
import { CreateMascotaDto } from './dtos/create-mascota.dto';
import { UpdateMascotaDto } from './dtos/update-mascota.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Mascotas')
@ApiBearerAuth()
@Controller('mascota')
@UseGuards(JwtAuthGuard)
export class MascotaController {
    constructor(private readonly mascotaService: MascotaService) {}

    // ============================================================
    // Crear Mascota
    // ============================================================

    /**
     * Crea una nueva mascota y la asocia a un cliente existente.
     */
    @Post()
    @ApiOperation({
        summary: 'Registrar una nueva mascota',
        description:
        'Permite registrar una nueva mascota en el sistema y asociarla a un cliente mediante su ID.',
    })
    @ApiBody({
        type: CreateMascotaDto,
        examples: {
        exitoso: {
            summary: 'Ejemplo exitoso',
            value: {
            mascota_nombre: 'Firulais',
            mascota_especie: 'Perro',
            mascota_raza: 'Labrador',
            mascota_edad: 3,
            cli_id: 1,
            },
        },
        error: {
            summary: 'Ejemplo con datos inválidos',
            value: {
            mascota_nombre: '',
            mascota_especie: 'Perro',
            cli_id: null,
            },
        },
        },
    })
    @ApiResponse({
        status: 201,
        description: 'Mascota registrada exitosamente.',
        content: {
        'application/json': {
            example: {
            message: 'Mascota creada correctamente.',
            data: {
                mascota_id: 10,
                mascota_nombre: 'Firulais',
                mascota_especie: 'Perro',
                mascota_raza: 'Labrador',
                mascota_edad: 3,
                cli_id: 1,
            },
            },
        },
        },
    })
    @ApiResponse({
        status: 400,
        description: 'Datos inválidos o cliente no encontrado.',
        content: {
        'application/json': {
            example: {
            statusCode: 400,
            message: 'El cliente especificado no existe.',
            error: 'Bad Request',
            },
        },
        },
    })
    create(@Body() createMascotaDto: CreateMascotaDto) {
        return this.mascotaService.create(createMascotaDto);
    }

    // ============================================================
    // Listar Todas las Mascotas
    // ============================================================

    /**
     * Obtiene una lista completa de todas las mascotas registradas.
     */
    @Get()
    @ApiOperation({
        summary: 'Listar todas las mascotas',
        description:
        'Devuelve una lista con todas las mascotas registradas en el sistema.',
    })
    @ApiResponse({
        status: 200,
        description: 'Lista de mascotas obtenida correctamente.',
        content: {
        'application/json': {
            example: {
            data: [
                {
                mascota_id: 1,
                mascota_nombre: 'Firulais',
                mascota_especie: 'Perro',
                mascota_raza: 'Labrador',
                mascota_edad: 3,
                cliente: { cli_nombre: 'Carlos Gómez' },
                },
                {
                mascota_id: 2,
                mascota_nombre: 'Misu',
                mascota_especie: 'Gato',
                mascota_raza: 'Persa',
                mascota_edad: 2,
                cliente: { cli_nombre: 'Andrea López' },
                },
            ],
            },
        },
        },
    })
    findAll() {
        return this.mascotaService.findAll();
    }

    // ============================================================
    // Mascotas por Cliente
    // ============================================================

    /**
     * Obtiene todas las mascotas asociadas a un cliente específico.
     */
    @Get('cliente/:clienteId')
    @ApiOperation({
        summary: 'Listar mascotas de un cliente',
        description:
        'Permite obtener todas las mascotas registradas que pertenecen a un cliente específico.',
    })
    @ApiResponse({
        status: 200,
        description: 'Lista de mascotas del cliente obtenida correctamente.',
        content: {
        'application/json': {
            example: {
            cliente_id: 1,
            mascotas: [
                {
                mascota_id: 3,
                mascota_nombre: 'Rocky',
                mascota_especie: 'Perro',
                mascota_raza: 'Pitbull',
                mascota_edad: 4,
                },
                {
                mascota_id: 5,
                mascota_nombre: 'Luna',
                mascota_especie: 'Gato',
                mascota_raza: 'Siamés',
                mascota_edad: 1,
                },
            ],
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
            message: 'Cliente no encontrado.',
            error: 'Not Found',
            },
        },
        },
    })
    findByCliente(@Param('clienteId', ParseIntPipe) clienteId: number) {
        return this.mascotaService.findByCliente(clienteId);
    }

    // ============================================================
    // Buscar Mascota por ID
    // ============================================================

    /**
     * Obtiene la información de una mascota según su ID único.
     */
    @Get(':id')
    @ApiOperation({
        summary: 'Obtener una mascota por ID',
        description:
        'Devuelve los detalles completos de una mascota registrada mediante su identificador único.',
    })
    @ApiResponse({
        status: 200,
        description: 'Mascota encontrada correctamente.',
        content: {
        'application/json': {
            example: {
            mascota_id: 1,
            mascota_nombre: 'Milo',
            mascota_especie: 'Perro',
            mascota_raza: 'Beagle',
            mascota_edad: 2,
            cliente: { cli_id: 1, cli_nombre: 'Carlos Gómez' },
            },
        },
        },
    })
    @ApiResponse({
        status: 404,
        description: 'Mascota no encontrada.',
        content: {
        'application/json': {
            example: {
            statusCode: 404,
            message: 'Mascota no encontrada.',
            error: 'Not Found',
            },
        },
        },
    })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.mascotaService.findOne(id);
    }

    // ============================================================
    // Actualizar Mascota
    // ============================================================

    /**
     * Actualiza la información de una mascota existente.
     */
    @Patch(':id')
    @ApiOperation({
        summary: 'Actualizar datos de una mascota',
        description:
        'Permite modificar los datos de una mascota ya registrada (nombre, especie, edad, etc.).',
    })
    @ApiBody({
        type: UpdateMascotaDto,
        examples: {
        ejemplo: {
            summary: 'Ejemplo de actualización',
            value: {
            mascota_nombre: 'Rocky Jr.',
            mascota_edad: 5,
            },
        },
        },
    })
    @ApiResponse({
        status: 200,
        description: 'Mascota actualizada correctamente.',
        content: {
        'application/json': {
            example: {
            message: 'Mascota actualizada exitosamente.',
            data: {
                mascota_id: 1,
                mascota_nombre: 'Rocky Jr.',
                mascota_especie: 'Perro',
                mascota_raza: 'Pitbull',
                mascota_edad: 5,
            },
            },
        },
        },
    })
    @ApiResponse({
        status: 404,
        description: 'Mascota no encontrada.',
        content: {
        'application/json': {
            example: {
            statusCode: 404,
            message: 'Mascota no encontrada.',
            error: 'Not Found',
            },
        },
        },
    })
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateMascotaDto: UpdateMascotaDto,
    ) {
        return this.mascotaService.update(id, updateMascotaDto);
    }

    // ============================================================
    // Eliminar Mascota
    // ============================================================

    /**
     * Elimina una mascota del sistema.
     */
    @Delete(':id')
    @ApiOperation({
        summary: 'Eliminar una mascota',
        description:
        'Elimina una mascota del sistema de forma permanente según su identificador único.',
    })
    @ApiResponse({
        status: 200,
        description: 'Mascota eliminada correctamente.',
        content: {
        'application/json': {
            example: {
            message: 'Mascota eliminada exitosamente.',
            deletedId: 1,
            },
        },
        },
    })
    @ApiResponse({
        status: 404,
        description: 'Mascota no encontrada.',
        content: {
        'application/json': {
            example: {
            statusCode: 404,
            message: 'Mascota no encontrada.',
            error: 'Not Found',
            },
        },
        },
    })
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.mascotaService.remove(id);
    }
}
