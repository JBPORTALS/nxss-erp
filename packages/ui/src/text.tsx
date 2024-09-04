import React from "react";

import { cn } from ".";

// Individual Text Components

const H1 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLProps<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h1
    ref={ref}
    className={cn("text-4xl font-extrabold text-foreground", className)}
    {...props}
  />
));
H1.displayName = "H1";

const H2 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLProps<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn("text-3xl font-semibold text-foreground", className)}
    {...props}
  />
));
H2.displayName = "H2";

const H3 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLProps<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-2xl font-semibold text-foreground", className)}
    {...props}
  />
));
H3.displayName = "H3";

const H4 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLProps<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h4 ref={ref} className={cn("text-xl font-semibold", className)} {...props} />
));
H4.displayName = "H4";

const P = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLProps<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-base leading-7 text-foreground", className)}
    {...props}
  />
));
P.displayName = "P";

const Blockquote = React.forwardRef<HTMLElement, React.HTMLProps<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn("text-base italic leading-7 text-foreground", className)}
      {...props}
    />
  ),
);
Blockquote.displayName = "Blockquote";

const TableHead = React.forwardRef<HTMLElement, React.HTMLProps<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn("text-base font-bold leading-7 text-foreground", className)}
      {...props}
    />
  ),
);
TableHead.displayName = "TableHead";

const TableItem = React.forwardRef<HTMLElement, React.HTMLProps<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn("text-base leading-7 text-foreground", className)}
      {...props}
    />
  ),
);
TableItem.displayName = "TableItem";

const List = React.forwardRef<HTMLElement, React.HTMLProps<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn("text-base leading-7 text-foreground", className)}
      {...props}
    />
  ),
);
List.displayName = "List";

const InlineCode = React.forwardRef<HTMLElement, React.HTMLProps<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <code
      ref={ref}
      className={cn("font-mono text-sm text-foreground", className)}
      {...props}
    />
  ),
);
InlineCode.displayName = "InlineCode";

const Lead = React.forwardRef<HTMLElement, React.HTMLProps<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn("text-xl text-foreground", className)}
      {...props}
    />
  ),
);
Lead.displayName = "Lead";

const Large = React.forwardRef<HTMLElement, React.HTMLProps<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn("text-lg font-semibold text-foreground", className)}
      {...props}
    />
  ),
);
Large.displayName = "Large";

const Small = React.forwardRef<HTMLElement, React.HTMLProps<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn("text-sm font-medium leading-4 text-foreground", className)}
      {...props}
    />
  ),
);
Small.displayName = "Small";

const Muted = React.forwardRef<HTMLElement, React.HTMLProps<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  ),
);
Muted.displayName = "Muted";

export {
  H1,
  H2,
  H3,
  H4,
  P,
  Blockquote,
  TableHead,
  TableItem,
  List,
  InlineCode,
  Lead,
  Large,
  Small,
  Muted,
};
