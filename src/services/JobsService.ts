/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JobStatusCollection } from "../models/JobStatusCollection";
import type { JobTemplateList } from "../models/JobTemplateList";
import type { ProblemDetails } from "../models/ProblemDetails";
import type { QueryJobsRequest } from "../models/QueryJobsRequest";
import type { QueryJobsResult } from "../models/QueryJobsResult";
import type { TaintJobRequest } from "../models/TaintJobRequest";
import type { TaintJobsRequest } from "../models/TaintJobsRequest";
import type { TaintJobsResult } from "../models/TaintJobsResult";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class JobsService {
  /**
   * Submits a new job for processing
   * Sample request:
   *
   * POST /v1/consumer/jobs
   * {
   * "$type": "textToImage",
   * "model": "urn:air:sdxl:model:civitai:4201@130072",
   * "params": {
   * "prompt": "A cat",
   * "negativePrompt": "A dog",
   * "scheduler": "EulerA",
   * "steps": 30,
   * "cfgScale": 10,
   * "width": 1216,
   * "height": 832,
   * "seed": -1,
   * "clipSkip": 1
   * },
   * "additionalNetworks": {
   * "civitai:58390@62833": {
   * "type": "Lora",
   * "strength": 1
   * }
   * },
   * "quantity": 1,
   * "priority": {
   * "min": 2,
   * "max": 8
   * }
   * }
   * @param wait Whether to wait for the job to complete before returning or to return immediatly
   * The request may return a 202 if the clients waits for the job to complete and the job does not complete within the requested timeout.
   * In which case the client should use the token to query the status of the job.
   * @param requestBody
   * @returns JobStatusCollection Success
   * @returns ProblemDetails Error
   * @returns any Accepted
   * @throws ApiError
   */
  public static postV1ConsumerJobs(
    wait?: boolean,
    requestBody?: JobTemplateList
  ): CancelablePromise<JobStatusCollection | ProblemDetails | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/v1/consumer/jobs",
      query: {
        wait: wait,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `Bad Request`,
      },
    });
  }
  /**
   * Get the status of a previous submitted request by looking up the token
   * @param token The token that got returned as a result of submitting a requeset
   * @param wait Whether to wait for the job to complete before returning or to return immediatly
   * The request may return a 202 if the clients waits for the job to complete and the job does not complete within the requested timeout.
   * In which case the client should use the token to query the status of the job.
   * @returns JobStatusCollection Success
   * @throws ApiError
   */
  public static getV1ConsumerJobs(
    token: string,
    wait?: boolean
  ): CancelablePromise<JobStatusCollection> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/v1/consumer/jobs",
      query: {
        token: token,
        wait: wait,
      },
      errors: {
        400: `Bad Request`,
      },
    });
  }
  /**
   * Taint all jobs that match particular properties or belong to a token
   * @param token
   * @param requestBody
   * @returns TaintJobsResult Success
   * @returns ProblemDetails Error
   * @throws ApiError
   */
  public static putV1ConsumerJobs(
    token?: string,
    requestBody?: TaintJobsRequest
  ): CancelablePromise<TaintJobsResult | ProblemDetails> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/v1/consumer/jobs",
      query: {
        token: token,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `Bad Request`,
      },
    });
  }
  /**
   * Cancel all jobs associated with a token
   * @param token The token that was returned when requesting jobs
   * @param force Force cancellation of jobs, even when jobs are currently being worked on
   * @returns any Success
   * @returns ProblemDetails Error
   * @throws ApiError
   */
  public static deleteV1ConsumerJobs(
    token: string,
    force: boolean = true
  ): CancelablePromise<any | ProblemDetails> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/v1/consumer/jobs",
      query: {
        token: token,
        force: force,
      },
      errors: {
        404: `Not Found`,
      },
    });
  }
  /**
   * Get the status of a job by looking up the jobId
   * @param jobId
   * @param token
   * @returns JobStatusCollection Success
   * @throws ApiError
   */
  public static getV1ConsumerJobs1(
    jobId: string,
    token?: string
  ): CancelablePromise<JobStatusCollection> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/v1/consumer/jobs/{jobId}",
      path: {
        jobId: jobId,
      },
      query: {
        token: token,
      },
      errors: {
        400: `Bad Request`,
      },
    });
  }
  /**
   * Taint a specific job by its id
   * @param jobId
   * @param requestBody
   * @returns any Success
   * @returns ProblemDetails Error
   * @throws ApiError
   */
  public static putV1ConsumerJobs1(
    jobId: string,
    requestBody?: TaintJobRequest
  ): CancelablePromise<any | ProblemDetails> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/v1/consumer/jobs/{jobId}",
      path: {
        jobId: jobId,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        404: `Not Found`,
      },
    });
  }
  /**
   * Cancels a specific job by looking it up by jobId
   * @param jobId The id of the job to cancel
   * @param force Force cancellation, even when the job is currently being worked on
   * @returns any Success
   * @returns ProblemDetails Error
   * @throws ApiError
   */
  public static deleteV1ConsumerJobs1(
    jobId: string,
    force: boolean = true
  ): CancelablePromise<any | ProblemDetails> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/v1/consumer/jobs/{jobId}",
      path: {
        jobId: jobId,
      },
      query: {
        force: force,
      },
      errors: {
        404: `Not Found`,
      },
    });
  }
  /**
   * Query for previously submitted jobs by looking up the properties
   * @param requestBody
   * @returns QueryJobsResult Success
   * @throws ApiError
   */
  public static postV1ConsumerJobsQuery(
    requestBody?: QueryJobsRequest
  ): CancelablePromise<QueryJobsResult> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/v1/consumer/jobs/query",
      body: requestBody,
      mediaType: "application/json",
    });
  }
}
