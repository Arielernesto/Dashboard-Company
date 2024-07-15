"use client"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useMessageStore } from "@/store/Message"
// import { useQuery } from '@tanstack/react-query'
import { FormEvent, useEffect } from "react"
export function ChatOptions(){
    const fetchMessages = useMessageStore(state => state.fetchMessages)
    const messages = useMessageStore(state => state.messages)
    const createMessage = useMessageStore(state => state.createMessage)
    console.log(messages)
    // const { isLoading, isError } = useQuery({
    //     queryKey: ['pokemons'],
    //     queryFn: async () => fetchMessages()
    // })
    async function GetMessages(){
        await fetchMessages()
    }
    useEffect(() => {
        if (window.localStorage.getItem('messages')) {
            return
        } else{
        GetMessages()
        }
    }, []);
    const handleSubmit = async (e: any) => {
        e.preventDefault()
       const data = new FormData(e.target)
       const content : any = data.get('content')
       e.target.content.value = "" 
       createMessage(content)
       await fetchMessages()

    }
    return (
        <section className=" fixed z-40 flex  items-center justify-center w-full mt-auto h-max bottom-10">
            <form className=" flex" action="" onSubmit={handleSubmit}>
            <Input name="content" type="text" className=" w-80" />
            <Button type="submit">Enviar</Button>
            </form>
          
        </section>
    )
}