import React, { useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import Tick from "@/src/client/components/svg/Tick";
import { Other3DotsHorizontal } from "@heathmont/moon-icons-tw";

type Props = {
  title: string;
  percentage: number;
  progressColor: string;
  progressCount: string;
  pic: StaticImageData;
  peopleCount: string;
  tickCount: string;
  totalTickCount: string;
};

const Card = ({
  title,
  percentage,
  progressColor,
  progressCount,
  pic,
  peopleCount,
  tickCount,
  totalTickCount,
}: Props) => {
  const [progress, setProgress] = useState(0);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const interval = setInterval(() => {
            setProgress((prevProgress) => {
              const newProgress = prevProgress + 1;
              if (newProgress >= percentage) {
                clearInterval(interval);
                return percentage;
              }
              return newProgress;
            });
          }, 50);
          return () => clearInterval(interval);
        }
      });
    }, options);

    const currentRef = progressBarRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [percentage]);

  return (
    <div className="p-3 w-60 rounded-lg bg-gray-50 shadow-lg">
      <div className="flex items-center justify-between">
        <p className="font-bold text-black">{title}</p>
        <Other3DotsHorizontal width={35} height={25} />
      </div>

      <div className="">
        <div className="flex items-center justify-between font-bold text-navyBlue">
          <p className="text-sm font-thin">progress</p>
          <p>{progress}%</p>
        </div>
        <div className="h-2 bg-slate-400 w-full rounded-full mt-1">
          <div
            ref={progressBarRef}
            className={`h-full ${progressColor} w-full rounded-full`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 w-[170px]">
        <div className="flex items-center space-x-1">
          <Tick width="16" height="17" />
          <p className="text-xs">
            <span className="font-semibold">{tickCount}</span>/{totalTickCount}
          </p>
        </div>

        <div className="relative">
          <Image
            src={pic}
            alt="pic alt"
            height={25}
            width={25}
            className="border-white border-2 rounded-full"
          />

          <Image
            src={pic}
            alt="pic alt"
            height={25}
            width={25}
            className="absolute left-4 top-0 border-white border-2 rounded-full"
          />

          <span className="absolute left-8 rounded-full border-white border-2 top-0 text-xs bg-gray-200 p-1">
            +{peopleCount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
