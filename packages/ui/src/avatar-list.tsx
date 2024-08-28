import React from "react";

import { cn } from ".";

export interface AvatarListProps {
  images: string[];
  maxAvatars?: number;
  size?: "small" | "medium" | "large"; // Added size prop
}

const sizeClasses = {
  small: "size-6",
  medium: "size-8",
  large: "w-12 h-12",
};

export const AvatarList: React.FC<AvatarListProps> = (
  { images, maxAvatars = 3, size = "medium" },
  className,
) => {
  const visibleImages = images.slice(0, maxAvatars);
  const remainingCount = images.length - maxAvatars;

  return (
    <div className="flex -space-x-2 overflow-hidden">
      {visibleImages.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Avatar ${index}`}
          className={`rounded-full border ${sizeClasses[size]}`}
        />
      ))}
      {remainingCount > 0 && (
        <div
          className={cn(
            `flex items-center justify-center ${sizeClasses[size]} rounded-full bg-gray-300 text-xs font-medium text-white`,
            className,
          )}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
};
