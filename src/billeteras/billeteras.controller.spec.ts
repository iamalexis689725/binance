import { Test, TestingModule } from "@nestjs/testing";
import { BilleterasController } from "./billeteras.controller";
import { BilleterasService } from "./billeteras.service";

describe("BilleterasController", () => {
    let controller: BilleterasController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [BilleterasController],
            providers: [BilleterasService],
        }).compile();

        controller = module.get<BilleterasController>(BilleterasController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
