import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WorkExperience } from '../../types';

interface WorkExperienceCardProps {
  experience: WorkExperience;
  index: number;
}

// 公司图标
const CompanyIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

// 日历图标
const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

// 职位图标
const PositionIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
  </svg>
);

// 展开/收起图标
const ChevronDownIcon = ({ isExpanded }: { isExpanded: boolean }) => (
  <svg 
    className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

// 成就图标
const AchievementIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

export const WorkExperienceCard: React.FC<WorkExperienceCardProps> = ({ experience, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

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
        delay: index * 0.2,
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
        delay: index * 0.2 + 0.3,
        ease: "easeOut"
      }
    }
  };

  const expandedContentVariants = {
    hidden: { 
      opacity: 0, 
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    visible: { 
      opacity: 1, 
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3 }
      }}
      className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col h-full"
    >
      {/* 当前职位标识 */}
      {experience.current && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.2 + 0.5 }}
          className="absolute top-4 right-4 z-10"
        >
          <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            在职
          </div>
        </motion.div>
      )}

      {/* 背景装饰 */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900/20 dark:to-green-900/20 rounded-full transform translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform duration-500" />

      <div className="relative p-6 z-10 flex-1 flex flex-col">
        {/* 公司图标和基本信息 */}
        <div className="flex items-start gap-4 mb-4">
          <motion.div
            variants={iconVariants}
            className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400"
          >
            <CompanyIcon />
          </motion.div>
          
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              {experience.company}
            </h3>
            {experience.department && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {experience.department}
              </p>
            )}
          </div>
        </div>

        {/* 职位和时间信息 */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center text-green-600 dark:text-green-400">
              <PositionIcon />
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                {experience.position}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {experience.current ? '当前职位' : '历史职位'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400">
              <CalendarIcon />
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                {experience.duration}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {experience.current ? '至今' : '已结束'}
              </p>
            </div>
          </div>
        </div>

        {/* 展开/收起按钮 */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 mb-4"
        >
          <span className="font-medium text-gray-700 dark:text-gray-300">
            {isExpanded ? '收起详情' : '查看详情'}
          </span>
          <ChevronDownIcon isExpanded={isExpanded} />
        </button>

        {/* 展开的内容 */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              variants={expandedContentVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="space-y-6"
            >
              {/* 工作职责 */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  工作职责
                </h4>
                <ul className="space-y-2">
                  {experience.responsibilities.map((responsibility, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-2 text-gray-600 dark:text-gray-300 text-sm"
                    >
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                      {responsibility}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* 主要成就 */}
              {experience.achievements && experience.achievements.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    主要成就
                  </h4>
                  <ul className="space-y-2">
                    {experience.achievements.map((achievement, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 + 0.2 }}
                        className="flex items-start gap-2 text-gray-600 dark:text-gray-300 text-sm"
                      >
                        <div className="text-green-500 mt-0.5">
                          <AchievementIcon />
                        </div>
                        {achievement}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* 底部装饰线 */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: index * 0.2 + 0.8, duration: 0.5 }}
        className={`h-1 transform origin-left ${
          experience.current 
            ? 'bg-gradient-to-r from-green-500 to-blue-500' 
            : 'bg-gradient-to-r from-blue-500 to-purple-500'
        }`}
        style={{ width: '100%' }}
      />
    </motion.div>
  );
};