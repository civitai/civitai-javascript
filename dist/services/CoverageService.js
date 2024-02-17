"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoverageService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class CoverageService {
    /**
     * Get coverage of particular models
     * @param model
     * @returns ProviderAssetAvailability Success
     * @throws ApiError
     */
    static getV1ConsumerCoverage(model) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/consumer/coverage',
            query: {
                'model': model,
            },
        });
    }
}
exports.CoverageService = CoverageService;
//# sourceMappingURL=CoverageService.js.map