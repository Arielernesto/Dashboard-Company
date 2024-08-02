import { Customer } from "@prisma/client"
import CustomerForm from "./CustomerForm"

export type CompanyInformationProps = {
    customer: Customer
}

export default function CustomerInformation(props: CompanyInformationProps) {
    const { customer } = props
   
    return (
    <section className=" grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10  gap-y-5 mt-5">
        <div className=" rounded-lg bg-background shadow-md hover:shadow-lg p-4">
            <div>                     
                <CustomerForm customer={customer} />
            </div>
        </div>
    </section>
  )
}