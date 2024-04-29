import { z } from 'zod'
import { imageSchema, imageSchemaOptional } from './image'

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
  title: z.string().min(1, { message: 'Título é obrigatório' }).max(500).trim(),
  details: z.string().min(0).max(100).trim().optional(),
  additional: z.string().min(0).max(50).trim().optional(),
  body: z
    .string({
      required_error: 'Campo obrigatório'
    })
    .min(5, { message: 'Deve ter mais de 5 caracteres' })
    .max(3000)
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
  image_id: z.string().optional(),
  file: imageSchema.optional()
})

export const projectOptionalImageSchema = projectSchema.extend({
  file: imageSchemaOptional.optional()
})
