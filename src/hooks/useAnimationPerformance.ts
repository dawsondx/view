import { useEffect, useState } from 'react'

interface AnimationPerformanceOptions {
  enableAnimations?: boolean
  reducedMotion?: boolean
  performanceMode?: 'high' | 'medium' | 'low'
}

export const useAnimationPerformance = (options: AnimationPerformanceOptions = {}) => {
  const [shouldAnimate, setShouldAnimate] = useState(true)
  const [animationDuration, setAnimationDuration] = useState(1)
  const [animationEasing, setAnimationEasing] = useState('easeOut')

  useEffect(() => {
    // 检查用户的减少动画偏好
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    // 检查设备性能
    const isLowEndDevice = checkDevicePerformance()
    
    // 根据选项和设备能力调整动画设置
    if (options.reducedMotion || prefersReducedMotion) {
      setShouldAnimate(false)
      setAnimationDuration(0.1)
    } else if (isLowEndDevice || options.performanceMode === 'low') {
      setShouldAnimate(true)
      setAnimationDuration(0.3)
      setAnimationEasing('linear')
    } else if (options.performanceMode === 'medium') {
      setShouldAnimate(true)
      setAnimationDuration(0.6)
      setAnimationEasing('easeOut')
    } else {
      setShouldAnimate(options.enableAnimations !== false)
      setAnimationDuration(1)
      setAnimationEasing('easeOut')
    }
  }, [options.enableAnimations, options.reducedMotion, options.performanceMode])

  return {
    shouldAnimate,
    animationDuration,
    animationEasing,
    isReducedMotion: !shouldAnimate
  }
}

// 检查设备性能的辅助函数
const checkDevicePerformance = (): boolean => {
  // 检查硬件并发数（CPU核心数的近似值）
  const hardwareConcurrency = navigator.hardwareConcurrency || 4
  
  // 检查内存（如果可用）
  const memory = (navigator as any).deviceMemory || 4
  
  // 检查连接类型（如果可用）
  const connection = (navigator as any).connection
  const effectiveType = connection?.effectiveType || '4g'
  
  // 简单的性能评分
  let performanceScore = 0
  
  if (hardwareConcurrency >= 8) performanceScore += 3
  else if (hardwareConcurrency >= 4) performanceScore += 2
  else performanceScore += 1
  
  if (memory >= 8) performanceScore += 3
  else if (memory >= 4) performanceScore += 2
  else performanceScore += 1
  
  if (effectiveType === '4g') performanceScore += 2
  else if (effectiveType === '3g') performanceScore += 1
  
  // 如果总分低于5，认为是低端设备
  return performanceScore < 5
}

// 动画性能监控Hook
export const useAnimationMonitor = () => {
  const [frameRate, setFrameRate] = useState(60)
  const [isPerformanceGood, setIsPerformanceGood] = useState(true)

  useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()
    let animationId: number

    const measureFrameRate = (currentTime: number) => {
      frameCount++
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime))
        setFrameRate(fps)
        setIsPerformanceGood(fps >= 30) // 30fps作为性能良好的阈值
        
        frameCount = 0
        lastTime = currentTime
      }
      
      animationId = requestAnimationFrame(measureFrameRate)
    }

    animationId = requestAnimationFrame(measureFrameRate)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  return {
    frameRate,
    isPerformanceGood,
    shouldReduceAnimations: !isPerformanceGood
  }
}

// 智能动画配置Hook
export const useSmartAnimation = () => {
  const performance = useAnimationPerformance()
  const monitor = useAnimationMonitor()

  const getAnimationConfig = (baseConfig: any) => {
    if (!performance.shouldAnimate || !monitor.isPerformanceGood) {
      return {
        ...baseConfig,
        duration: 0.1,
        ease: 'linear',
        animate: baseConfig.animate ? { ...baseConfig.animate, transition: { duration: 0.1 } } : undefined
      }
    }

    return {
      ...baseConfig,
      duration: performance.animationDuration,
      ease: performance.animationEasing
    }
  }

  return {
    ...performance,
    ...monitor,
    getAnimationConfig
  }
}