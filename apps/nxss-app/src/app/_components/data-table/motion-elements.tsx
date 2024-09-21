"use client";

import { motion } from "framer-motion";

export const MotionDiv = ({
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  return <motion.div {...props}>{children}</motion.div>;
};
