import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

/* eslint-disable @typescript-eslint/no-empty-interface */
export interface Requestonfig extends AxiosRequestConfig {}
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Response<T = any> extends AxiosResponse<T> {}

export class Request {
  constructor(private request = axios) {}

  public get<T>(url: string, config: Requestonfig = {}): Promise<Response<T>> {
    return this.request.get<T, Response<T>>(url, config);
  }

  public static isRequestError(error: AxiosError): boolean {
    return !!(error.response && error.response.status);
  }
}
