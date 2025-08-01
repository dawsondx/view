// 移动端优化工具函数

// 检测是否为移动设备
export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

// 检测是否为触摸设备
export const isTouchDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

// 获取安全区域信息
export const getSafeAreaInsets = () => {
  if (typeof window === 'undefined') {
    return { top: 0, right: 0, bottom: 0, left: 0 };
  }

  const style = getComputedStyle(document.documentElement);
  
  return {
    top: parseInt(style.getPropertyValue('--safe-area-inset-top') || '0'),
    right: parseInt(style.getPropertyValue('--safe-area-inset-right') || '0'),
    bottom: parseInt(style.getPropertyValue('--safe-area-inset-bottom') || '0'),
    left: parseInt(style.getPropertyValue('--safe-area-inset-left') || '0')
  };
};

// 防止移动端滚动穿透
export const preventScrollThrough = (prevent: boolean) => {
  if (typeof document === 'undefined') return;
  
  if (prevent) {
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${window.scrollY}px`;
  } else {
    const scrollY = document.body.style.top;
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.top = '';
    
    if (scrollY) {
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  }
};

// 优化移动端点击延迟
export const optimizeTouchEvents = () => {
  if (typeof document === 'undefined') return;
  
  // 添加 touch-action CSS 属性
  const style = document.createElement('style');
  style.textContent = `
    * {
      touch-action: manipulation;
    }
    
    button, a, [role="button"] {
      touch-action: manipulation;
      -webkit-tap-highlight-color: transparent;
    }
  `;
  document.head.appendChild(style);
};

// 获取视口高度（考虑移动端地址栏）
export const getViewportHeight = (): number => {
  if (typeof window === 'undefined') return 0;
  
  // 使用 visualViewport API（如果可用）
  if (window.visualViewport) {
    return window.visualViewport.height;
  }
  
  // 回退到 innerHeight
  return window.innerHeight;
};

// 设置视口高度CSS变量
export const setViewportHeight = () => {
  if (typeof document === 'undefined') return;
  
  const vh = getViewportHeight() * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

// 监听视口变化
export const watchViewportChanges = (callback?: () => void) => {
  if (typeof window === 'undefined') return () => {};
  
  const handleResize = () => {
    setViewportHeight();
    callback?.();
  };
  
  const handleOrientationChange = () => {
    // 延迟执行，等待方向改变完成
    setTimeout(() => {
      setViewportHeight();
      callback?.();
    }, 100);
  };
  
  window.addEventListener('resize', handleResize);
  window.addEventListener('orientationchange', handleOrientationChange);
  
  // 如果支持 visualViewport
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', handleResize);
  }
  
  // 初始设置
  setViewportHeight();
  
  // 返回清理函数
  return () => {
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('orientationchange', handleOrientationChange);
    
    if (window.visualViewport) {
      window.visualViewport.removeEventListener('resize', handleResize);
    }
  };
};

// 优化图片加载
export const optimizeImageLoading = () => {
  if (typeof document === 'undefined') return;
  
  // 添加图片懒加载支持
  const images = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src || '';
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach((img) => imageObserver.observe(img));
  } else {
    // 回退方案
    images.forEach((img) => {
      const imgElement = img as HTMLImageElement;
      imgElement.src = imgElement.dataset.src || '';
    });
  }
};

// 检测网络连接质量
export const getNetworkInfo = () => {
  if (typeof navigator === 'undefined' || !('connection' in navigator)) {
    return { effectiveType: '4g', downlink: 10, rtt: 100 };
  }
  
  const connection = (navigator as any).connection;
  
  return {
    effectiveType: connection.effectiveType || '4g',
    downlink: connection.downlink || 10,
    rtt: connection.rtt || 100
  };
};

// 根据网络状况优化内容加载
export const optimizeForNetwork = () => {
  const { effectiveType, downlink } = getNetworkInfo();
  
  // 慢速网络优化
  if (effectiveType === 'slow-2g' || effectiveType === '2g' || downlink < 1) {
    return {
      reduceAnimations: true,
      compressImages: true,
      deferNonCritical: true,
      enableDataSaver: true
    };
  }
  
  // 中速网络
  if (effectiveType === '3g' || downlink < 5) {
    return {
      reduceAnimations: false,
      compressImages: true,
      deferNonCritical: true,
      enableDataSaver: false
    };
  }
  
  // 快速网络
  return {
    reduceAnimations: false,
    compressImages: false,
    deferNonCritical: false,
    enableDataSaver: false
  };
};