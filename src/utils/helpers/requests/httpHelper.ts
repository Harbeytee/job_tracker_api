import axios, { AxiosRequestConfig } from "axios";

export class HttpHelper {
  static async get(url: string, options?: AxiosRequestConfig): Promise<any> {
    return await axios.get(url, options);
  }

  static async post(
    url: string,
    data?: any,
    options?: AxiosRequestConfig
  ): Promise<any> {
    return await axios.post(url, data, options);
  }

  static async put(
    url: string,
    data?: any,
    options?: AxiosRequestConfig
  ): Promise<any> {
    return await axios.put(url, data, options);
  }

  static async delete(url: string, options?: AxiosRequestConfig): Promise<any> {
    return await axios.delete(url, options);
  }
}
