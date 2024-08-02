
import { Company } from "@prisma/client";
import { User } from "lucide-react";
import CompanyForm from "./CompanyForm";
import NewContact from "./NewContact";
import ListContacts from "./ListContacts";
import ImageCompany from "./ImageCompany";


export type CompanyInformationProps = {
    company: Company;
}

export default function CompanyInformation(props: CompanyInformationProps) {
    const { company } = props
   
    return (
    <section className=" grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10  gap-y-5 mt-5">
        <div className=" rounded-lg bg-background shadow-md hover:shadow-lg p-4">
            <div>

               <ImageCompany company={company}/>
                                
                <CompanyForm company={company} />
            </div>
        </div>
        <div className=" rounded-lg  bg-background shadow-md  hover:shadow-lg p-4 h-min">
            <div className=" flex items-center justify-between gap-x-2">
                <div className=" flex items-center gap-x-2">
                    <User className="w-5 h-5"/>
                    Contacts
                </div>
                <div>
                   <NewContact />
                </div>
            </div>      
            <ListContacts company={company}/>
        </div>
    </section>
  )
}
