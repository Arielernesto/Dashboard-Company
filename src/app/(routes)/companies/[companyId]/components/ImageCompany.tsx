"use client"
import { useEffect, useState } from "react";
import { useImageStore } from "@/store/ImageStore";
import Image from "next/image";
import { Company } from "@prisma/client";

export type ListContactProps = {
    company: Company
}


export default function ImageCompany(props: ListContactProps) {
    const [picture, SetPicture] = useState(props.company.profileImage)
    const image = useImageStore(state => state.image)
    useEffect(() => {
        if (image !== "") {
           let file = image;
           let reader  = new FileReader();
            reader.onload = (event: any) => {
            SetPicture(event.target.result)
         };
          reader.readAsDataURL(file);
        }
    }, [image]);
  return (
    <Image src={picture} alt="Company Image" width={90} height={50} className="rounded-lg mb-3"/>
  )
}
