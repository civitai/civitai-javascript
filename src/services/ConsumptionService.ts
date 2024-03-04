/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ConsumptionDetails } from '../models/ConsumptionDetails';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ConsumptionService {
    /**
     * @param startDate
     * @param endDate
     * @returns ConsumptionDetails Success
     * @throws ApiError
     */
    public static getV1ConsumerConsumption(
        startDate?: string,
        endDate?: string,
    ): CancelablePromise<ConsumptionDetails> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/consumer/consumption',
            query: {
                'startDate': startDate,
                'endDate': endDate,
            },
        });
    }
}
