import 'dotenv/config'
import z from "zod";


const envSchema = z.object({
  NODE_ENV: z.enum(['development' , 'production', 'test']),
  PORT: z.coerce.number().int().min(0).max(65535),
  FRONTEND_URL: z.url()
})

const {success ,data ,error} = envSchema.safeParse(process.env) //safeParse return key  {success ,data ,error}
if (!success){
  console.log('env validation failed');
  console.log(z.prettifyError(error));
  process.exit(1) //สั่งให้ปิดโปรแกรมลง
}

export const env = data ;