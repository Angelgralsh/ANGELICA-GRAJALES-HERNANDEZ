/**
 * Módulo raíz de la aplicación
 * Define la estructura modular del sistema de gestión de aerolínea
 */

import { Module } from '@nestjs/common';
import { FlightsModule } from './flights/flights.module';
import { PassengersModule } from './passengers/passengers.module';
import { BookingsModule } from './bookings/bookings.module';
import { AirportsModule } from './airports/airports.module';

/**
 * AppModule - Módulo principal que organiza todos los módulos de la aplicación
 * 
 * Este es el módulo raíz que NestJS usa para arrancar la aplicación.
 * Importa todos los módulos funcionales del sistema:
 * - FlightsModule: Gestión de vuelos
 * - PassengersModule: Gestión de pasajeros
 * - BookingsModule: Gestión de reservas
 * - AirportsModule: Gestión de aeropuertos
 */
@Module({
  imports: [FlightsModule, PassengersModule, BookingsModule, AirportsModule],
})
export class AppModule {}
