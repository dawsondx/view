import { useState, useEffect, useCallback } from 'react'
import { throttle } from '../utils/performanceOptimization'

interface ScrollSpyOptions {
  threshold?: number
  rootMargin?: string
  offset?: number
}

export const useScrollSpy = (
  sectionIds: string[],
  options: ScrollSpyOptions = {}
) => {
  const [activeSection, setActiveSection] = useState<string>('')
  const { threshold = 0.3, rootMargin = '-20% 0px -70% 0px', offset = 100 } = options

  useEffect(() => {
    const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean)
    
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // 找到最大可见区域的section
        let maxVisibleSection = ''
        let maxVisibleRatio = 0

        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio > maxVisibleRatio) {
            maxVisibleRatio = entry.intersectionRatio
            maxVisibleSection = entry.target.id
          }
        })

        if (maxVisibleSection) {
          setActiveSection(maxVisibleSection)
        }
      },
      {
        threshold,
        rootMargin
      }
    )

    sections.forEach(section => {
      if (section) observer.observe(section)
    })

    return () => {
      sections.forEach(section => {
        if (section) observer.unobserve(section)
      })
    }
  }, [sectionIds, threshold, rootMargin])

  // 平滑滚动到指定section
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const elementTop = element.offsetTop - offset
      window.scrollTo({
        top: elementTop,
        behavior: 'smooth'
      })
    }
  }, [offset])

  return { activeSection, scrollToSection }
}

// 滚动进度Hook
export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = throttle(() => {
      const scrollPx = document.documentElement.scrollTop
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = scrollPx / winHeightPx
      setScrollProgress(Math.min(Math.max(scrolled, 0), 1))
    }, 16) // 60fps

    window.addEventListener('scroll', updateScrollProgress, { passive: true })
    updateScrollProgress() // 初始化

    return () => window.removeEventListener('scroll', updateScrollProgress)
  }, [])

  return scrollProgress
}

// 滚动方向检测Hook
export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const updateScrollDirection = throttle(() => {
      const scrollY = window.scrollY
      const direction = scrollY > lastScrollY ? 'down' : 'up'
      
      if (direction !== scrollDirection && Math.abs(scrollY - lastScrollY) > 10) {
        setScrollDirection(direction)
      }
      
      setLastScrollY(scrollY)
    }, 16)

    window.addEventListener('scroll', updateScrollDirection, { passive: true })
    
    return () => window.removeEventListener('scroll', updateScrollDirection)
  }, [scrollDirection, lastScrollY])

  return scrollDirection
}

// 页面可见性Hook
export const usePageVisibility = () => {
  const [isVisible, setIsVisible] = useState(!document.hidden)

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden)
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  return isVisible
}

// 滚动到顶部Hook
export const useScrollToTop = () => {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = throttle(() => {
      setShowScrollTop(window.scrollY > 300)
    }, 100)

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [])

  return { showScrollTop, scrollToTop }
}