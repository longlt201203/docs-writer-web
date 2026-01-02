export interface InitFileRequest {
  filename: string
  size: number
}

export interface InitFileResponse {
  publicId: string
  filename: string
  url: string
  apiKey: string
  timestamp: number
  folder: string
  signature: string
}

export interface InitUploadPayload {
  files: InitFileRequest[]
}

export interface InitUploadResponse {
  files: InitFileResponse[]
}
