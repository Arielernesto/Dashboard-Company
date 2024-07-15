"use client"
import { useMessageStore } from "@/store/Message"
import { useState } from "react"

export function Chat(){
    const messages = useMessageStore(state => state.messages)
    const deleteMessage = useMessageStore(state => state.deleteMessage)
    const [open, setOpen] = useState()
    const handleDelete = async (id: number) =>  {
        deleteMessage(id)
    }
    return (
        <div className=" w-full me-60 mb-40">
        
        {
            messages.map((data,index) => (
        <section key={index} className=" w-full flex justify-end mt-5 mb-5">
           
                    <div  className=" w-60 shadow-lg  bg-white p-6  rounded-lg  rounded-bl-3xl pr-9">
                        {data.content}
                        <span onClick={() => handleDelete(data.id)} className=" text-red-700 text-start block cursor-pointer hover:text-red-900">Eliminar</span>
                    </div> 
           
        </section>
             ))
            }
          </div>     
    )
}