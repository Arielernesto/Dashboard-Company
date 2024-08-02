import { prisma } from "@/lib/prisma"
import HeaderCustomerEdit from "./components/HeaderCustomerEdit"
import CustomerInformation from "./components/CustomerInformation"
import CustomerFooter from "./components/CustomerFooter"


export default async function CustomerIdPage({params}: {params: {id: string}}){
    const customer : any = await prisma.customer.findUnique({
        where: {
            id: params.id
        }
    })
    return (
        <section>
            <HeaderCustomerEdit />
            <CustomerInformation customer={customer}/>
            <CustomerFooter id={customer.id} />
        </section>
    )
}