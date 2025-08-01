import React from 'react'
import { motion } from 'framer-motion'
import { useScrollProgress } from '../../hooks/useScrollAnimation'

export const ScrollProgress: React.FC = () => {
  const scrollProgress = useScrollProgress()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 z-50 origin-left"
      style={{ scaleX: scrollProgress }}
      initial={{ scaleX: 0 }}
      transition={{ duration: 0.1 }}
    />
  )
}