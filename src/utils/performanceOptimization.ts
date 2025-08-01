// 防抖函数
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate = false
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      if (!immediate) func(...args)
    }

    const callNow = immediate && !timeout

    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)

    if (callNow) func(...args)
  }
}

// 节流函数
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// 请求空闲时间执行
export const requestIdleCallback = (callback: () => void, timeout = 5000) => {
  if ('requestIdleCallback' in window) {
    return window.requestIdleCallback(callback, { timeout })
  } else {
    // 降级到setTimeout
    return setTimeout(callback, 1)
  }
}

// 批量DOM操作
export const batchDOMUpdates = (updates: (() => void)[]) => {
  requestAnimationFrame(() => {
    updates.forEach(update => update())
  })
}

// 虚拟滚动辅助函数
export const calculateVisibleRange = (
  scrollTop: number,
  containerHeight: number,
  itemHeight: number,
  totalItems: number,
  overscan = 5
) => {
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan)
  const endIndex = Math.min(
    totalItems - 1,
    Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
  )

  return { startIndex, endIndex }
}

// 图片懒加载观察器
export const createImageObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
) => {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  }

  return new IntersectionObserver(callback, defaultOptions)
}

// 预加载关键资源
export const preloadCriticalResources = (resources: string[]) => {
  resources.forEach(resource => {
    const link = document.createElement('link')
    link.rel = 'preload'
    
    if (resource.endsWith('.css')) {
      link.as = 'style'
    } else if (resource.endsWith('.js')) {
      link.as = 'script'
    } else if (resource.match(/\.(jpg|jpeg|png|webp|gif)$/i)) {
      link.as = 'image'
    } else if (resource.match(/\.(woff|woff2|ttf|otf)$/i)) {
      link.as = 'font'
      link.crossOrigin = 'anonymous'
    }
    
    link.href = resource
    document.head.appendChild(link)
  })
}

// DNS预解析
export const preconnectToDomains = (domains: string[]) => {
  domains.forEach(domain => {
    const link = document.createElement('link')
    link.rel = 'preconnect'
    link.href = domain
    document.head.appendChild(link)
  })
}

// 代码分割加载 - 修复为通用的动态导入函数
export const loadChunk = async (modulePath: string) => {
  try {
    // 使用 @vite-ignore 注释来避免 Vite 分析警告
    const module = await import(/* @vite-ignore */ modulePath)
    return module.default || module
  } catch (error) {
    console.error(`Failed to load module: ${modulePath}`, error)
    throw error
  }
}

// 内存使用监控
export const getMemoryUsage = () => {
  if ('memory' in performance) {
    const memory = (performance as any).memory
    return {
      used: Math.round(memory.usedJSHeapSize / 1048576), // MB
      total: Math.round(memory.totalJSHeapSize / 1048576), // MB
      limit: Math.round(memory.jsHeapSizeLimit / 1048576) // MB
    }
  }
  return null
}

// 检测设备性能等级
export const getDevicePerformanceLevel = (): 'high' | 'medium' | 'low' => {
  const hardwareConcurrency = navigator.hardwareConcurrency || 4
  const memory = (navigator as any).deviceMemory || 4
  const connection = (navigator as any).connection

  let score = 0

  // CPU评分
  if (hardwareConcurrency >= 8) score += 3
  else if (hardwareConcurrency >= 4) score += 2
  else score += 1

  // 内存评分
  if (memory >= 8) score += 3
  else if (memory >= 4) score += 2
  else score += 1

  // 网络评分
  if (connection) {
    if (connection.effectiveType === '4g') score += 2
    else if (connection.effectiveType === '3g') score += 1
  } else {
    score += 1 // 假设中等网络
  }

  if (score >= 7) return 'high'
  if (score >= 5) return 'medium'
  return 'low'
}

// 自适应质量设置
export const getAdaptiveQualitySettings = () => {
  const performanceLevel = getDevicePerformanceLevel()
  const isSlowConnection = (navigator as any).connection?.saveData || 
                          (navigator as any).connection?.effectiveType === 'slow-2g' ||
                          (navigator as any).connection?.effectiveType === '2g'

  switch (performanceLevel) {
    case 'high':
      return {
        imageQuality: isSlowConnection ? 75 : 90,
        animationDuration: isSlowConnection ? 0.3 : 0.6,
        enableParallax: !isSlowConnection,
        enableBlur: true,
        maxConcurrentRequests: 6
      }
    case 'medium':
      return {
        imageQuality: 75,
        animationDuration: 0.4,
        enableParallax: false,
        enableBlur: !isSlowConnection,
        maxConcurrentRequests: 4
      }
    case 'low':
      return {
        imageQuality: 60,
        animationDuration: 0.2,
        enableParallax: false,
        enableBlur: false,
        maxConcurrentRequests: 2
      }
  }
}

// 资源优先级管理
export class ResourcePriorityManager {
  private highPriorityQueue: (() => Promise<any>)[] = []
  private normalPriorityQueue: (() => Promise<any>)[] = []
  private lowPriorityQueue: (() => Promise<any>)[] = []
  private isProcessing = false
  private maxConcurrent: number

  constructor(maxConcurrent = 3) {
    this.maxConcurrent = maxConcurrent
  }

  addTask(task: () => Promise<any>, priority: 'high' | 'normal' | 'low' = 'normal') {
    switch (priority) {
      case 'high':
        this.highPriorityQueue.push(task)
        break
      case 'normal':
        this.normalPriorityQueue.push(task)
        break
      case 'low':
        this.lowPriorityQueue.push(task)
        break
    }

    this.processTasks()
  }

  private async processTasks() {
    if (this.isProcessing) return

    this.isProcessing = true

    while (this.hasTasksToProcess()) {
      const tasks = this.getNextTasks()
      await Promise.all(tasks.map(task => task().catch(console.error)))
    }

    this.isProcessing = false
  }

  private hasTasksToProcess(): boolean {
    return this.highPriorityQueue.length > 0 || 
           this.normalPriorityQueue.length > 0 || 
           this.lowPriorityQueue.length > 0
  }

  private getNextTasks(): (() => Promise<any>)[] {
    const tasks: (() => Promise<any>)[] = []

    // 优先处理高优先级任务
    while (tasks.length < this.maxConcurrent && this.highPriorityQueue.length > 0) {
      tasks.push(this.highPriorityQueue.shift()!)
    }

    // 然后处理普通优先级任务
    while (tasks.length < this.maxConcurrent && this.normalPriorityQueue.length > 0) {
      tasks.push(this.normalPriorityQueue.shift()!)
    }

    // 最后处理低优先级任务
    while (tasks.length < this.maxConcurrent && this.lowPriorityQueue.length > 0) {
      tasks.push(this.lowPriorityQueue.shift()!)
    }

    return tasks
  }
}

// 全局资源管理器实例
export const resourceManager = new ResourcePriorityManager()

// 性能监控和报告
export const performanceReporter = {
  // 记录性能指标
  recordMetric: (name: string, value: number, unit = 'ms') => {
    if ('performance' in window && 'mark' in performance) {
      performance.mark(`${name}:${value}${unit}`)
    }
    
    // 可以在这里添加发送到分析服务的逻辑
    console.log(`Performance Metric - ${name}: ${value}${unit}`)
  },

  // 记录用户交互时间
  recordInteraction: (action: string, startTime: number) => {
    const duration = performance.now() - startTime
    performanceReporter.recordMetric(`interaction:${action}`, duration)
  },

  // 记录资源加载时间
  recordResourceLoad: (resourceName: string, loadTime: number) => {
    performanceReporter.recordMetric(`resource:${resourceName}`, loadTime)
  }
}