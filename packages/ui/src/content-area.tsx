import React from "react";

import { cn } from ".";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";

export const ContentArea: React.FC<
  React.PropsWithChildren<React.ComponentProps<typeof Card>>
> = ({ children, className, ...props }) => (
  <Card
    className={cn(
      "h-full w-full space-y-4 rounded-none border-none bg-background py-6 shadow-none",
      className,
    )}
    {...props}
  >
    {children}
  </Card>
);

export const ContentAreaHeader: React.FC<
  React.PropsWithChildren<React.ComponentProps<typeof CardHeader>>
> = ({ children, className, ...props }) => (
  <CardHeader className={cn("space-y-2 p-0 px-8", className)} {...props}>
    {children}
  </CardHeader>
);

export const ContentAreaTitle: React.FC<
  React.PropsWithChildren<React.ComponentProps<typeof CardTitle>>
> = ({ children, ...props }) => (
  <CardTitle className="text-2xl font-semibold" {...props}>
    {children}
  </CardTitle>
);

export const ContentAreaDescription: React.FC<
  React.PropsWithChildren<React.ComponentProps<typeof CardDescription>>
> = ({ children, ...props }) => (
  <CardDescription {...props}>{children}</CardDescription>
);

export const ContentAreaContainer: React.FC<
  React.PropsWithChildren<React.ComponentProps<typeof CardContent>>
> = ({ children, className, ...props }) => (
  <CardContent
    className={cn("h-full space-y-4 p-0 px-8", className)}
    {...props}
  >
    {children}
  </CardContent>
);
