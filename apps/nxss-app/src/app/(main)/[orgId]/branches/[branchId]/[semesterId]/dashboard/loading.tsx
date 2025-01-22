import { LoaderCircleIcon } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <LoaderCircleIcon strokeWidth={1} className="size-10 animate-spin" />
    </div>
  );
}
