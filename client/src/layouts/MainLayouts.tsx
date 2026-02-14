import { Outlet } from "react-router"
import Header from "./Header"

const MainLayouts = () => {
  return (
    <>
      <Header/>
      <main className="p-8">
        <Outlet/>
      </main>
    </>
  )
}
export default MainLayouts