import React from 'react'

// 创建懒加载组件的辅助函数
export const createLazyComponent = <T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ [key: string]: T }>,
  exportName: string
) => {
  return React.lazy(() =>
    importFunc().then(module => ({
      default: module[exportName] as T
    }))
  )
}

// 懒加载的section组件（备用）
export const LazySkillsSection = createLazyComponent(
  () => import('../components/sections/SkillsSection'),
  'SkillsSection'
)

export const LazyServicesSection = createLazyComponent(
  () => import('../components/sections/ServicesSection'),
  'ServicesSection'
)

export const LazyAchievementsSection = createLazyComponent(
  () => import('../components/sections/AchievementsSection'),
  'AchievementsSection'
)

export const LazyPortfolioSection = createLazyComponent(
  () => import('../components/sections/PortfolioSection'),
  'PortfolioSection'
)

export const LazyContactSection = createLazyComponent(
  () => import('../components/sections/ContactSection'),
  'ContactSection'
)

// 预加载函数
export const preloadSections = () => {
  // 预加载所有section组件
  const preloadPromises = [
    import('../components/sections/SkillsSection'),
    import('../components/sections/ServicesSection'),
    import('../components/sections/AchievementsSection'),
    import('../components/sections/PortfolioSection'),
    import('../components/sections/ContactSection')
  ]

  return Promise.all(preloadPromises)
}