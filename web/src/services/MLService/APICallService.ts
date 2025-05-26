import { APIResponse } from "./APIResponse";
export class APICallService extends APIResponse {
  async get<T>(path: string, headers?: Record<string, string>): Promise<T> {
    const res = await super.getResponse<T>(path, headers);
    const data = res.data;
    return data;
  }

  async post<T>(
    path: string,
    data: any,
    headers?: Record<string, string>
  ): Promise<T> {
    const res = await super.postResponse<T>(path, data, headers);
    return res.data;
  }

  async put<T>(
    path: string,
    data: any,
    headers?: Record<string, string>
  ): Promise<T> {
    const res = await super.putResponse<T>(path, data, headers);
    return res.data;
  }

  async delete<T>(path: string, headers?: Record<string, string>): Promise<T> {
    const res = await super.deleteResponse<T>(path, headers);
    return res.data;
  }

  async uploadFile<T>(
    path: string,
    formData: FormData,
    headers?: Record<string, string>
  ): Promise<T> {
    const res = await super.uploadFileResponse<T>(path, formData, headers);
    return res.data;
  }
}
