import React from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { fadeInUp, staggerContainer } from '../../utils/animations'

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  animation?: 'fadeInUp' | 'stagger' | 'none'
  delay?: number
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  animation = 'fadeInUp',
  delay = 0
}) => {
  const { ref, isInView } = useScrollAnimation()

  const getVariants = () => {
    switch (animation) {
      case 'stagger':
        return staggerContainer
      case 'fadeInUp':
        return fadeInUp
      case 'none':
        return {}
      default:
        return fadeInUp
    }
  }

  if (animation === 'none') {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={getVariants()}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}