import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
    let service: AppService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        providers: [AppService],
        }).compile();

        service = module.get<AppService>(AppService);
    });

    it('debería estar definido', () => {
        expect(service).toBeDefined();
    });

    it('debería retornar "Holiii 😎!"', () => {
        const result = service.getHello();
        expect(result).toBe('Holiii 😎!');
    });
});
