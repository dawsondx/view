import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ErrorBoundary } from './components/common/ErrorBoundary'
import { Footer } from './components/common/Footer'
import { MobileOptimizer } from './components/common/MobileOptimizer'
import { PageLoader } from './components/common/PageLoader'
import { ScrollProgress } from './components/common/ScrollProgress'
import { AnimatedSection } from './components/common/AnimatedSection'
import { EnhancedHeader } from './components/layout/EnhancedHeader'
import { SectionSpacing, sectionConfigs } from './components/layout/SectionSpacing'
import { NavigationDots } from './components/layout/EnhancedHeader'
import { HeroSection } from './components/sections/HeroSection'
import { personalData } from './data'
import { pageTransition } from './utils/animations'
// import { useNetworkStatus, usePerformanceMonitor } from './hooks/useNetworkStatus'
import { useScrollSpy, useScrollToTop } from './hooks/useScrollSpy'
import { useResponsive } from './hooks/useResponsive'
// import { getAdaptiveQualitySettings } from './utils/performanceOptimization'

// 导入其他section组件
import { EducationSection, ExperienceSection, ProjectsSection, SkillsSection, PortfolioSection, EvaluationSection, ContactSection } from './components/sections'

function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  // const networkStatus = useNetworkStatus()
  // const performanceMetrics = usePerformanceMonitor()
  const { isMobile } = useResponsive()
  const { showScrollTop, scrollToTop } = useScrollToTop()

  // 定义所有section的ID
  const sectionIds = ['hero', 'education', 'experience', 'projects', 'skills', 'portfolio', 'evaluation', 'contact']
  
  // 滚动监听和导航联动
  const { activeSection, scrollToSection } = useScrollSpy(sectionIds)

  // 根据网络状况和设备性能调整设置
  // const qualitySettings = getAdaptiveQualitySettings()

  return (
    <ErrorBoundary>
      <MobileOptimizer>
        <PageLoader onLoadingComplete={() => setIsLoaded(true)} />
        
        <AnimatePresence>
          {isLoaded && (
            <motion.div
              className="min-h-screen relative"
              {...pageTransition}
            >
              {/* 滚动进度条 */}
              <ScrollProgress />
              
              {/* 增强的Header */}
              <EnhancedHeader sectionIds={sectionIds} />
              
              {/* 侧边导航点（桌面端） */}
              {!isMobile && (
                <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40">
                  <NavigationDots
                    sectionIds={sectionIds}
                    activeSection={activeSection}
                    onSectionClick={scrollToSection}
                  />
                </div>
              )}
              
              {/* 主要内容区域 */}
              <main className="relative">
                {/* Hero Section */}
                <SectionSpacing
                  id="hero"
                  {...sectionConfigs.hero}
                  className="min-h-screen flex items-center"
                >
                  <AnimatedSection animation="none">
                    <HeroSection personalInfo={personalData.basicInfo} />
                  </AnimatedSection>
                </SectionSpacing>
                
                {/* Education Section */}
                <SectionSpacing id="education" {...sectionConfigs.education}>
                  <AnimatedSection delay={0.1}>
                    <EducationSection education={personalData.education} />
                  </AnimatedSection>
                </SectionSpacing>
                
                {/* Experience Section */}
                <SectionSpacing id="experience" {...sectionConfigs.experience}>
                  <AnimatedSection delay={0.2}>
                    <ExperienceSection workExperience={personalData.workExperience} />
                  </AnimatedSection>
                </SectionSpacing>
                
                {/* Projects Section */}
                <SectionSpacing id="projects" {...sectionConfigs.projects}>
                  <AnimatedSection delay={0.3}>
                    <ProjectsSection projects={personalData.projects} />
                  </AnimatedSection>
                </SectionSpacing>
                
                {/* Skills Section */}
                <SectionSpacing id="skills" {...sectionConfigs.skills}>
                  <AnimatedSection delay={0.4}>
                    <SkillsSection skills={personalData.skills} certificates={personalData.certificates} />
                  </AnimatedSection>
                </SectionSpacing>
                
                {/* Portfolio Section */}
                <SectionSpacing id="portfolio" {...sectionConfigs.portfolio}>
                  <AnimatedSection delay={0.5}>
                    <PortfolioSection portfolio={personalData.portfolio} />
                  </AnimatedSection>
                </SectionSpacing>
                
                {/* Evaluation Section */}
                <SectionSpacing id="evaluation" {...sectionConfigs.evaluation}>
                  <AnimatedSection delay={0.6}>
                    <EvaluationSection selfEvaluation={personalData.selfEvaluation} />
                  </AnimatedSection>
                </SectionSpacing>
                
                {/* Contact Section */}
                <SectionSpacing id="contact" {...sectionConfigs.contact}>
                  <AnimatedSection delay={0.7}>
                    <ContactSection personalInfo={personalData.basicInfo} />
                  </AnimatedSection>
                </SectionSpacing>
              </main>
              
              {/* Footer */}
          <Footer personalInfo={personalData.basicInfo} />
              
              {/* 返回顶部按钮 */}
              <AnimatePresence>
                {showScrollTop && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={scrollToTop}
                    className={`
                      fixed z-50 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg
                      transition-colors duration-200
                      ${isMobile ? 'bottom-6 right-6' : 'bottom-8 right-8'}
                    `}
                    aria-label="返回顶部"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </MobileOptimizer>
    </ErrorBoundary>
  )
}

export default App