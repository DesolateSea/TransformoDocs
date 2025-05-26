import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export interface APIConfig {
  defaultHeaders?: Record<string, string>;
  timeoutMs?: number;
  maxRetries?: number;
}

export class APIResponse {
  private axiosInstance: AxiosInstance;
  private maxRetries: number;

  constructor(config?: APIConfig) {
    const baseURL = import.meta.env.VITE_REACT_APP_BACKWEB;

    this.maxRetries = config?.maxRetries ?? 10;

    this.axiosInstance = axios.create({
      baseURL,
      timeout: config?.timeoutMs ?? 10000,
      headers: config?.defaultHeaders ?? {},
    });

    // Optional: Add interceptors for logging, auth, etc.
  }

  private async request<T>(
    method: string,
    path: string,
    data?: any,
    headers?: Record<string, string>,
    isFormData = false
  ): Promise<AxiosResponse<T>> {
    let retries = 0;

    const config: AxiosRequestConfig = {
      method,
      url: path,
      headers: {
        ...headers,
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
      },
      data: isFormData ? data : data ? JSON.stringify(data) : undefined,
    };

    while (retries <= this.maxRetries) {
      try {
        const response: AxiosResponse<T> = await this.axiosInstance.request<T>(
          config
        );
        return response;
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data || error.message;
          if (retries < this.maxRetries) {
            retries++;
            console.warn(`Retrying (${retries}/${this.maxRetries})...`);
            await this.delay(500 * retries);
          } else {
            throw new Error(`Request failed: ${message}`);
          }
        } else {
          throw error;
        }
      }
    }

    throw new Error("Request failed after retries.");
  }

  private delay(ms: number) {
    return new Promise((res) => setTimeout(res, ms));
  }

  getResponse<T>(path: string, headers?: Record<string, string>) {
    return this.request<T>("GET", path, undefined, headers);
  }

  postResponse<T>(path: string, data: any, headers?: Record<string, string>) {
    return this.request<T>("POST", path, data, headers);
  }

  putResponse<T>(path: string, data: any, headers?: Record<string, string>) {
    return this.request<T>("PUT", path, data, headers);
  }

  deleteResponse<T>(path: string, headers?: Record<string, string>) {
    return this.request<T>("DELETE", path, undefined, headers);
  }

  uploadFileResponse<T>(
    path: string,
    formData: FormData,
    headers?: Record<string, string>
  ) {
    return this.request<T>("POST", path, formData, headers, true);
  }
}
