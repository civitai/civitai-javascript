"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const JobsService_1 = require("./services/JobsService");
const OpenAPI_1 = require("./core/OpenAPI");
class Civitai {
    constructor(config) {
        OpenAPI_1.OpenAPI.HEADERS = {
            Authorization: `Bearer ${config.token}`,
        };
        this.jobs = {
            create: (input, wait = true) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                console.log(`Creating job with wait=${wait} and input=`, input, "\n");
                return yield JobsService_1.JobsService.postV1ConsumerJobs(wait, input);
            }),
            get: (jobId) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                // Implement this method
                console.log(`Fetching job status for jobId=${jobId}`);
                return yield JobsService_1.JobsService.getV1ConsumerJobs1(jobId);
            }),
        };
    }
}
module.exports = Civitai;
//# sourceMappingURL=Civitai.js.map