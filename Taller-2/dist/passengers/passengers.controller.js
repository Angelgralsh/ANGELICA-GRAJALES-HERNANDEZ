"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PassengersController = void 0;
const common_1 = require("@nestjs/common");
const create_passenger_dto_1 = require("./dto/create-passenger.dto");
const add_loyalty_dto_1 = require("./dto/add-loyalty.dto");
let PassengersController = class PassengersController {
    list() {
        return { message: 'Passengers list', data: [] };
    }
    get(id) {
        return { message: 'Passenger detail', data: { id } };
    }
    create(dto) {
        return { message: 'Passenger created', data: dto };
    }
    addLoyalty(id, dto) {
        return { message: 'Loyalty points added', data: { id, points: dto.points } };
    }
};
exports.PassengersController = PassengersController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PassengersController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PassengersController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_passenger_dto_1.CreatePassengerDto]),
    __metadata("design:returntype", void 0)
], PassengersController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/loyalty'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, add_loyalty_dto_1.AddLoyaltyDto]),
    __metadata("design:returntype", void 0)
], PassengersController.prototype, "addLoyalty", null);
exports.PassengersController = PassengersController = __decorate([
    (0, common_1.Controller)('passengers')
], PassengersController);
//# sourceMappingURL=passengers.controller.js.map