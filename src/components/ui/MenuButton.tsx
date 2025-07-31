import React from 'react';

interface MenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

export const MenuButton: React.FC<MenuButtonProps> = ({ 
  isOpen, 
  onClick, 
  className = '' 
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative w-8 h-8 flex flex-col justify-center items-center
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        transition-all duration-200 ease-in-out
        ${className}
      `}
      aria-label={isOpen ? '关闭菜单' : '打开菜单'}
      aria-expanded={isOpen}
    >
      {/* 汉堡菜单图标 */}
      <span
        className={`
          block w-6 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all duration-300 ease-in-out
          ${isOpen ? 'rotate-45 translate-y-1.5' : ''}
        `}
      />
      <span
        className={`
          block w-6 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all duration-300 ease-in-out mt-1
          ${isOpen ? 'opacity-0' : ''}
        `}
      />
      <span
        className={`
          block w-6 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all duration-300 ease-in-out mt-1
          ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}
        `}
      />
    </button>
  );
};