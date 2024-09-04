import * as React from "react";

import { cn } from ".";
import { H3, Muted } from "./text";

const ContentArea = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-4 px-8 py-6", className)}
    {...props}
  />
));
ContentArea.displayName = "ContentArea";

const ContentAreaHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mb-2 flex items-start justify-between", className)}
    {...props}
  />
));
ContentAreaHeader.displayName = "ContentAreaHeader";

const ContentAreaTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <H3 ref={ref} className={cn(className)} {...props} />
));
ContentAreaTitle.displayName = "ContentAreaTitle";

const ContentAreaDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <Muted ref={ref} className={cn(className)} {...props} />
));
ContentAreaDescription.displayName = "ContentAreaDescription";

const ContentAreaRight = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
));
ContentAreaRight.displayName = "ContentAreaRight";

const ContentAreaSubheader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
));
ContentAreaSubheader.displayName = "ContentAreaSubheader";

const ContentAreaContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
));
ContentAreaContent.displayName = "ContentAreaContent";

export {
  ContentArea,
  ContentAreaHeader,
  ContentAreaTitle,
  ContentAreaDescription,
  ContentAreaRight,
  ContentAreaSubheader,
  ContentAreaContent,
};
