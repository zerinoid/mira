import { z } from 'zod'

const MB_BYTES = 1000000 // 1 megabyte
const ACCEPTED_MIME_TYPES = [
  'image/gif',
  'image/jpeg',
  'image/png',
  'image/jpg'
]

const imageSchema = z.instanceof(FileList).superRefine((f, ctx) => {
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
      message: `Formatos aceitos: [${ACCEPTED_MIME_TYPES.join(', ')}] mas é ${
        file?.type
      }`
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

export const projectSchema = z.object({
  number: z
    .number({
      required_error: 'Obrigatório e maior que 0'
    })
    .min(1, { message: 'Obrigatório e maior que 0' }),
  category: z
    .string({
      required_error: 'Campo obrigatório'
    })
    .min(3, { message: 'Deve ter mais de 5 caracteres' })
    .max(30)
    .trim(),
  title: z.string().min(1, { message: 'Título é obrigatório' }).max(50).trim(),
  details: z.string().min(0).max(100).trim().optional(),
  additional: z.string().min(0).max(50).trim().optional(),
  body: z
    .string({
      required_error: 'Campo obrigatório'
    })
    .min(5, { message: 'Deve ter mais de 5 caracteres' })
    .max(1000)
    .trim(),
  date: z
    .string({
      required_error: 'Campo obrigatório'
    })
    .min(4, { message: 'Deve ter mais de 4 caracteres' })
    .max(15)
    .trim(),
  client: z
    .string({
      required_error: 'Campo obrigatório'
    })
    .min(3, { message: 'Deve ter mais de 5 caracteres' })
    .max(50)
    .trim(),
  user_id: z
    .string({
      required_error: 'Campo obrigatório'
    })
    .min(6, { message: 'Deve ter mais de 6 caracteres' })
    .max(100),
  image_path: z.string().optional(),
  file: imageSchema.optional()
})
