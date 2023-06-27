"use client";

import { CounterCard } from "@/components";

const CounterUpTrigger = () => (
  <main className="w-screen h-screen flex flex-col justify-center items-center">
    <div className="bg-green-500 py-12 px-8 md:py-20 md:px-16 w-fit lg:w-full max-w-6xl mx-auto rounded-[32px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 justify-items-center">
      <CounterCard maxCount={100} label="M" title="Client Satisfaction" />
      <CounterCard maxCount={24} label=" h" title="Expert Support Team" />
      <CounterCard maxCount={98} label=" k+" title="Sales Count" />
      <CounterCard maxCount={208} label=" +" title="Client Worldwide" />
    </div>
  </main>
);

export default CounterUpTrigger;
