// const RegisterPages = () => {
//   const handleSubmit = (e :React.SubmitEvent<HTMLFormElement>) =>{
//     e.preventDefault()
//   }
//   return (
//     <div className=" py-4">
//       <form className="max-w-77.5 border mx-auto p-4 rounded-xl" onSubmit={handleSubmit}>
//         <div className="flex flex-col">
//           <label htmlFor="">First Name</label>
//           <input type="text" name="" id="" className="border rounded-lg border-neutral-400 "/>
//         </div>
//         <div className="flex flex-col">
//           <label htmlFor="">Last Name</label>
//           <input type="text" name="" id="" className="border rounded-lg border-neutral-400 "/>
//         </div>
//         <div className="flex flex-col">
//           <label htmlFor="">Email</label>
//           <input type="text" name="" id="" className="border rounded-lg border-neutral-400 "/>
//         </div>
//         <div className="flex flex-col">
//           <label htmlFor="">Password</label>
//           <input type="text" name="" id="" className="border rounded-lg border-neutral-400 "/>
//         </div>
//         <div className="mt-2">
//           <button className="bg-blue-400 text-white p-1 w-full rounded-lg font-bold">Register</button>
//         </div>
//       </form>
//     </div>
//   )
// }
// export default RegisterPages

import z from "zod";
import { axios } from "../config/axios";
import { useState } from "react";

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
  const [input, serInput] = useState<RegisterInput>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const [inputError, serInputError] = useState<RegisterInput>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const [isloading , setIsloading] = useState(false)

  const handleChamgeInput = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    serInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {success , data ,error}  = registerSchema.safeParse(input)
    if (!success){
      console.log(z.flattenError(error))

      const nextError: Partial<RegisterInput> = {}
      for (const key in z.flattenError(error).fieldErrors) {
        const value = 
          z.flattenError(error).fieldErrors[
            key as keyof Partial<RegisterInput>
        ];
        if (value){
          nextError[key as keyof Partial<RegisterInput>] = value[0]
        }
      }
      serInputError({...inputError, ...nextError })
      return;
    }
    setIsloading(true);
    const res = await axios.post("/auth/register" ,data);
    setIsloading(false);
    console.log(res.data);
  };

  return (
    <div className=" py-4">
      <form
        className="max-w-77.5 border mx-auto p-4 rounded-xl"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <label htmlFor="">First Name</label>
          <input
            type="text"
            value={input.firstName}
            name="firstName"
            className="border rounded-lg border-neutral-400 "
            onChange={handleChamgeInput}
          />
          {inputError.firstName && <p className="text-red-500 text-sm">{inputError.firstName}</p>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Last Name</label>
          <input
            type="text"
            value={input.lastName}
            name="lastName"
            className="border rounded-lg border-neutral-400 "
            onChange={handleChamgeInput}
          />
          {inputError.firstName && <p className="text-red-500 text-sm">{inputError.lastName}</p>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Email</label>
          <input
            type='email'
            value={input.email}
            name="email"
            className="border rounded-lg border-neutral-400 "
            onChange={handleChamgeInput}
          />
          {inputError.firstName && <p className="text-red-500 text-sm">{inputError.email}</p>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Password</label>
          <input
            type='password'
            value={input.password}
            name="password"
            className="border rounded-lg border-neutral-400 "
            onChange={handleChamgeInput}
          />
          {inputError.firstName && <p className="text-red-500 text-sm">{inputError.password}</p>}
        </div>
        <div className="mt-2">
          <button className="bg-blue-400 text-white p-1 w-full rounded-lg font-bold" disabled={isloading}>
            {isloading ? 'Creating your account' : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default RegisterPages;
