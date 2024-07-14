import { Input } from "./ui/input"
import { Button } from "./ui/button"
export function ChatOptions(){
    return (
        <section className=" fixed z-40 flex  items-center justify-center w-full mt-auto h-max bottom-10">
            <Input type="text" className=" w-80"></Input>
           <Button>Enviar</Button>
        </section>
    )
}