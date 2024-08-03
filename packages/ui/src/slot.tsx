import React from "react";

type SlotProps = {
  children: React.ReactElement;
};

const Slot = React.forwardRef<HTMLElement, SlotProps>(
  ({ children, ...props }, ref) => {
    return React.cloneElement(children, { ...props, ref });
  },
);

Slot.displayName = "Slot";

export { Slot };
