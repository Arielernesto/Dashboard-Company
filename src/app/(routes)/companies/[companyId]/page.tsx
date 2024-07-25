import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import Header from "./components/Header"
import CompanyInformation from "./components/CompanyInformation"
import { Company } from "@prisma/client"
import FooterCompany from "./components/FooterCompany"


export default async function CompanyIdPage({params}: {params: {companyId: string}}){
    const company : any = await prisma.company.findUnique({
        where: {
            id: params.companyId
        }
    })
    return (
        <section>
            <Header />
            <CompanyInformation company={company} />
            <FooterCompany companyId={company.id}/>
        </section>
    )
}