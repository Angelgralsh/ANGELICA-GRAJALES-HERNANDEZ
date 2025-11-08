/**
 * Pruebas unitarias para el controlador principal (AppController).
 *
 * Objetivo:
 * - Validar que el controlador se inicializa correctamente.
 * - Verificar que el endpoint raíz (`GET /`) devuelve la estructura esperada.
 *
 * Se utilizan mocks del servicio (AppService) para aislar el comportamiento del controlador.
 */

import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: { getHello: jest.fn().mockReturnValue('API funcionando correctamente 🚀') },
        },
      ],
    }).compile();

    appController = moduleRef.get<AppController>(AppController);
    appService = moduleRef.get<AppService>(AppService);
  });

  describe('getHello()', () => {
    it('debería retornar un objeto con message, status y timestamp', () => {
      const response = appController.getHello();

      expect(response).toHaveProperty('message', 'API funcionando correctamente 🚀');
      expect(response).toHaveProperty('status', 'ok');
      expect(response).toHaveProperty('timestamp');
      expect(typeof response.timestamp).toBe('string');
    });

    it('debería llamar a AppService.getHello una vez', () => {
      appController.getHello();
      expect(appService.getHello).toHaveBeenCalledTimes(1);
    });
  });
});
