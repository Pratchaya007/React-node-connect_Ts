import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type SubmitHandler } from "react-hook-form"
import z from "zod"
import { axios } from "../config/axios"
import { toast } from "sonner"
import { AxiosError } from "axios"

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
})

type loginInput = z.infer<typeof loginSchema>

const LoginPage = () => {
  const {register ,handleSubmit ,formState: {errors}} = useForm<loginInput>({
    defaultValues: {email: '' , password: ''},
    resolver: zodResolver(loginSchema)
  });

const onSubmit : SubmitHandler = async (data : loginInput) => {
  try{
    const res = await axios.post('/auth/login' , data, 
      // {withCredentials: true}
    ); //บอกให้มันเก็บ cookie ด้วย
    toast.success(' login succesfully ')
  }catch (err){
    if (err instanceof AxiosError){ //ดัก error มาจาก AxiosError
      return toast.error(err.response?.data.message)
    }
    toast.error('something went wrong. try  again later')
  }
}

  return (
    <div className="mt-10">
      <form className="max-w-70.5 mx-auto p-4 rounded-xl shadow-2xl bg-[#ffff]" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col ">
          <label htmlFor="" className="font-bold">Email</label>
          <input type="text" className="border rounded-lg border-neutral-400 " {...register('email')}/>
          {errors.email && <p className="text-red-500  text-sm ">{errors.email.message}</p>}
        </div>
        <div className="flex flex-col mt-2">
          <label htmlFor="" className="font-bold">Password</label>
          <input type="text" className="border rounded-lg border-neutral-400 " {...register('password')}/>
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>
        <div className="mt-5">
            <button className="bg-blue-400 text-white p-1 w-full rounded-lg font-bold" >Login</button>
        </div>
      </form>
    </div>
  )
}
export default LoginPage