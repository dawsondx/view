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
export const LazyEducationSection = createLazyComponent(
  () => import('../components/sections/EducationSection'),
  'EducationSection'
)

export const LazyExperienceSection = createLazyComponent(
  () => import('../components/sections/ExperienceSection'),
  'ExperienceSection'
)

export const LazyProjectsSection = createLazyComponent(
  () => import('../components/sections/ProjectsSection'),
  'ProjectsSection'
)

export const LazySkillsSection = createLazyComponent(
  () => import('../components/sections/SkillsSection'),
  'SkillsSection'
)

export const LazyPortfolioSection = createLazyComponent(
  () => import('../components/sections/PortfolioSection'),
  'PortfolioSection'
)

export const LazyEvaluationSection = createLazyComponent(
  () => import('../components/sections/EvaluationSection'),
  'EvaluationSection'
)

export const LazyContactSection = createLazyComponent(
  () => import('../components/sections/ContactSection'),
  'ContactSection'
)

// 预加载函数
export const preloadSections = () => {
  // 预加载所有section组件
  const preloadPromises = [
    import('../components/sections/EducationSection'),
    import('../components/sections/ExperienceSection'),
    import('../components/sections/ProjectsSection'),
    import('../components/sections/SkillsSection'),
    import('../components/sections/PortfolioSection'),
    import('../components/sections/EvaluationSection'),
    import('../components/sections/ContactSection')
  ]

  return Promise.all(preloadPromises)
}