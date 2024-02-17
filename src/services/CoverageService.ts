/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AIR } from '../models/AIR';
import type { ProviderAssetAvailability } from '../models/ProviderAssetAvailability';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CoverageService {
    /**
     * Get coverage of particular models
     * @param model
     * @returns ProviderAssetAvailability Success
     * @throws ApiError
     */
    public static getV1ConsumerCoverage(
        model: Array<AIR>,
    ): CancelablePromise<Record<string, ProviderAssetAvailability>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/consumer/coverage',
            query: {
                'model': model,
            },
        });
    }
}
