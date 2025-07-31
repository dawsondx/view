import { useState, useEffect } from 'react'

interface NetworkInfo {
  isOnline: boolean
  effectiveType?: string
  downlink?: number
  rtt?: number
  saveData?: boolean
}

export const useNetworkStatus = () => {
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo>({
    isOnline: navigator.onLine
  })

  useEffect(() => {
    const updateNetworkInfo = () => {
      const connection = (navigator as any).connection || 
                        (navigator as any).mozConnection || 
                        (navigator as any).webkitConnection

      setNetworkInfo({
        isOnline: navigator.onLine,
        effectiveType: connection?.effectiveType,
        downlink: connection?.downlink,
        rtt: connection?.rtt,
        saveData: connection?.saveData
      })
    }

    const handleOnline = () => updateNetworkInfo()
    const handleOffline = () => updateNetworkInfo()
    const handleConnectionChange = () => updateNetworkInfo()

    // 初始化网络信息
    updateNetworkInfo()

    // 监听网络状态变化
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // 监听连接变化（如果支持）
    const connection = (navigator as any).connection
    if (connection) {
      connection.addEventListener('change', handleConnectionChange)
    }

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      if (connection) {
        connection.removeEventListener('change', handleConnectionChange)
      }
    }
  }, [])

  // 判断是否为慢速连接
  const isSlowConnection = networkInfo.effectiveType === 'slow-2g' || 
                          networkInfo.effectiveType === '2g' ||
                          networkInfo.saveData

  // 判断是否为快速连接
  const isFastConnection = networkInfo.effectiveType === '4g' && 
                          (networkInfo.downlink || 0) > 1.5

  return {
    ...networkInfo,
    isSlowConnection,
    isFastConnection
  }
}

// 性能监控Hook
export const usePerformanceMonitor = () => {
  const [performanceMetrics, setPerformanceMetrics] = useState({
    loadTime: 0,
    domContentLoaded: 0,
    firstContentfulPaint: 0,
    largestContentfulPaint: 0,
    cumulativeLayoutShift: 0,
    firstInputDelay: 0
  })

  useEffect(() => {
    // 获取导航时间
    const getNavigationTiming = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      if (navigation) {
        setPerformanceMetrics(prev => ({
          ...prev,
          loadTime: navigation.loadEventEnd - navigation.loadEventStart,
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart
        }))
      }
    }

    // 获取Paint时间
    const getPaintTiming = () => {
      const paintEntries = performance.getEntriesByType('paint')
      paintEntries.forEach(entry => {
        if (entry.name === 'first-contentful-paint') {
          setPerformanceMetrics(prev => ({
            ...prev,
            firstContentfulPaint: entry.startTime
          }))
        }
      })
    }

    // 获取LCP (Largest Contentful Paint)
    const getLCP = () => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1]
          setPerformanceMetrics(prev => ({
            ...prev,
            largestContentfulPaint: lastEntry.startTime
          }))
        })
        
        try {
          observer.observe({ entryTypes: ['largest-contentful-paint'] })
        } catch (e) {
          // LCP not supported
        }
      }
    }

    // 获取CLS (Cumulative Layout Shift)
    const getCLS = () => {
      if ('PerformanceObserver' in window) {
        let clsValue = 0
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value
              setPerformanceMetrics(prev => ({
                ...prev,
                cumulativeLayoutShift: clsValue
              }))
            }
          }
        })
        
        try {
          observer.observe({ entryTypes: ['layout-shift'] })
        } catch (e) {
          // CLS not supported
        }
      }
    }

    // 获取FID (First Input Delay)
    const getFID = () => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            setPerformanceMetrics(prev => ({
              ...prev,
              firstInputDelay: (entry as any).processingStart - entry.startTime
            }))
          }
        })
        
        try {
          observer.observe({ entryTypes: ['first-input'] })
        } catch (e) {
          // FID not supported
        }
      }
    }

    // 等待页面加载完成后获取指标
    if (document.readyState === 'complete') {
      getNavigationTiming()
      getPaintTiming()
    } else {
      window.addEventListener('load', () => {
        setTimeout(() => {
          getNavigationTiming()
          getPaintTiming()
        }, 0)
      })
    }

    getLCP()
    getCLS()
    getFID()
  }, [])

  return performanceMetrics
}

// 资源加载监控Hook
export const useResourceMonitor = () => {
  const [resources, setResources] = useState<PerformanceResourceTiming[]>([])
  const [slowResources, setSlowResources] = useState<PerformanceResourceTiming[]>([])

  useEffect(() => {
    const updateResources = () => {
      const resourceEntries = performance.getEntriesByType('resource') as PerformanceResourceTiming[]
      setResources(resourceEntries)

      // 找出加载时间超过1秒的资源
      const slow = resourceEntries.filter(resource => 
        resource.duration > 1000
      )
      setSlowResources(slow)
    }

    // 初始获取
    updateResources()

    // 监听新的资源加载
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver(() => {
        updateResources()
      })
      
      try {
        observer.observe({ entryTypes: ['resource'] })
      } catch (e) {
        // Resource timing not supported
      }

      return () => observer.disconnect()
    }
  }, [])

  // 计算资源统计
  const getResourceStats = () => {
    const stats = {
      total: resources.length,
      images: 0,
      scripts: 0,
      stylesheets: 0,
      fonts: 0,
      other: 0,
      totalSize: 0,
      averageLoadTime: 0
    }

    resources.forEach(resource => {
      // 根据资源类型分类
      if (resource.name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
        stats.images++
      } else if (resource.name.match(/\.js$/i)) {
        stats.scripts++
      } else if (resource.name.match(/\.css$/i)) {
        stats.stylesheets++
      } else if (resource.name.match(/\.(woff|woff2|ttf|otf)$/i)) {
        stats.fonts++
      } else {
        stats.other++
      }

      // 计算大小（如果可用）
      if (resource.transferSize) {
        stats.totalSize += resource.transferSize
      }
    })

    // 计算平均加载时间
    if (resources.length > 0) {
      stats.averageLoadTime = resources.reduce((sum, resource) => sum + resource.duration, 0) / resources.length
    }

    return stats
  }

  return {
    resources,
    slowResources,
    stats: getResourceStats()
  }
}