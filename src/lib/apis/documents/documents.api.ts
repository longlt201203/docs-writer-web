import { getRequest } from '../base'
import type { BaseResponse } from '../dto'
import type { DocumentsResponse } from './documents.dto'

const DOCUMENTS_BASE_URL = '/api/documents'

export const getDocuments = (folderId?: string) => {
  const params = folderId ? { folderId } : undefined

  return getRequest<DocumentsResponse>(DOCUMENTS_BASE_URL, { params })
}

export const documentsApi = {
  getDocuments,
}

export type DocumentsPromise = Promise<BaseResponse<DocumentsResponse>>
