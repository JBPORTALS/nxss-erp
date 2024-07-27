import React from 'react';

export interface AvatarListProps {
  images: string[];
  maxAvatars?: number;
  size?: 'small' | 'medium' | 'large'; // Added size prop
}

const sizeClasses = {
  small: 'w-6 h-6',
  medium: 'w-8 h-8',
  large: 'w-12 h-12',
};

const AvatarList: React.FC<AvatarListProps> = ({ images, maxAvatars = 3, size = 'medium' }) => {
  const visibleImages = images.slice(0, maxAvatars);
  const remainingCount = images.length - maxAvatars;

  return (
    <div className="flex -space-x-2 overflow-hidden">
      {visibleImages.map((src, index) => (
        <img key={index} src={src} alt={`Avatar ${index}`} className={`rounded-full ${sizeClasses[size]}`} />
      ))}
      {remainingCount > 0 && (
        <div className={`flex items-center justify-center ${sizeClasses[size]} text-xs font-medium text-white bg-gray-400 rounded-full`}>
          +{remainingCount}
        </div>
      )}
    </div>
  );
};

export default AvatarList;
