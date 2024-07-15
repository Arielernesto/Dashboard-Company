import { Message } from '@prisma/client'
import {create} from 'zustand'

interface Mensaje {
    messages: Message[],
    fetchMessages: () => Promise<void>,
    createMessage: (data: string) => void,
    deleteMessage: (id: number) => void
}
export const useMessageStore = create<Mensaje>((set, get) => {
    return {
        messages: [],
        fetchMessages: async () => {
            const pet = await fetch(`/api/messages`)
            const res = await pet.json()
            set({messages: res})
        },
        createMessage: async (data: string)  => {
            const pet = await fetch('/api/messages',{
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const newMessage = await pet.json()
            const {messages} = get()
            set({messages: [...messages, newMessage]})
        },
        deleteMessage: async (id: number) => {
            const pet = await fetch(`/api/messages/${id}`, {
                method: 'DELETE'
            })
            console.log(await pet.json())
            // const {messages} = get()
            // const newMessages = messages.filter(item => item.id !== Number(id))
            // set({messages: newMessages})
        }
    }
})