import { z } from 'zod'

const MB_BYTES = 1000000 // 1 megabyte
const ACCEPTED_MIME_TYPES = [
  'image/webp',
  'image/gif',
  'image/jpeg',
  'image/png',
  'image/jpg'
]

const formatedTypes = ACCEPTED_MIME_TYPES.map(format =>
  format.replace('image/', '')
)

export const imageSchema = z.instanceof(FileList).superRefine((f, ctx) => {
  const file = f[0]

  if (!file) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Imagem é obrigatória'
    })
  }

  // check mime type
  if (!ACCEPTED_MIME_TYPES.includes(file?.type)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Formatos aceitos: ${formatedTypes.join(', ')}`
    })
  }
  // check file size
  if (file?.size > 3 * MB_BYTES) {
    ctx.addIssue({
      code: z.ZodIssueCode.too_big,
      type: 'array',
      message: `Limite de 3mb para arquivos, esse tem ${(
        file?.size / MB_BYTES
      ).toFixed(2)}mb`,
      maximum: 3 * MB_BYTES,
      inclusive: true
    })
  }
})

export const imageSchemaOptional = z
  .instanceof(FileList)
  .superRefine((f, ctx) => {
    const file = f[0]

    if (file) {
      // check mime type
      if (!ACCEPTED_MIME_TYPES.includes(file?.type)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Formatos aceitos: ${formatedTypes.join(', ')}`
        })
      }
      // check file size
      if (file?.size > 3 * MB_BYTES) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_big,
          type: 'array',
          message: `Limite de 3mb para arquivos, esse tem ${(
            file?.size / MB_BYTES
          ).toFixed(2)}mb`,
          maximum: 3 * MB_BYTES,
          inclusive: true
        })
      }
    }
  })
