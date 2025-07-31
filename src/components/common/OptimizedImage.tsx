import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  placeholder?: string
  blurDataURL?: string
  width?: number
  height?: number
  priority?: boolean
  quality?: number
  onLoad?: () => void
  onError?: () => void
  fallback?: React.ReactNode
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  placeholder,
  blurDataURL,
  width,
  height,
  priority = false,
  // quality = 75,
  onLoad,
  onError,
  fallback
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const imgRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // 懒加载逻辑
  useEffect(() => {
    if (priority) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '50px' }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [priority])

  // 预加载关键图片
  useEffect(() => {
    if (priority && src) {
      const img = new Image()
      img.src = src
    }
  }, [src, priority])

  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  const handleError = () => {
    setHasError(true)
    onError?.()
  }

  // 生成优化的图片URL（这里可以集成图片CDN服务）
  const getOptimizedSrc = (originalSrc: string) => {
    // 如果是外部URL，直接返回
    if (originalSrc.startsWith('http')) {
      return originalSrc
    }

    // 这里可以添加图片优化服务的逻辑
    // 例如：return `https://your-cdn.com/optimize?src=${originalSrc}&w=${width}&q=${quality}`
    return originalSrc
  }

  // 错误回退
  if (hasError && fallback) {
    return <>{fallback}</>
  }

  if (hasError) {
    return (
      <div className={`bg-gray-200 dark:bg-gray-700 flex items-center justify-center ${className}`}>
        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    )
  }

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <AnimatePresence>
        {/* 占位符/模糊图片 */}
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            {blurDataURL ? (
              <img
                src={blurDataURL}
                alt=""
                className="w-full h-full object-cover filter blur-sm scale-110"
              />
            ) : placeholder ? (
              <img
                src={placeholder}
                alt=""
                className="w-full h-full object-cover opacity-50"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 animate-pulse" />
            )}
          </motion.div>
        )}

        {/* 加载指示器 */}
        {isInView && !isLoaded && !hasError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 实际图片 */}
      {isInView && (
        <motion.img
          ref={imgRef}
          src={getOptimizedSrc(src)}
          alt={alt}
          width={width}
          height={height}
          className={`w-full h-full object-cover ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </div>
  )
}

// 响应式图片组件
interface ResponsiveImageProps extends OptimizedImageProps {
  srcSet?: string
  sizes?: string
  breakpoints?: {
    sm?: string
    md?: string
    lg?: string
    xl?: string
  }
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  srcSet,
  sizes,
  breakpoints,
  ...props
}) => {
  // 生成响应式srcSet
  const generateSrcSet = () => {
    if (srcSet) return srcSet

    if (breakpoints) {
      const srcSetArray = Object.entries(breakpoints).map(([breakpoint, src]) => {
        const width = {
          sm: '640w',
          md: '768w',
          lg: '1024w',
          xl: '1280w'
        }[breakpoint] || '1024w'
        
        return `${src} ${width}`
      })
      
      return srcSetArray.join(', ')
    }

    return undefined
  }

  // 生成sizes属性
  const generateSizes = () => {
    if (sizes) return sizes

    if (breakpoints) {
      return '(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
    }

    return undefined
  }

  return (
    <OptimizedImage
      {...props}
      // 如果浏览器支持，使用原生的srcSet和sizes
      {...(generateSrcSet() && {
        srcSet: generateSrcSet(),
        sizes: generateSizes()
      })}
    />
  )
}

// 图片预加载Hook
export const useImagePreloader = (images: string[]) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(false)

  const preloadImages = async () => {
    setIsLoading(true)
    
    const promises = images.map(src => {
      return new Promise<string>((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve(src)
        img.onerror = () => reject(src)
        img.src = src
      })
    })

    try {
      const loaded = await Promise.allSettled(promises)
      const successful = loaded
        .filter(result => result.status === 'fulfilled')
        .map(result => (result as PromiseFulfilledResult<string>).value)
      
      setLoadedImages(new Set(successful))
    } catch (error) {
      console.error('Error preloading images:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (images.length > 0) {
      preloadImages()
    }
  }, [images])

  return { loadedImages, isLoading, preloadImages }
}