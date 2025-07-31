// 缓存管理工具
interface CacheItem<T> {
  data: T
  timestamp: number
  expiry: number
}

class CacheManager {
  private cache = new Map<string, CacheItem<any>>()
  private maxSize: number
  private defaultTTL: number

  constructor(maxSize = 100, defaultTTL = 5 * 60 * 1000) { // 默认5分钟TTL
    this.maxSize = maxSize
    this.defaultTTL = defaultTTL
  }

  // 设置缓存
  set<T>(key: string, data: T, ttl?: number): void {
    const expiry = Date.now() + (ttl || this.defaultTTL)
    
    // 如果缓存已满，删除最旧的项
    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.cache.keys().next().value
      if (oldestKey) {
        this.cache.delete(oldestKey)
      }
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      expiry
    })
  }

  // 获取缓存
  get<T>(key: string): T | null {
    const item = this.cache.get(key)
    
    if (!item) {
      return null
    }

    // 检查是否过期
    if (Date.now() > item.expiry) {
      this.cache.delete(key)
      return null
    }

    return item.data
  }

  // 删除缓存
  delete(key: string): boolean {
    return this.cache.delete(key)
  }

  // 清空缓存
  clear(): void {
    this.cache.clear()
  }

  // 获取缓存大小
  size(): number {
    return this.cache.size
  }

  // 清理过期缓存
  cleanup(): void {
    const now = Date.now()
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiry) {
        this.cache.delete(key)
      }
    }
  }

  // 获取缓存统计
  getStats() {
    const now = Date.now()
    let expired = 0
    let valid = 0

    for (const item of this.cache.values()) {
      if (now > item.expiry) {
        expired++
      } else {
        valid++
      }
    }

    return {
      total: this.cache.size,
      valid,
      expired,
      maxSize: this.maxSize
    }
  }
}

// 全局缓存实例
export const globalCache = new CacheManager()

// 图片缓存管理
class ImageCacheManager {
  private cache = new Map<string, HTMLImageElement>()
  private loading = new Set<string>()

  async preloadImage(src: string): Promise<HTMLImageElement> {
    // 如果已经缓存，直接返回
    if (this.cache.has(src)) {
      return this.cache.get(src)!
    }

    // 如果正在加载，等待加载完成
    if (this.loading.has(src)) {
      return new Promise((resolve, reject) => {
        const checkLoaded = () => {
          if (this.cache.has(src)) {
            resolve(this.cache.get(src)!)
          } else if (!this.loading.has(src)) {
            reject(new Error('Image loading failed'))
          } else {
            setTimeout(checkLoaded, 100)
          }
        }
        checkLoaded()
      })
    }

    // 开始加载图片
    this.loading.add(src)
    
    return new Promise((resolve, reject) => {
      const img = new Image()
      
      img.onload = () => {
        this.cache.set(src, img)
        this.loading.delete(src)
        resolve(img)
      }
      
      img.onerror = () => {
        this.loading.delete(src)
        reject(new Error(`Failed to load image: ${src}`))
      }
      
      img.src = src
    })
  }

  // 批量预加载图片
  async preloadImages(sources: string[]): Promise<HTMLImageElement[]> {
    const promises = sources.map(src => this.preloadImage(src))
    return Promise.all(promises)
  }

  // 清理缓存
  clear(): void {
    this.cache.clear()
    this.loading.clear()
  }

  // 获取缓存状态
  getStatus() {
    return {
      cached: this.cache.size,
      loading: this.loading.size
    }
  }
}

export const imageCache = new ImageCacheManager()

// 本地存储缓存管理
class LocalStorageCache {
  private prefix: string

  constructor(prefix = 'portfolio_cache_') {
    this.prefix = prefix
  }

  // 设置缓存
  set<T>(key: string, data: T, ttl?: number): void {
    try {
      const item: CacheItem<T> = {
        data,
        timestamp: Date.now(),
        expiry: Date.now() + (ttl || 24 * 60 * 60 * 1000) // 默认24小时
      }
      
      localStorage.setItem(this.prefix + key, JSON.stringify(item))
    } catch (error) {
      console.warn('Failed to set localStorage cache:', error)
    }
  }

  // 获取缓存
  get<T>(key: string): T | null {
    try {
      const itemStr = localStorage.getItem(this.prefix + key)
      if (!itemStr) return null

      const item: CacheItem<T> = JSON.parse(itemStr)
      
      // 检查是否过期
      if (Date.now() > item.expiry) {
        this.delete(key)
        return null
      }

      return item.data
    } catch (error) {
      console.warn('Failed to get localStorage cache:', error)
      return null
    }
  }

  // 删除缓存
  delete(key: string): void {
    try {
      localStorage.removeItem(this.prefix + key)
    } catch (error) {
      console.warn('Failed to delete localStorage cache:', error)
    }
  }

  // 清空所有缓存
  clear(): void {
    try {
      const keys = Object.keys(localStorage)
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          localStorage.removeItem(key)
        }
      })
    } catch (error) {
      console.warn('Failed to clear localStorage cache:', error)
    }
  }

  // 清理过期缓存
  cleanup(): void {
    try {
      const keys = Object.keys(localStorage)
      const now = Date.now()
      
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          try {
            const itemStr = localStorage.getItem(key)
            if (itemStr) {
              const item = JSON.parse(itemStr)
              if (now > item.expiry) {
                localStorage.removeItem(key)
              }
            }
          } catch (error) {
            // 如果解析失败，删除该项
            localStorage.removeItem(key)
          }
        }
      })
    } catch (error) {
      console.warn('Failed to cleanup localStorage cache:', error)
    }
  }
}

export const localStorageCache = new LocalStorageCache()

// 自动清理过期缓存
setInterval(() => {
  globalCache.cleanup()
  localStorageCache.cleanup()
}, 5 * 60 * 1000) // 每5分钟清理一次

// 缓存Hook
export const useCache = <T>(key: string, fetcher: () => Promise<T>, ttl?: number) => {
  const [data, setData] = React.useState<T | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<Error | null>(null)

  React.useEffect(() => {
    const loadData = async () => {
      // 先尝试从缓存获取
      const cached = globalCache.get<T>(key)
      if (cached) {
        setData(cached)
        return
      }

      // 缓存未命中，从源获取数据
      setLoading(true)
      setError(null)
      
      try {
        const result = await fetcher()
        globalCache.set(key, result, ttl)
        setData(result)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [key, ttl])

  const refresh = async () => {
    globalCache.delete(key)
    setLoading(true)
    setError(null)
    
    try {
      const result = await fetcher()
      globalCache.set(key, result, ttl)
      setData(result)
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, refresh }
}

// React Hook需要导入React
import React from 'react'