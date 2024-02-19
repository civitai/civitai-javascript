/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JobStatus } from "./JobStatus";
export type JobStatusCollection = {
  /**
   * A token that can be used to get a status update on all the jobs in the collection
   */
  token?: string | null;
  /**
   * A list of individual statuses for each generated job
   */
  jobs?: Array<JobStatus>;
};
