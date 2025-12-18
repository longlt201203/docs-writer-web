export type FieldErrors = Record<string, string[]>;

export interface BaseResponse<TData = unknown> {
    status: number;
    success: boolean;
    message?: string;
    data?: TData;
    fieldErrors?: FieldErrors;
    timestamp?: string;
}
