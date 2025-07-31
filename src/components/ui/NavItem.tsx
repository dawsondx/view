import React from 'react';
import { NavigationItem } from '../../types/navigation';

interface NavItemProps {
  item: NavigationItem;
  isActive: boolean;
  onClick: (sectionId: string) => void;
  className?: string;
  isMobile?: boolean;
}

export const NavItem: React.FC<NavItemProps> = ({ 
  item, 
  isActive, 
  onClick, 
  className = '',
  isMobile = false 
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick(item.id);
  };

  const baseClasses = `
    relative transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
  `;

  const desktopClasses = `
    px-4 py-2 text-sm font-medium rounded-md
    hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20
    ${isActive 
      ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' 
      : 'text-gray-700 dark:text-gray-300'
    }
  `;

  const mobileClasses = `
    block w-full px-6 py-4 text-left text-base font-medium border-l-4
    hover:bg-gray-50 dark:hover:bg-gray-800
    ${isActive 
      ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 border-blue-600' 
      : 'text-gray-700 dark:text-gray-300 border-transparent hover:border-gray-300'
    }
  `;

  return (
    <a
      href={item.href}
      onClick={handleClick}
      className={`
        ${baseClasses}
        ${isMobile ? mobileClasses : desktopClasses}
        ${className}
      `}
      aria-current={isActive ? 'page' : undefined}
    >
      {item.label}
      
      {/* 桌面端激活指示器 */}
      {!isMobile && isActive && (
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full" />
      )}
    </a>
  );
};