"use client";

import * as React from "react";

import { Progress } from "./progress";

export function ProgressDemo() {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-screen flex justify-center">
      <Progress value={progress} className="w-1/3" />
    </div>
  );
}
