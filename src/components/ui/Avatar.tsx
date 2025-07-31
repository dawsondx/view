import React from 'react';
import { motion } from 'framer-motion';

interface AvatarProps {
  name: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'w-12 h-12 text-lg',
  md: 'w-16 h-16 text-xl',
  lg: 'w-32 h-32 text-4xl',
  xl: 'w-80 h-80 text-6xl',
};

export const Avatar: React.FC<AvatarProps> = ({ 
  name, 
  src, 
  size = 'xl', 
  className = '' 
}) => {
  const initials = name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase();

  return (
    <motion.div
      className={`
        ${sizeClasses[size]} 
        bg-gradient-to-br from-primary-400 to-primary-600 
        rounded-full flex items-center justify-center shadow-2xl
        ${className}
      `}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        <span className="font-bold text-white">
          {initials}
        </span>
      )}
    </motion.div>
  );
};