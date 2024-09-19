import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Building } from "lucide-react";
import ReactConfetti from "react-confetti";

import { Button } from "@nxss/ui/button";

export default function WelcomeStep({
  data,
  onNext,
}: {
  data: { name: string; slug: string };
  onNext: (data: any) => void;
}) {
  const router = useRouter();
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const { innerWidth: width, innerHeight: height } = window;
    setWindowDimensions({ width, height });

    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    const timer = setTimeout(() => setShowConfetti(false), 5000);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {showConfetti && (
        <ReactConfetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={false}
          numberOfPieces={1000}
          gravity={0.08}
        />
      )}
      <div className="flex flex-col items-center justify-center space-y-4 p-4 text-center">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Welcome to NexussERP</h1>
          <p className="text-muted-foreground">
            Your organization is all set up and ready to go!
          </p>
        </div>
        <div className="w-full justify-center rounded border border-purple-600 bg-purple-100 p-4">
          <div className="flex items-center justify-center gap-2 font-semibold">
            <div className="flex size-7 items-center justify-center rounded-full border border-purple-900 bg-purple-600">
              <Building className="size-4 text-white" />
            </div>
            {data.name}
          </div>
          <p className="font-semibold text-purple-700">Academic Year 2024-25</p>
        </div>
        <Button
          onClick={() => {
            onNext({});
            router.push(`/${data.slug}/dashboard`);
          }}
          className="w-full"
        >
          Complete
        </Button>
      </div>
    </>
  );
}
