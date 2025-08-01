import { useEffect } from 'react';
import { 
  optimizeTouchEvents, 
  watchViewportChanges, 
  optimizeImageLoading,
  preventScrollThrough 
} from '../../utils/mobileOptimization';
import { useResponsive } from '../../hooks/useResponsive';

interface MobileOptimizerProps {
  children: React.ReactNode;
}

export const MobileOptimizer: React.FC<MobileOptimizerProps> = ({ children }) => {
  const { isMobile } = useResponsive();

  useEffect(() => {
    // 优化触摸事件
    optimizeTouchEvents();
    
    // 监听视口变化
    const cleanup = watchViewportChanges();
    
    // 优化图片加载
    optimizeImageLoading();
    
    // 添加移动端专用CSS
    if (isMobile) {
      const style = document.createElement('style');
      style.textContent = `
        /* 移动端优化样式 */
        html {
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
        }
        
        body {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        /* 优化滚动性能 */
        * {
          -webkit-overflow-scrolling: touch;
        }
        
        /* 优化输入框体验 */
        input, textarea, select {
          font-size: 16px; /* 防止iOS缩放 */
        }
        
        /* 优化按钮点击区域 */
        button, a, [role="button"] {
          min-height: 44px;
          min-width: 44px;
        }
        
        /* 隐藏滚动条但保持功能 */
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        /* 安全区域适配 */
        .safe-area-top {
          padding-top: env(safe-area-inset-top);
        }
        
        .safe-area-bottom {
          padding-bottom: env(safe-area-inset-bottom);
        }
        
        .safe-area-left {
          padding-left: env(safe-area-inset-left);
        }
        
        .safe-area-right {
          padding-right: env(safe-area-inset-right);
        }
        
        /* 视口高度变量 */
        .full-height {
          height: calc(var(--vh, 1vh) * 100);
        }
        
        /* 优化动画性能 */
        .will-change-transform {
          will-change: transform;
        }
        
        .will-change-opacity {
          will-change: opacity;
        }
        
        /* 减少重绘 */
        .gpu-accelerated {
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }
      `;
      document.head.appendChild(style);
      
      return () => {
        document.head.removeChild(style);
      };
    }
    
    return cleanup;
  }, [isMobile]);

  // 处理模态框滚动穿透
  useEffect(() => {
    const handleModalOpen = (_event: CustomEvent) => {
      if (isMobile) {
        preventScrollThrough(true);
      }
    };
    
    const handleModalClose = (_event: CustomEvent) => {
      if (isMobile) {
        preventScrollThrough(false);
      }
    };
    
    window.addEventListener('modal:open' as any, handleModalOpen);
    window.addEventListener('modal:close' as any, handleModalClose);
    
    return () => {
      window.removeEventListener('modal:open' as any, handleModalOpen);
      window.removeEventListener('modal:close' as any, handleModalClose);
    };
  }, [isMobile]);

  return <>{children}</>;
};