import React from 'react'
import { motion } from 'framer-motion'
import { hoverLift, tapScale } from '../../utils/animations'

interface InteractiveCardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  disabled?: boolean
  hoverEffect?: 'lift' | 'scale' | 'none'
}

export const InteractiveCard: React.FC<InteractiveCardProps> = ({
  children,
  className = '',
  onClick,
  disabled = false,
  hoverEffect = 'lift'
}) => {
  const getHoverAnimation = () => {
    switch (hoverEffect) {
      case 'lift':
        return hoverLift
      case 'scale':
        return { scale: 1.02, transition: { duration: 0.2 } }
      case 'none':
        return {}
      default:
        return hoverLift
    }
  }

  return (
    <motion.div
      className={`cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      whileHover={disabled ? {} : getHoverAnimation()}
      whileTap={disabled ? {} : tapScale}
      onClick={disabled ? undefined : onClick}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}