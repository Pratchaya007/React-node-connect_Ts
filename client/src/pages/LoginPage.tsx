const LoginPage = () => {
  return (
    <div className="mt-10">
      <form className="max-w-70.5 mx-auto p-4 rounded-xl shadow-2xl bg-[#ffff]">
        <div className="flex flex-col font-bold">
          <label htmlFor="">Email</label>
          <input type="text" className="border rounded-lg border-neutral-400 "/>
        </div>
        <div className="flex flex-col font-bold mt-2">
          <label htmlFor="">Password</label>
          <input type="text" className="border rounded-lg border-neutral-400 "/>
        </div>
        <div className="mt-5">
            <button className="bg-blue-400 text-white p-1 w-full rounded-lg font-bold" >Login</button>
        </div>
      </form>
    </div>
  )
}
export default LoginPage