import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface QRCodeTooltipProps {
  imageSrc: string;
  altText: string;
  isVisible: boolean;
  className?: string;
  children: React.ReactNode;
}

const QRCodeTooltip: React.FC<QRCodeTooltipProps> = ({ 
  imageSrc, 
  altText, 
  isVisible, 
  className = '',
  children
}) => {
  const [imageError, setImageError] = useState(false);
  const [arrowOffset, setArrowOffset] = useState(0);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleImageError = () => {
    setImageError(true);
  };

  useEffect(() => {
    if (isVisible && tooltipRef.current && containerRef.current) {
      // 延迟计算以确保DOM完全渲染
      const calculatePosition = () => {
        const tooltip = tooltipRef.current;
        const container = containerRef.current;
        
        if (!tooltip || !container) return;
        
        const tooltipRect = tooltip.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        // 查找容器内的实际图标元素（优先查找img，然后是svg）
          const iconElement = container.querySelector('img') || container.querySelector('svg') || container.querySelector('button');
          let targetRect = containerRect;
          
          if (iconElement) {
            targetRect = iconElement.getBoundingClientRect();
          } else {
            // 如果没找到图标元素，使用button元素
            const buttonElement = container.querySelector('button');
            if (buttonElement) {
              targetRect = buttonElement.getBoundingClientRect();
            }
          }
         
         // 计算目标元素中心相对于tooltip的位置
          const targetCenter = targetRect.left + targetRect.width / 2;
          const tooltipLeft = tooltipRect.left;
          const tooltipWidth = tooltipRect.width;
          const tooltipCenter = tooltipLeft + tooltipWidth / 2;
          
          // 计算箭头应该的位置（相对于tooltip中心的偏移）
          const offsetFromCenter = targetCenter - tooltipCenter;
          // 转换为相对于tooltip左边缘的位置
          let arrowPosition = tooltipWidth / 2 + offsetFromCenter;
        
        // 限制箭头位置在tooltip范围内，留出边距
        const minArrowPos = 16; // 减小最小边距
        const maxArrowPos = tooltipWidth - 16; // 减小最大边距
        
        arrowPosition = Math.max(minArrowPos, Math.min(maxArrowPos, arrowPosition));
        
        setArrowOffset(arrowPosition);
      };
      
      // 立即计算一次
      calculatePosition();
      
      // 延迟再计算一次，确保动画完成后位置准确
      const timer = setTimeout(calculatePosition, 100);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <div ref={containerRef} className="relative">
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={tooltipRef}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`
              absolute bottom-full mb-3 z-50 pointer-events-none
              bg-white rounded-lg shadow-xl border max-w-xs
              left-1/2 transform -translate-x-1/2
              ${className}
            `}
            style={{
              left: '50%',
              transform: 'translateX(-50%)'
            }}
          >
            {/* 二维码内容 */}
            <div className="p-3">
              {!imageError ? (
                <img
                  src={imageSrc}
                  alt={altText}
                  className="w-auto h-auto max-w-[200px] max-h-[200px] mx-auto block"
                  onError={handleImageError}
                  loading="lazy"
                />
              ) : (
                <div className="w-[200px] h-[200px] bg-gray-100 rounded flex flex-col items-center justify-center text-gray-500 mx-auto">
                  <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="text-sm">二维码加载失败</span>
                </div>
              )}
              <p className="text-xs text-gray-600 text-center mt-2">
                {altText}
              </p>
            </div>
            
            {/* 箭头指示器 - 动态定位指向按钮中心 */}
            <div 
              className="absolute top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"
              style={{
                left: arrowOffset > 0 ? `${arrowOffset}px` : '50%',
                transform: arrowOffset > 0 ? 'translateX(-50%)' : 'translateX(-50%)'
              }}
            ></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// 带二维码的社交媒体按钮组件
interface SocialButtonWithQRProps {
  name: string;
  icon: React.ReactNode;
  qrCodeImage?: string;
  href?: string;
  className?: string;
}

export const SocialButtonWithQR: React.FC<SocialButtonWithQRProps> = ({
  name,
  icon,
  qrCodeImage,
  href,
  className = ''
}) => {
  const [showQR, setShowQR] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    if (qrCodeImage && isMobile) {
      e.preventDefault();
      setShowQR(!showQR);
    } else if (href) {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  };

  const handleMouseEnter = () => {
    if (qrCodeImage && !isMobile) {
      setShowQR(true);
    }
  };

  const handleMouseLeave = () => {
    if (qrCodeImage && !isMobile) {
      setShowQR(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center">
      {qrCodeImage ? (
        <QRCodeTooltip
          imageSrc={qrCodeImage}
          altText={`扫码关注${name}`}
          isVisible={showQR}
        >
          <motion.button
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`
              w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded-lg 
              flex items-center justify-center transition-colors duration-200
              ${className}
            `}
            title={name}
            aria-label={name}
          >
            {icon}
          </motion.button>
        </QRCodeTooltip>
      ) : (
        <motion.button
          onClick={handleClick}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className={`
            w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded-lg 
            flex items-center justify-center transition-colors duration-200
            ${className}
          `}
          title={name}
          aria-label={name}
        >
          {icon}
        </motion.button>
      )}
    </div>
  );
};