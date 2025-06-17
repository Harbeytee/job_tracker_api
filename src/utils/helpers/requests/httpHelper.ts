import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export class HttpHelper {
  static async get<T = unknown>(
    url: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return await axios.get<T>(url, options);
  }

  static async post<T = unknown, D = unknown>(
    url: string,
    data?: D,
    options?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<T>> {
    return await axios.post<T, AxiosResponse<T>, D>(url, data, options);
  }

  static async put<T = unknown, D = unknown>(
    url: string,
    data?: D,
    options?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<T>> {
    return await axios.put<T, AxiosResponse<T>, D>(url, data, options);
  }

  static async delete<T = unknown>(
    url: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return await axios.delete<T>(url, options);
  }
}
