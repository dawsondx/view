import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollSpy, useScrollDirection } from '../../hooks/useScrollSpy'
import { useResponsive } from '../../hooks/useResponsive'
import { Header } from '../common/Header'

interface EnhancedHeaderProps {
  sectionIds: string[]
  className?: string
}

export const EnhancedHeader: React.FC<EnhancedHeaderProps> = ({ 
  sectionIds, 
  className = '' 
}) => {
  const { activeSection, scrollToSection } = useScrollSpy(sectionIds)
  const scrollDirection = useScrollDirection()
  const { isMobile } = useResponsive()
  const [isVisible, setIsVisible] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)

  // 控制Header的显示/隐藏
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 50)
      
      // 向下滚动时隐藏Header（除非在顶部）
      if (scrollDirection === 'down' && scrollY > 100) {
        setIsVisible(false)
      } else if (scrollDirection === 'up' || scrollY < 100) {
        setIsVisible(true)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // 初始化

    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrollDirection])

  // 导航项配置
  const navigationItems = [
    { id: 'hero', label: '首页', icon: '🏠' },
    { id: 'education', label: '教育', icon: '🎓' },
    { id: 'experience', label: '经历', icon: '💼' },
    { id: 'projects', label: '项目', icon: '🚀' },
    { id: 'skills', label: '技能', icon: '⚡' },
    { id: 'portfolio', label: '作品', icon: '📁' },
    { id: 'evaluation', label: '评价', icon: '⭐' },
    { id: 'contact', label: '联系', icon: '📧' }
  ].filter(item => sectionIds.includes(item.id))

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className={`
            fixed top-0 left-0 right-0 z-50 transition-all duration-300
            ${isScrolled 
              ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-700' 
              : 'bg-transparent'
            }
            ${className}
          `}
        >
          {/* 原有Header组件 */}
          <Header />

          {/* 增强的导航指示器 */}
          {!isMobile && (
            <div className="absolute bottom-0 left-0 right-0">
              <div className="container mx-auto px-6">
                <div className="flex justify-center space-x-8">
                  {navigationItems.map((item) => (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`
                        relative py-2 px-3 text-sm font-medium transition-colors duration-200
                        ${activeSection === item.id
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                        }
                      `}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="flex items-center space-x-1">
                        <span className="text-xs">{item.icon}</span>
                        <span>{item.label}</span>
                      </span>

                      {/* 活动指示器 */}
                      {activeSection === item.id && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
                          initial={false}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 移动端导航指示器 */}
          {isMobile && activeSection && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-2 left-1/2 transform -translate-x-1/2"
            >
              <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                {navigationItems.find(item => item.id === activeSection)?.label}
              </div>
            </motion.div>
          )}
        </motion.header>
      )}
    </AnimatePresence>
  )
}

// 简化的导航点组件（用于侧边栏）
interface NavigationDotsProps {
  sectionIds: string[]
  activeSection: string
  onSectionClick: (sectionId: string) => void
  className?: string
}

export const NavigationDots: React.FC<NavigationDotsProps> = ({
  sectionIds,
  activeSection,
  onSectionClick,
  className = ''
}) => {
  const navigationItems = [
    { id: 'hero', label: '首页' },
    { id: 'education', label: '教育背景' },
    { id: 'experience', label: '工作经历' },
    { id: 'projects', label: '项目经验' },
    { id: 'skills', label: '技能证书' },
    { id: 'portfolio', label: '作品集' },
    { id: 'evaluation', label: '自我评价' },
    { id: 'contact', label: '联系方式' }
  ].filter(item => sectionIds.includes(item.id))

  return (
    <div className={`flex flex-col space-y-4 ${className}`}>
      {navigationItems.map((item) => (
        <motion.button
          key={item.id}
          onClick={() => onSectionClick(item.id)}
          className="group relative flex items-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {/* 导航点 */}
          <div className={`
            w-3 h-3 rounded-full border-2 transition-all duration-300
            ${activeSection === item.id
              ? 'bg-blue-600 border-blue-600 scale-125'
              : 'bg-transparent border-gray-400 group-hover:border-blue-400 group-hover:scale-110'
            }
          `} />

          {/* 标签（悬停时显示） */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="absolute left-6 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-2 py-1 rounded text-xs whitespace-nowrap pointer-events-none"
          >
            {item.label}
          </motion.div>
        </motion.button>
      ))}
    </div>
  )
}