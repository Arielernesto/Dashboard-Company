"use client"
import { TrendingUp } from "lucide-react"
import {
    Area, AreaChart,  ResponsiveContainer, Tooltip, XAxis, YAxis
} from 'recharts'
const data = [
    {
        year: "2016",
        newCustomers: 4000,
        oldCustomers: 2400
    },
    {
        year: "2017",
        newCustomers: 4205,
        oldCustomers: 2745
    },
    {
        year: "2018",
        newCustomers: 5035,
        oldCustomers: 3040
    },
    {
        year: "2019",
        newCustomers: 3264,
        oldCustomers: 1427
    },
    {
        year: "2020",
        newCustomers: 7335,
        oldCustomers: 1393
    },
    {
        year: "2021",
        newCustomers: 5631,
        oldCustomers: 4325
    },
    {
        year: "2022",
        newCustomers: 6378,
        oldCustomers: 2260
    },
    {
        year: "2023",
        newCustomers: 9269,
        oldCustomers: 1678
    },
    {
        year: "2024",
        newCustomers: 8536,
        oldCustomers: 3583
    },
]

export default function GraphicSuscribers() {
  return (
    <div className="mt-5">
        <p className="text-3xl mb-3">24.479</p>
        <div className=" flex gap-x-5 mb-5">
            <div className="flex items-center gap-2 px-3 text-md bg-[#16c8c7] text-white rounded-xl w-fit">8.5%
            <TrendingUp strokeWidth={1} className="h-4 w-4"/>
            </div>
            <p className="text-slate-500">432 increased</p>
        </div>
        <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart width={730} height={250} data={data} margin={{top: 10, right: 30, left: 0, bottom:0}}>
                     <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1" >
                            <stop offset="5%" stopColor="#887cfd" stopOpacity={0.8}></stop>
                            <stop offset="95%" stopColor="#887cfd" stopOpacity={0}></stop>
                        </linearGradient>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1" >
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}></stop>
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}></stop>
                        </linearGradient>
                    </defs> 
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="newCustomers" stroke="#887cfd" fillOpacity={1} fill="url(#colorUv)">
                    
                    </Area>
                    <Area type="monotone" dataKey="oldCustomers" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)">
                    
                    </Area>
                </AreaChart>
            </ResponsiveContainer>
        </div>
    </div>
  )
}
