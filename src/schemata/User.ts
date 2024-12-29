import { z } from 'zod'

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  age: z.number(),
})

export type User = z.infer<typeof userSchema>
