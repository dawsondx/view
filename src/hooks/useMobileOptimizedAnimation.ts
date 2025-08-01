import { useScrollAnimation, ScrollAnimationOptions } from './useScrollAnimation'
import { useResponsive } from './useResponsive'

export const useMobileOptimizedAnimation = (options: ScrollAnimationOptions = {}) => {
  const { isMobile } = useResponsive()
  
  // 移动端使用更宽松的触发条件
  const mobileOptions: ScrollAnimationOptions = {
    threshold: 0.01, // 更低的阈值
    triggerOnce: true,
    rootMargin: '0px 0px -20px 0px', // 更小的边距
    ...options
  }
  
  // 桌面端使用标准配置
  const desktopOptions: ScrollAnimationOptions = {
    threshold: 0.05,
    triggerOnce: true,
    rootMargin: '0px 0px -50px 0px',
    ...options
  }
  
  return useScrollAnimation(isMobile ? mobileOptions : desktopOptions)
}