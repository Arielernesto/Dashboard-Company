import Login from "./components/Login"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function LoginPage() {

  return (
    <div className=" flex justify-center">
      <div className=" w-full  max-w-[320px] ">
          <Login />

        <div className="flex justify-center mt-5 ">
      <Button variant="outline" className="w-[50%]">
        <Link href="/register">Register</Link>
      </Button>
      </div>
      </div>
    </div>
  )
}
