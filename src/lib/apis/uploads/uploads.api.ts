import { postRequest } from '../base'
import type { BaseResponse } from '../dto'
import type { InitUploadPayload, InitUploadResponse } from './uploads.dto'

const UPLOADS_BASE_URL = '/api/uploads'

export const initUpload = (
  payload: InitUploadPayload,
): Promise<BaseResponse<InitUploadResponse>> =>
  postRequest<InitUploadResponse, InitUploadPayload>(
    `${UPLOADS_BASE_URL}/init`,
    payload,
  )
