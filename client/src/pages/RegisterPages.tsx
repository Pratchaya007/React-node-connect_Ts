import z from "zod";
import { axios } from "../config/axios";
// import { useState } from "react";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";

const registerSchema = z.object({
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
type RegisterInput = z.infer<typeof registerSchema>;

const RegisterPages = () => {
  const { register , handleSubmit , formState: { errors ,isSubmitting }, setError} = useForm<RegisterInput>({
    defaultValues: {email: '', firstName: '',lastName: '', password: ''},
    resolver: zodResolver(registerSchema)
  });
// console.log(register('firstName'))  
const naviagte = useNavigate();

const onSubmit: SubmitHandler<RegisterInput> = async (data) => {
  // validate passd
  try {
      await  axios.post('/auth/register', data)
      toast.success('You account has been created . Please log in to continue')
      naviagte('/login')
  }catch (err){
    if (err instanceof AxiosError){
      if (err.status === 409){
        setError('email' , {message: ' email already in use '});
        return;
      }
      toast.error(err.response?.data.message);
      return;
    }
    toast.error('something went wrong')
  }
}

  return (
    <div className=" py-4">
      <form className="max-w-77.5 border mx-auto p-4 rounded-xl"onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <label htmlFor="">First Name</label>
          <input type="text" id="" className="border rounded-lg border-neutral-400 " {...register('firstName')}
          //{...register('firstName')} เขัียนแบบนี้แทนค่าของ name onBlur onChange ref แทนหมด
          />
          {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Last Name</label>
          <input type="text"  id="" className="border rounded-lg border-neutral-400 " {...register('lastName')}/>
          {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Email</label>
          <input type='email' id="" className="border rounded-lg border-neutral-400 " {...register('email')}/>
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>
        <div className={`flex flex-col `}>
          <label htmlFor="">Password</label>
          <input type='password' id="" className={`border rounded-lg border-neutral-400 `} {...register('password')}/>
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>
        <div className="mt-2">
          <button className="bg-blue-400 text-white p-1 w-full rounded-lg font-bold" disabled={isSubmitting}>{isSubmitting ? 'Creating your account ....':'Register'}</button>
        </div>
      </form>
    </div>
  )
}
export default RegisterPages



// type RegisterError = Partial<Record<keyof RegisterInput, string>>;


// const RegisterPages = () => {
//   const [input, serInput] = useState<RegisterInput>({
//     email: "",
//     firstName: "",
//     lastName: "",
//     password: "",
//   });

//   const [inputError, serInputError] = useState<RegisterError>({});
//   const [isloading , setIsloading] = useState(false)
//   const navigate = useNavigate()

//   const handleChamgeInput = (
//     e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
//   ) => {
//     serInput({ ...input, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const {success , data ,error}  = registerSchema.safeParse(input)
//     if (!success){
//       console.log(z.flattenError(error))

//       const nextError: Partial<RegisterInput> = {}
//       for (const key in z.flattenError(error).fieldErrors) {
//         const value = 
//           z.flattenError(error).fieldErrors[
//             key as keyof Partial<RegisterInput>
//         ];
//         if (value){
//           nextError[key as keyof Partial<RegisterInput>] = value[0]
//         }
//       }
//       serInputError({...inputError, ...nextError })
//       return;
//     }

//     try{
//         setIsloading(true);
//         await axios.post("/auth/register" ,data);
//         toast.success('Your account has been created') //เมื่อสำเร็จให้ไปที่หน้า login
//         navigate('/login')
//     }catch (err){
//       if (err instanceof AxiosError){
//         if (err.status === 409){
//           serInputError({ email: "Email already in use" });
//           return;
//         }
//         toast.error(err.response?.data.message)//show error toast
//         return;
//       }
//       toast.error(' something went wrong ')
//     }finally{
//       setIsloading(false)
//     }

//   };

//   return (
//     <div className=" py-4">
//       <form
//         className="max-w-77.5 border mx-auto p-4 rounded-xl"
//         onSubmit={handleSubmit}
//       >
//         <div className="flex flex-col">
//           <label htmlFor="">First Name</label>
//           <input
//             type="text"
//             value={input.firstName}
//             name="firstName"
//             className="border rounded-lg border-neutral-400 "
//             onChange={handleChamgeInput}
//           />
//           {inputError.firstName && <p className="text-red-500 text-sm">{inputError.firstName}</p>}
//         </div>
//         <div className="flex flex-col">
//           <label htmlFor="">Last Name</label>
//           <input
//             type="text"
//             value={input.lastName}
//             name="lastName"
//             className="border rounded-lg border-neutral-400 "
//             onChange={handleChamgeInput}
//           />
//           {inputError.lastName && <p className="text-red-500 text-sm">{inputError.lastName}</p>}
//         </div>
//         <div className="flex flex-col">
//           <label htmlFor="">Email</label>
//           <input
//             type='email'
//             value={input.email}
//             name="email"
//             className="border rounded-lg border-neutral-400 "
//             onChange={handleChamgeInput}
//           />
//           {inputError.email && <p className="text-red-500 text-sm">{inputError.email}</p>}
//         </div>
//         <div className="flex flex-col">
//           <label htmlFor="">Password</label>
//           <input
//             type='password'
//             value={input.password}
//             name="password"
//             className="border rounded-lg border-neutral-400 "
//             onChange={handleChamgeInput}
//           />
//           {inputError.password && <p className="text-red-500 text-sm">{inputError.password}</p>}
//         </div>
//         <div className="mt-2">
//           <button className="bg-blue-400 text-white p-1 w-full rounded-lg font-bold" disabled={isloading}>
//             {isloading ? 'Creating your account' : "Register"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };
// export default RegisterPages;
