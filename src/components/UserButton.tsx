"use client" 
import Image from "next/image"

export default function UserButton(){
    return (
        <div>
            <Image src={"/profile.jpg"} width={40} height={40} priority alt="user profile" className=" w-[40px] h-[40px] rounded-full"/>
        </div>
    )
} 