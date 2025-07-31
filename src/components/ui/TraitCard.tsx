import React from 'react';
import { motion } from 'framer-motion';

interface TraitCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'pink' | 'indigo' | 'teal';
}

export const TraitCard: React.FC<TraitCardProps> = ({ 
  title, 
  description, 
  icon, 
  index, 
  color 
}) => {
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.15,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.15 + 0.3,
        ease: "easeOut"
      }
    }
  };

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: 'from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20',
        icon: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
        accent: 'from-blue-500 to-cyan-500'
      },
      green: {
        bg: 'from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20',
        icon: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
        accent: 'from-green-500 to-emerald-500'
      },
      purple: {
        bg: 'from-purple-100 to-violet-100 dark:from-purple-900/20 dark:to-violet-900/20',
        icon: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
        accent: 'from-purple-500 to-violet-500'
      },
      orange: {
        bg: 'from-orange-100 to-amber-100 dark:from-orange-900/20 dark:to-amber-900/20',
        icon: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
        accent: 'from-orange-500 to-amber-500'
      },
      pink: {
        bg: 'from-pink-100 to-rose-100 dark:from-pink-900/20 dark:to-rose-900/20',
        icon: 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400',
        accent: 'from-pink-500 to-rose-500'
      },
      indigo: {
        bg: 'from-indigo-100 to-blue-100 dark:from-indigo-900/20 dark:to-blue-900/20',
        icon: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400',
        accent: 'from-indigo-500 to-blue-500'
      },
      teal: {
        bg: 'from-teal-100 to-cyan-100 dark:from-teal-900/20 dark:to-cyan-900/20',
        icon: 'bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400',
        accent: 'from-teal-500 to-cyan-500'
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const colors = getColorClasses(color);

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3 }
      }}
      className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
      {/* 背景装饰 */}
      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${colors.bg} rounded-full transform translate-x-12 -translate-y-12 group-hover:scale-110 transition-transform duration-500`} />
      
      <div className="relative p-6 z-10">
        {/* 图标和标题 */}
        <div className="flex items-start gap-4 mb-4">
          <motion.div
            variants={iconVariants}
            className={`flex-shrink-0 w-12 h-12 ${colors.icon} rounded-lg flex items-center justify-center`}
          >
            {icon}
          </motion.div>
          
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              {title}
            </h3>
          </div>
        </div>

        {/* 描述 */}
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {description}
        </p>

        {/* 底部装饰线 */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: index * 0.15 + 0.8, duration: 0.5 }}
          className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${colors.accent} transform origin-left`}
          style={{ width: '100%' }}
        />
      </div>
    </motion.div>
  );
};