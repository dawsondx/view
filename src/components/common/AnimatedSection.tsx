import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useMobileOptimizedAnimation } from '../../hooks/useMobileOptimizedAnimation'
import { useResponsive } from '../../hooks/useResponsive'
import { fadeInUp, staggerContainer } from '../../utils/animations'
import { MobileDebugger } from './MobileDebugger'

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  animation?: 'fadeInUp' | 'stagger' | 'none'
  delay?: number
  sectionName?: string
  fallbackVisible?: boolean
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  animation = 'fadeInUp',
  delay = 0,
  sectionName = 'Unknown',
  fallbackVisible = false
}) => {
  const { ref, isInView } = useMobileOptimizedAnimation()
  const { isMobile } = useResponsive()
  const [fallbackTimer, setFallbackTimer] = useState<NodeJS.Timeout | null>(null)
  const [shouldShowFallback, setShouldShowFallback] = useState(false)
  
  // 移动端备用显示逻辑
  useEffect(() => {
    if (isMobile && !isInView && !shouldShowFallback) {
      const timer = setTimeout(() => {
        setShouldShowFallback(true)
        console.log(`[AnimatedSection] Fallback triggered for ${sectionName}`)
      }, 2000) // 2秒后强制显示
      
      setFallbackTimer(timer)
      
      return () => {
        if (timer) clearTimeout(timer)
      }
    } else if (isInView && fallbackTimer) {
      clearTimeout(fallbackTimer)
      setFallbackTimer(null)
    }
  }, [isMobile, isInView, shouldShowFallback, sectionName, fallbackTimer])
  
  const shouldAnimate = isInView || (isMobile && shouldShowFallback) || fallbackVisible

  const getVariants = () => {
    switch (animation) {
      case 'stagger':
        return staggerContainer
      case 'fadeInUp':
        return fadeInUp
      case 'none':
        return {}
      default:
        return fadeInUp
    }
  }

  if (animation === 'none') {
    return (
      <div ref={ref} className={`${className} ${isMobile ? 'section-content' : ''}`}>
        {process.env.NODE_ENV === 'development' && (
          <MobileDebugger sectionName={sectionName} isVisible={true} />
        )}
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={shouldAnimate ? "visible" : "hidden"}
      variants={getVariants()}
      transition={{ delay }}
      className={`${className} ${isMobile ? 'section-content' : ''}`}
    >
      {process.env.NODE_ENV === 'development' && (
        <MobileDebugger sectionName={sectionName} isVisible={shouldAnimate} />
      )}
      {children}
    </motion.div>
  )
}