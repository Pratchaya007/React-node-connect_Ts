import z, { email } from 'zod'

export  const registerSchema = z.object({
  firstName: z.string().min(1, "first name connot be empty"),
  lastName: z.string().min(1, "first name connot be empty"),
  email: z.email("invalid email address"),
  password: z
    .string()
    .regex(
      /^[a-zA-Z0-9]{6,}$/,
      "password must have at least 6 characters and contain only letters and numbers",
    ),
});

export const loginSchema = z.object({
  email: z.string().min(1 , {error: 'email is reqired'}),
  password: z.string().min(1 , {error: 'password is reqired'})
})