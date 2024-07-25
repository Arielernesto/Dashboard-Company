"use client"
import { create } from 'zustand' 

interface Store  {
    image: any,
    setImage: (url: File | string) => void 
}

export const useImageStore = create<Store>((set,get) => {
    return {
        image: "",
        setImage: async (url: File | string) => {
            set({image: url})
        }
    }
})