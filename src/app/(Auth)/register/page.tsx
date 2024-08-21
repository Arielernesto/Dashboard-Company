import Register from "./components/Register"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function RegisterPage() {
  return (
    <div className=" flex justify-center">
    <div className=" w-full  max-w-[320px] ">
        <Register />

      <div className="flex justify-center mt-5 ">
    <Button variant="outline" className="w-[50%]">
      <Link href="/login">Login</Link>
    </Button>
    </div>
    </div>
  </div>
  )
}
