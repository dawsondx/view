import React, { useState, useEffect } from 'react';
import { useResponsive } from '../../hooks/useResponsive';

interface MobileDebuggerProps {
  sectionName: string;
  isVisible?: boolean;
}

export const MobileDebugger: React.FC<MobileDebuggerProps> = ({ 
  sectionName, 
  isVisible = true 
}) => {
  const { isMobile, width, height } = useResponsive();
  const [debugInfo, setDebugInfo] = useState('');

  useEffect(() => {
    const info = {
      section: sectionName,
      isMobile,
      screenWidth: width,
      screenHeight: height,
      isVisible,
      userAgent: navigator.userAgent,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setDebugInfo(JSON.stringify(info, null, 2));
    
    // 在控制台输出调试信息
    if (process.env.NODE_ENV === 'development') {
      console.log(`[MobileDebugger] ${sectionName}:`, info);
    }
  }, [sectionName, isMobile, width, height, isVisible]);

  // 只在开发环境和移动端显示
  if (process.env.NODE_ENV !== 'development' || !isMobile) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 z-[9999] bg-black bg-opacity-75 text-white text-xs p-2 max-w-xs overflow-auto max-h-32">
      <div className="font-bold mb-1">Debug: {sectionName}</div>
      <div className={`w-4 h-4 rounded-full inline-block mr-2 ${
        isVisible ? 'bg-green-500' : 'bg-red-500'
      }`}></div>
      <span>{isVisible ? 'Visible' : 'Hidden'}</span>
      <details className="mt-2">
        <summary className="cursor-pointer">Details</summary>
        <pre className="text-xs mt-1 whitespace-pre-wrap">{debugInfo}</pre>
      </details>
    </div>
  );
};