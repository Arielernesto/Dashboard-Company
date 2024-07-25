"use client"
import LastCustomers from "@/components/LastCustomers";
import { CardSummary } from "@/components/CardSummary";

import { CardSummaryData } from '@/lib/utilsData'
import SalesDistributors from "@/components/SalesDistributors";
import TotalSuscribers from "@/components/TotalSuscribers";
import ListIntegrations from "@/components/ListIntegrations";


export default function Home() {
  return (

    <main >
      <h2 className=" text-2xl mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-x-20">
        {
          CardSummaryData.map(({icon, total, average,title, tooltipText}) => (
<CardSummary key={title} icon={icon}
        total={total}
        average={average}
        title={title}
        tooltipText={tooltipText}
        />
          ))
        }
        
      </div>
      <div className="grid gap-y-8 grid-cols-1 xl:grid-cols-2 md:gap-x-10 mt-12">
        <LastCustomers />
        <SalesDistributors />
        
      </div>

      <div className="flex-col md:gap-x-10 xl:flex xl:flex-row  gap-y-4 md:gap-y-9 mt-12 md:mb-10 justify-center">
        <div>
        <TotalSuscribers />
        </div>
        <ListIntegrations />
      </div>
    </main>

  );
}
