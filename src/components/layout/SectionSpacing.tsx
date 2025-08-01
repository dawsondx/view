import React from 'react'
// import { motion } from 'framer-motion'
import { useResponsive } from '../../hooks/useResponsive'

interface SectionSpacingProps {
  children: React.ReactNode
  id?: string
  className?: string
  background?: 'default' | 'alternate' | 'gradient' | 'none'
  padding?: 'none' | 'small' | 'medium' | 'large' | 'xlarge'
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  centerContent?: boolean
}

export const SectionSpacing: React.FC<SectionSpacingProps> = ({
  children,
  id,
  className = '',
  background = 'default',
  padding = 'large',
  maxWidth = 'xl',
  centerContent = true
}) => {
  const { isMobile } = useResponsive()

  // 背景样式
  const getBackgroundClasses = () => {
    switch (background) {
      case 'alternate':
        return 'bg-gray-50 dark:bg-gray-800/50'
      case 'gradient':
        return 'bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'
      case 'none':
        return ''
      default:
        return 'bg-white dark:bg-gray-900'
    }
  }

  // 内边距样式
  const getPaddingClasses = () => {
    if (padding === 'none') return ''
    
    const paddingMap = {
      small: isMobile ? 'py-8 px-4' : 'py-12 px-6',
      medium: isMobile ? 'py-12 px-4' : 'py-16 px-6',
      large: isMobile ? 'py-16 px-4' : 'py-20 px-6',
      xlarge: isMobile ? 'py-20 px-4' : 'py-24 px-6'
    }
    
    return paddingMap[padding] || paddingMap.large
  }

  // 最大宽度样式
  const getMaxWidthClasses = () => {
    const maxWidthMap = {
      sm: 'max-w-2xl',
      md: 'max-w-4xl',
      lg: 'max-w-6xl',
      xl: 'max-w-7xl',
      '2xl': 'max-w-screen-2xl',
      full: 'max-w-full'
    }
    
    return maxWidthMap[maxWidth]
  }

  return (
    <section
      id={id}
      className={`
        relative overflow-hidden
        ${getBackgroundClasses()}
        ${getPaddingClasses()}
        ${className}
      `}
    >
      {/* 装饰性背景元素 */}
      {background === 'gradient' && (
        <>
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 dark:bg-blue-900/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-200 dark:bg-purple-900/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
        </>
      )}

      {/* 内容容器 */}
      <div className={`
        relative z-10 w-full
        ${getMaxWidthClasses()}
        ${centerContent ? 'mx-auto' : ''}
      `}>
        {children}
      </div>

      {/* 分隔线（可选） */}
      {background === 'default' && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
      )}
    </section>
  )
}

// 预设的section配置
export const sectionConfigs = {
  hero: {
    background: 'gradient' as const,
    padding: 'none' as const,
    maxWidth: 'full' as const
  },
  education: {
    background: 'default' as const,
    padding: 'large' as const,
    maxWidth: 'xl' as const
  },
  experience: {
    background: 'alternate' as const,
    padding: 'large' as const,
    maxWidth: 'xl' as const
  },
  projects: {
    background: 'default' as const,
    padding: 'large' as const,
    maxWidth: '2xl' as const
  },
  skills: {
    background: 'alternate' as const,
    padding: 'large' as const,
    maxWidth: 'xl' as const
  },
  portfolio: {
    background: 'default' as const,
    padding: 'large' as const,
    maxWidth: 'xl' as const
  },
  evaluation: {
    background: 'gradient' as const,
    padding: 'large' as const,
    maxWidth: 'lg' as const
  },
  contact: {
    background: 'default' as const,
    padding: 'large' as const,
    maxWidth: 'lg' as const
  }
}

// 带预设配置的Section组件
interface PresetSectionProps extends Omit<SectionSpacingProps, 'background' | 'padding' | 'maxWidth'> {
  preset: keyof typeof sectionConfigs
}

export const PresetSection: React.FC<PresetSectionProps> = ({ preset, ...props }) => {
  const config = sectionConfigs[preset]
  
  return (
    <SectionSpacing
      {...config}
      {...props}
    />
  )
}