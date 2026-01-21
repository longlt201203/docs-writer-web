import { useQuery } from '@tanstack/react-query'

import { documentsApi } from '@/lib/apis/documents/documents.api'

export const documentsQueryKey = (folderId?: string) =>
  ['documents', folderId ?? 'all'] as const

export function useDocuments(folderId?: string) {
  return useQuery({
    queryKey: documentsQueryKey(folderId),
    queryFn: async () => {
      const response = await documentsApi.getDocuments(folderId)

      if (!response.success) {
        throw new Error(response.message ?? 'Unable to fetch documents')
      }

      return response.data ?? []
    },
  })
}
