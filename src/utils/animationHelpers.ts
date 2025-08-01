import { Variants } from 'framer-motion'

// 创建交错动画的辅助函数
export const createStaggerAnimation = (
  delay: number = 0.1,
  duration: number = 0.5
): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: delay,
      delayChildren: 0.1,
      duration
    }
  }
})

// 创建滑入动画的辅助函数
export const createSlideInAnimation = (
  direction: 'left' | 'right' | 'up' | 'down' = 'up',
  distance: number = 60,
  duration: number = 0.6
): Variants => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'left':
        return { x: -distance, y: 0 }
      case 'right':
        return { x: distance, y: 0 }
      case 'up':
        return { x: 0, y: distance }
      case 'down':
        return { x: 0, y: -distance }
      default:
        return { x: 0, y: distance }
    }
  }

  return {
    hidden: {
      opacity: 0,
      ...getInitialPosition()
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  }
}

// 创建缩放动画的辅助函数
export const createScaleAnimation = (
  initialScale: number = 0.8,
  finalScale: number = 1,
  duration: number = 0.5
): Variants => ({
  hidden: {
    opacity: 0,
    scale: initialScale
  },
  visible: {
    opacity: 1,
    scale: finalScale,
    transition: {
      duration,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
})

// 创建旋转动画的辅助函数
export const createRotateAnimation = (
  initialRotation: number = -180,
  finalRotation: number = 0,
  duration: number = 0.5
): Variants => ({
  hidden: {
    opacity: 0,
    rotate: initialRotation
  },
  visible: {
    opacity: 1,
    rotate: finalRotation,
    transition: {
      duration,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
})

// 创建文字打字机效果的辅助函数
export const createTypewriterAnimation = (
  _text: string,
  duration: number = 2
) => ({
  hidden: { width: 0 },
  visible: {
    width: "auto",
    transition: {
      duration,
      ease: "easeInOut"
    }
  }
})

// 创建进度条动画的辅助函数
export const createProgressAnimation = (
  progress: number,
  duration: number = 1,
  delay: number = 0
): Variants => ({
  hidden: {
    scaleX: 0,
    originX: 0
  },
  visible: {
    scaleX: progress / 100,
    transition: {
      duration,
      delay,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
})

// 创建弹跳动画的辅助函数
export const createBounceAnimation = (
  bounceHeight: number = 10,
  duration: number = 0.6
) => ({
  animate: {
    y: [0, -bounceHeight, 0],
    transition: {
      duration,
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 1
    }
  }
})

// 创建摇摆动画的辅助函数
export const createShakeAnimation = (
  intensity: number = 10,
  duration: number = 0.5
) => ({
  animate: {
    x: [-intensity, intensity, -intensity, intensity, 0],
    transition: {
      duration,
      ease: "easeInOut"
    }
  }
})

// 创建呼吸动画的辅助函数
export const createPulseAnimation = (
  scale: number = 1.05,
  duration: number = 2
) => ({
  animate: {
    scale: [1, scale, 1],
    transition: {
      duration,
      ease: "easeInOut",
      repeat: Infinity
    }
  }
})

// 创建路径动画的辅助函数
export const createPathAnimation = (
  pathLength: number = 1,
  duration: number = 2,
  delay: number = 0
) => ({
  hidden: {
    pathLength: 0,
    opacity: 0
  },
  visible: {
    pathLength,
    opacity: 1,
    transition: {
      pathLength: {
        duration,
        delay,
        ease: "easeInOut"
      },
      opacity: {
        duration: 0.3,
        delay
      }
    }
  }
})

// 创建粒子动画的辅助函数
export const createParticleAnimation = (
  count: number = 20,
  duration: number = 3
) => {
  return Array.from({ length: count }, (_, i) => ({
    initial: {
      opacity: 0,
      scale: 0,
      x: 0,
      y: 0
    },
    animate: {
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      x: Math.random() * 200 - 100,
      y: Math.random() * 200 - 100,
      transition: {
        duration,
        delay: i * 0.1,
        ease: "easeOut"
      }
    }
  }))
}