import axios, {
	type AxiosInstance,
	type AxiosRequestConfig,
	type Method,
} from 'axios';
import type { BaseResponse } from './dto';

const API_BASE_URL =
	import.meta.env.VITE_API_URL ??
	'http://localhost:8080';

const defaultConfig: AxiosRequestConfig = {
	baseURL: API_BASE_URL,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
	timeout: 15000,
};

class ApiClient {
	private readonly client: AxiosInstance;

	constructor(config?: AxiosRequestConfig) {
		this.client = axios.create({
			...defaultConfig,
			...config,
		});
	}

	private async request<TResponse, TPayload = unknown>(
		method: Method,
		url: string,
		payload?: TPayload,
		config?: AxiosRequestConfig,
	): Promise<BaseResponse<TResponse>> {
		try {
			const response = await this.client.request<
				BaseResponse<TResponse>
			>({
				method,
				url,
				data: payload,
				...config,
			});

			return response.data;
		} catch (error) {
			return Promise.reject(this.toBaseResponseError(error));
		}
	}

	private toBaseResponseError(error: unknown): BaseResponse<never> {
		if (axios.isAxiosError(error)) {
			if (error.response?.data) {
				return error.response.data as BaseResponse<never>;
			}

			return {
				status: error.response?.status ?? 500,
				success: false,
				message: error.message,
				timestamp: new Date().toISOString(),
			};
		}

		return {
			status: 500,
			success: false,
			message:
				error instanceof Error ? error.message : 'Unexpected error',
			timestamp: new Date().toISOString(),
		};
	}

	get<TResponse>(url: string, config?: AxiosRequestConfig) {
		return this.request<TResponse>('GET', url, undefined, config);
	}

	post<TResponse, TPayload = unknown>(
		url: string,
		payload?: TPayload,
		config?: AxiosRequestConfig,
	) {
		return this.request<TResponse, TPayload>('POST', url, payload, config);
	}

	put<TResponse, TPayload = unknown>(
		url: string,
		payload?: TPayload,
		config?: AxiosRequestConfig,
	) {
		return this.request<TResponse, TPayload>('PUT', url, payload, config);
	}

    patch<TResponse, TPayload = unknown>(
		url: string,
		payload?: TPayload,
		config?: AxiosRequestConfig,
	) {
		return this.request<TResponse, TPayload>('PATCH', url, payload, config);
	}

	delete<TResponse>(url: string, config?: AxiosRequestConfig) {
		return this.request<TResponse>('DELETE', url, undefined, config);
	}
}

export const apiClient = new ApiClient();

/**
 * Convenience helpers keep call-sites small while preserving type safety.
 */
export const api = {
	getRequest: <TResponse>(url: string, config?: AxiosRequestConfig) =>
		apiClient.get<TResponse>(url, config),
	postRequest: <TResponse, TPayload = unknown>(
		url: string,
		payload?: TPayload,
		config?: AxiosRequestConfig,
	) => apiClient.post<TResponse, TPayload>(url, payload, config),
	putRequest: <TResponse, TPayload = unknown>(
		url: string,
		payload?: TPayload,
		config?: AxiosRequestConfig,
	) => apiClient.put<TResponse, TPayload>(url, payload, config),
    patchRequest: <TResponse, TPayload = unknown>(
		url: string,
		payload?: TPayload,
		config?: AxiosRequestConfig,
	) => apiClient.patch<TResponse, TPayload>(url, payload, config),
	deleteRequest: <TResponse>(url: string, config?: AxiosRequestConfig) =>
		apiClient.delete<TResponse>(url, config),
};

export const { getRequest, postRequest, putRequest, patchRequest, deleteRequest } = api;
