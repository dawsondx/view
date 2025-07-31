import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollSpy, useScrollDirection, useScrollToTop } from '../../hooks/useScrollSpy'
import { useResponsive } from '../../hooks/useResponsive'

interface LayoutManagerProps {
  children: React.ReactNode
  sectionIds: string[]
}

export const LayoutManager: React.FC<LayoutManagerProps> = ({ children, sectionIds }) => {
  const { activeSection } = useScrollSpy(sectionIds)
  const scrollDirection = useScrollDirection()
  const { showScrollTop, scrollToTop } = useScrollToTop()
  const { isMobile } = useResponsive()
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)

  // 根据滚动方向控制Header显示/隐藏
  useEffect(() => {
    if (scrollDirection === 'down' && window.scrollY > 100) {
      setIsHeaderVisible(false)
    } else if (scrollDirection === 'up') {
      setIsHeaderVisible(true)
    }
  }, [scrollDirection])

  return (
    <div className="relative">
      {/* 动态Header可见性控制 */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: isHeaderVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed top-0 left-0 right-0 z-40"
      >
        {/* Header会在这里渲染 */}
      </motion.div>

      {/* 主要内容区域 */}
      <div className="relative">
        {children}
      </div>

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

      {/* 页面进度指示器 */}
      <div className="fixed bottom-0 left-0 right-0 z-30 pointer-events-none">
        <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-600 transform origin-left scale-x-0 transition-transform duration-300" 
             style={{ transform: `scaleX(${activeSection ? 1 : 0})` }} />
      </div>

      {/* 侧边导航指示器（桌面端） */}
      {!isMobile && (
        <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-30">
          <div className="flex flex-col space-y-3">
            {sectionIds.map((sectionId) => (
              <motion.div
                key={sectionId}
                className={`
                  w-3 h-3 rounded-full border-2 cursor-pointer transition-all duration-300
                  ${activeSection === sectionId 
                    ? 'bg-blue-600 border-blue-600 scale-125' 
                    : 'bg-transparent border-gray-400 hover:border-blue-400'
                  }
                `}
                whileHover={{ scale: 1.2 }}
                onClick={() => {
                  const element = document.getElementById(sectionId)
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                title={getSectionTitle(sectionId)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// 获取section标题的辅助函数
const getSectionTitle = (sectionId: string): string => {
  const titleMap: Record<string, string> = {
    hero: '首页',
    education: '教育背景',
    experience: '工作经历',
    projects: '项目经验',
    skills: '技能证书',
    portfolio: '作品集',
    evaluation: '自我评价',
    contact: '联系方式'
  }
  
  return titleMap[sectionId] || sectionId
}