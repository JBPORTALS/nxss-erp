import Link from "next/link";
import { Boxes, Link2Off } from "lucide-react";

import { Button } from "@nxss/ui/button";

export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5">
      <Boxes className="size-20 text-accent-foreground/90" />
      <h1 className="text-3xl font-bold">Invalid Branch.</h1>
      <p className="text-sm text-muted-foreground">
        Sorry, the page you are looking for does not exist or you don't have
        access to it.
      </p>
      <Link href="/">
        <Button variant={"link"}>Return Home</Button>
      </Link>
    </div>
  );
}
