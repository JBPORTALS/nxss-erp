import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";

export const ContentArea: React.FC<
  React.PropsWithChildren<React.ComponentProps<typeof Card>>
> = ({ children, ...props }) => (
  <Card
    className="w-full rounded-none border-none bg-background shadow-none"
    {...props}
  >
    {children}
  </Card>
);

export const ContentAreaHeader: React.FC<
  React.PropsWithChildren<React.ComponentProps<typeof CardHeader>>
> = ({ children, ...props }) => (
  <CardHeader className="flex px-8" {...props}>
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

export const ContentSubHeader: React.FC<
  React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>
> = ({ children, ...props }) => (
  <div className="border-b px-8 py-4" {...props}>
    {children}
  </div>
);

export const ContentAreaContainer: React.FC<
  React.PropsWithChildren<React.ComponentProps<typeof CardContent>>
> = ({ children, ...props }) => (
  <CardContent className="space-y-4 px-8 py-6" {...props}>
    {children}
  </CardContent>
);
