import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

export interface ScrollAnimationOptions {
  threshold?: number
  triggerOnce?: boolean
  rootMargin?: string
}

export const useScrollAnimation = (options: ScrollAnimationOptions = {}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: options.triggerOnce ?? true,
    margin: options.rootMargin ?? '0px 0px -50px 0px',
    amount: options.threshold ?? 0.05
  })

  return { ref, isInView }
}

export const useStaggeredAnimation = (itemCount: number, delay: number = 0.1) => {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const { ref, isInView } = useScrollAnimation()

  useEffect(() => {
    if (isInView && visibleItems.length === 0) {
      const items = Array.from({ length: itemCount }, (_, i) => i)
      items.forEach((item, index) => {
        setTimeout(() => {
          setVisibleItems(prev => [...prev, item])
        }, index * delay * 1000)
      })
    }
  }, [isInView, itemCount, delay, visibleItems.length])

  return { ref, visibleItems, isInView }
}

export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = scrollPx / winHeightPx
      setScrollProgress(scrolled)
    }

    window.addEventListener('scroll', updateScrollProgress)
    return () => window.removeEventListener('scroll', updateScrollProgress)
  }, [])

  return scrollProgress
}