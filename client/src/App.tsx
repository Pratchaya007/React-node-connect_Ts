import { RouterProvider } from "react-router"
import { router } from "./routes"
import { Toaster } from "sonner"

const App = () => {
  return (
    <>
      <RouterProvider router={router}/>
      <Toaster richColors/>
    </>
  )
}
export default App