/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { ICounterCard } from "@/Interface";
import { useEffect, useRef, useState } from "react";

export const CounterCard = ({ label, title, maxCount }: ICounterCard) => {
  const [count, setCount] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      setIsVisible(entry.isIntersecting);
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [sectionRef, setIsVisible]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isVisible) {
      intervalId = setInterval(() => {
        if (count < maxCount) {
          setCount((prevCount) => prevCount + 1);
        } else {
          clearInterval(intervalId);
        }
      }, 20);
    }

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
