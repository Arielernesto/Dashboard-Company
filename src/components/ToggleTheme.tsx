"use client"
import * as React from 'react'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem }  from './ui/dropdown-menu'

export  function ToggleTheme() {
  const { setTheme, theme } = useTheme()
  const [mounted , setMounted] = React.useState(false)
  React.useEffect(() => {
    setMounted(true)
  }, []);
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            { mounted &&
            <Button variant="outline" size="icon">
                {theme == "light" ?
                <SunIcon className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition' />
                                  :
                <MoonIcon className='absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition' />
                }
                <span className=' sr-only'>Toggle theme</span>
            </Button>
}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={()  => setTheme("light")}>
                Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={()  => setTheme("dark")}>
                Dark
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}
