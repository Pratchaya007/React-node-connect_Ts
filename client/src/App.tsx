import { RouterProvider } from "react-router";
import { router } from "./routes";
import { Toaster } from "sonner";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect, useState } from "react";
import { axios } from "./config/axios";

const App = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const [isloading , setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await axios.get('/auth/refresh' );
        setAuth(res.data.user , res.data.access_token)
      } catch (err) {
        console.log(err);
      }finally{
        setIsLoading(false)
      }
    };
    initAuth();
  }, []);

  if (isloading) return <p>Loading....</p>

  return (
    <>
      <RouterProvider router={router} />
      <Toaster richColors />
    </>
  );
};
export default App;
