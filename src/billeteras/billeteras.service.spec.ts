import { Test, TestingModule } from "@nestjs/testing";
import { BilleterasService } from "./billeteras.service";

describe("BilleterasService", () => {
    let service: BilleterasService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BilleterasService],
        }).compile();

        service = module.get<BilleterasService>(BilleterasService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
