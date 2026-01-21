import { z } from 'zod'

export const documentSchema = z.object({
  id: z.string(),
  title: z.string().nullable().optional(),
  content: z.string().nullable().optional(),
  folderId: z.string().nullable().optional(),
  createdAt: z.string().nullable().optional(),
  updatedAt: z.string().nullable().optional(),
})

export type DocumentDTO = z.infer<typeof documentSchema>

export const documentsResponseSchema = z.array(documentSchema)
export type DocumentsResponse = z.infer<typeof documentsResponseSchema>
