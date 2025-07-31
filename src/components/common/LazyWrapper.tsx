import React, { Suspense, ComponentType, LazyExoticComponent } from 'react'
import { motion } from 'framer-motion'
import { ErrorBoundary } from './ErrorBoundary'

interface LazyWrapperProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  errorFallback?: React.ReactNode
  onError?: (error: Error) => void
}

// 默认加载组件
const DefaultLoadingFallback = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex items-center justify-center p-8"
  >
    <div className="flex items-center space-x-2">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full"
      />
      <span className="text-gray-600 dark:text-gray-300">加载中...</span>
    </div>
  </motion.div>
)

// 默认错误回退组件
const DefaultErrorFallback = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex items-center justify-center p-8"
  >
    <div className="text-center">
      <div className="w-12 h-12 mx-auto mb-4 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
        <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <p className="text-gray-600 dark:text-gray-300">组件加载失败</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-2 px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors duration-200"
      >
        重新加载
      </button>
    </div>
  </motion.div>
)

// 懒加载包装器组件
export const LazyWrapper: React.FC<LazyWrapperProps> = ({
  children,
  fallback = <DefaultLoadingFallback />,
  errorFallback = <DefaultErrorFallback />,
  onError
}) => {
  return (
    <ErrorBoundary fallback={errorFallback} onError={onError}>
      <Suspense fallback={fallback}>
        {children}
      </Suspense>
    </ErrorBoundary>
  )
}

// 创建懒加载组件的辅助函数
export const createLazyComponent = <T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: React.ReactNode,
  errorFallback?: React.ReactNode
): LazyExoticComponent<T> => {
  const LazyComponent = React.lazy(importFunc)
  
  const WrappedComponent = (props: React.ComponentProps<T>) => (
    <LazyWrapper fallback={fallback} errorFallback={errorFallback}>
      <LazyComponent {...props} />
    </LazyWrapper>
  )

  return WrappedComponent as LazyExoticComponent<T>
}

// 预加载组件的辅助函数
export const preloadComponent = (importFunc: () => Promise<any>) => {
  const componentImport = importFunc()
  return componentImport
}

// 智能懒加载Hook
export const useSmartLazyLoading = () => {
  const [shouldPreload, setShouldPreload] = React.useState(false)

  React.useEffect(() => {
    // 检查网络连接
    const connection = (navigator as any).connection
    const isSlowConnection = connection && (
      connection.effectiveType === 'slow-2g' || 
      connection.effectiveType === '2g' ||
      connection.saveData
    )

    // 检查设备性能
    const isLowEndDevice = navigator.hardwareConcurrency <= 2

    // 只在快速连接和高性能设备上预加载
    setShouldPreload(!isSlowConnection && !isLowEndDevice)
  }, [])

  return { shouldPreload }
}

// 渐进式加载组件
interface ProgressiveLoadProps {
  children: React.ReactNode
  placeholder?: React.ReactNode
  threshold?: number
  rootMargin?: string
}

export const ProgressiveLoad: React.FC<ProgressiveLoadProps> = ({
  children,
  placeholder,
  threshold = 0.1,
  rootMargin = '50px'
}) => {
  const [isVisible, setIsVisible] = React.useState(false)
  const [hasLoaded, setHasLoaded] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true)
          setHasLoaded(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold, rootMargin, hasLoaded])

  return (
    <div ref={ref}>
      {isVisible ? children : (placeholder || <div className="h-32 bg-gray-100 dark:bg-gray-800 animate-pulse rounded" />)}
    </div>
  )
}