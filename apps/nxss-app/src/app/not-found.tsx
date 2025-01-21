import Link from "next/link";
import { Link2Off, SmileIcon } from "lucide-react";

import { Button } from "@nxss/ui/button";

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-5">
      <SmileIcon
        strokeWidth={1.2}
        className="size-28 rotate-180 text-accent-foreground/90"
      />
      <h1 className="font-mono text-4xl font-bold">404 - Page Not Found</h1>
      <p className="text-muted-foreground">
        Sorry, the page you are looking for does not exist or you don't have
        access to it.
      </p>
      <Link href="/">
        <Button variant={"link"}>Return Home</Button>
      </Link>
    </div>
  );
}
