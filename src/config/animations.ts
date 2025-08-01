// 全局动画配置
export const ANIMATION_CONFIG = {
  // 基础动画时长
  durations: {
    fast: 0.2,
    normal: 0.3,
    slow: 0.6,
    verySlow: 1.0
  },

  // 缓动函数
  easings: {
    easeOut: [0.6, -0.05, 0.01, 0.99],
    easeIn: [0.4, 0, 1, 1],
    easeInOut: [0.4, 0, 0.2, 1],
    bounce: [0.68, -0.55, 0.265, 1.55],
    spring: [0.175, 0.885, 0.32, 1.275]
  },

  // 延迟配置
  delays: {
    none: 0,
    short: 0.1,
    medium: 0.2,
    long: 0.5
  },

  // 交错动画配置
  stagger: {
    fast: 0.05,
    normal: 0.1,
    slow: 0.2
  },

  // 滚动动画配置
  scroll: {
    threshold: 0.1,
    rootMargin: '-100px',
    triggerOnce: true
  },

  // 悬停动画配置
  hover: {
    scale: 1.05,
    lift: -8,
    duration: 0.2
  },

  // 点击动画配置
  tap: {
    scale: 0.95,
    duration: 0.1
  },

  // 页面过渡配置
  pageTransition: {
    duration: 0.3,
    ease: 'easeInOut'
  },

  // 加载动画配置
  loading: {
    duration: 2,
    progressSteps: 100,
    updateInterval: 100
  },

  // 性能配置
  performance: {
    enableGPUAcceleration: true,
    willChange: ['transform', 'opacity'],
    reducedMotionDuration: 0.1
  }
}

// 响应式动画配置
export const RESPONSIVE_ANIMATION_CONFIG = {
  mobile: {
    ...ANIMATION_CONFIG,
    durations: {
      fast: 0.15,
      normal: 0.25,
      slow: 0.4,
      verySlow: 0.6
    },
    hover: {
      ...ANIMATION_CONFIG.hover,
      scale: 1.02,
      lift: -4
    }
  },
  tablet: {
    ...ANIMATION_CONFIG,
    durations: {
      fast: 0.18,
      normal: 0.28,
      slow: 0.5,
      verySlow: 0.8
    }
  },
  desktop: ANIMATION_CONFIG
}

// 主题相关的动画配置
export const THEME_ANIMATION_CONFIG = {
  light: {
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    glowColor: 'rgba(59, 130, 246, 0.3)'
  },
  dark: {
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    glowColor: 'rgba(147, 197, 253, 0.3)'
  }
}

// 动画预设
export const ANIMATION_PRESETS = {
  // 卡片动画预设
  card: {
    initial: { opacity: 0, y: 50, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -50, scale: 0.9 },
    transition: { 
      duration: ANIMATION_CONFIG.durations.slow,
      ease: ANIMATION_CONFIG.easings.easeOut
    }
  },

  // 模态框动画预设
  modal: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: { 
      duration: ANIMATION_CONFIG.durations.normal,
      ease: ANIMATION_CONFIG.easings.easeOut
    }
  },

  // 侧边栏动画预设
  sidebar: {
    initial: { x: '-100%' },
    animate: { x: 0 },
    exit: { x: '-100%' },
    transition: { 
      duration: ANIMATION_CONFIG.durations.normal,
      ease: ANIMATION_CONFIG.easings.easeOut
    }
  },

  // 淡入动画预设
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { 
      duration: ANIMATION_CONFIG.durations.normal
    }
  },

  // 滑入动画预设
  slideUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
    transition: { 
      duration: ANIMATION_CONFIG.durations.slow,
      ease: ANIMATION_CONFIG.easings.easeOut
    }
  },

  // 缩放动画预设
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: { 
      duration: ANIMATION_CONFIG.durations.normal,
      ease: ANIMATION_CONFIG.easings.bounce
    }
  },

  // 旋转动画预设
  rotate: {
    initial: { opacity: 0, rotate: -180 },
    animate: { opacity: 1, rotate: 0 },
    exit: { opacity: 0, rotate: 180 },
    transition: { 
      duration: ANIMATION_CONFIG.durations.slow,
      ease: ANIMATION_CONFIG.easings.spring
    }
  }
}