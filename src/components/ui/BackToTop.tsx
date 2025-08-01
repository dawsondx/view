import React from 'react';

interface BackToTopProps {
  isVisible: boolean;
  onClick: () => void;
  className?: string;
}

export const BackToTop: React.FC<BackToTopProps> = ({ 
  isVisible, 
  onClick, 
  className = '' 
}) => {
  if (!isVisible) return null;

  return (
    <button
      onClick={onClick}
      className={`
        fixed bottom-8 right-8 z-50
        w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white
        rounded-full shadow-lg hover:shadow-xl
        flex items-center justify-center
        transition-all duration-300 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        transform hover:scale-110
        ${className}
      `}
      aria-label="返回顶部"
      title="返回顶部"
    >
      {/* 向上箭头图标 */}
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  );
};