"use client"
import { Percent } from "lucide-react"
import { CustomIcon } from "./CustomIcon"
import { ResponsiveContainer, PieChart, Pie, Tooltip, Legend } from "recharts"

const data = [
    {
        name: "VebSite",
        value: 456,
        fill: "#8884D8"
    },
    {
        name: "Instagram",
        value: 854,
        fill: "#00c49f"
    },
    {
        name: "Other",
        value: 240 ,
        fill: "#ffbb28"
    },
]
export default function TotalSuscribers() {
  return (
    <div className="mb-4 lg:mb-0 shadow-sm bg-background rounded-lg  p-5 w-full md:w-96 hover:shadow-lg transition">
        <div className="flex gap-x-2 items-center mb-4">
            <CustomIcon Icon={Percent}/>
            <p className="text-xl">Total Suscribers</p>
        </div>
        <div className="w-full h-[200px] p-5">
            <ResponsiveContainer aspect={1} maxHeight={200}>
                <PieChart>
                    <Pie dataKey="value"
                    data={data}
                    outerRadius={80}
                    labelLine={false}
                    />
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    </div>
  )
}
