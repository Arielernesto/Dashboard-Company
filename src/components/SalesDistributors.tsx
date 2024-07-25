"use client"
import { CustomIcon } from "./CustomIcon"
import { BarChart } from "lucide-react"
import GraphicSuscribers from "./GraphicSuscribers"

export default function SalesDistributors() {
  return (
    <div className="shadow-sm bg-background rounded-lg p-5">
        <div className="flex gap-x-2 items-center">
            <CustomIcon Icon={BarChart}/>
            <p className="text-xl">Sales Distributors</p>
        </div>
        <GraphicSuscribers />
    </div>
  )
}
