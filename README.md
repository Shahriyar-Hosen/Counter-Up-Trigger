<h1 align="center">Counter Up Trigger</h1>

### Interface

```ts
export interface ICounterCard {
  maxCount: number;
  label: string;
  title: string;
}
```

### Counter Card Component

```tsx
import { ICounterCard } from "@/Interface";
import { useEffect, useRef, useState } from "react";

export const CounterCard = ({ label, title, maxCount }: ICounterCard) => {
  const [count, setCount] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

// Update isVisible State. up and down trigger the counter
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      setIsVisible(entry.isIntersecting);
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

// Cleanup the observer when the component is unmounted
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [sectionRef, setIsVisible]);

// Update counter and duration time duration 
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isVisible) {
      intervalId = setInterval(() => {
        if (count < maxCount) {
          setCount((prevCount) => prevCount + 1);
        } else {
          clearInterval(intervalId);
        }
      }, 20); // Adjust the interval duration as needed
    }

  // Cleanup the interval when the component is unmounted or when visibility changes
    return () => {
      clearInterval(intervalId);
    };
  }, [isVisible, count, setCount]);

  return (
    <div
      ref={sectionRef}
      className="flex gap-5 md:gap-9 justify-center items-center lg:items-start flex-col text-center lg:text-start w-full"
    >
      <h1 className="text-4xl md:text-5xl font-extrabold">
        {count}
        <span className="text-primary">{label}</span>
      </h1>
      <p className="text-base md:text-xl font-bold">{title}</p>
    </div>
  );
};
```

### Counter Main Component

```tsx
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
```
