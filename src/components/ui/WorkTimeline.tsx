import React from 'react';
import { motion } from 'framer-motion';
import { WorkExperience } from '../../types';
import { sortWorkExperienceByDate } from '../../utils/dataProcessing';

interface WorkTimelineProps {
  workExperience: WorkExperience[];
}

interface TimelineItemProps {
  experience: WorkExperience;
  index: number;
  isLast: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ experience, index, isLast }) => {
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: index % 2 === 0 ? -50 : 50,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.3,
        ease: "easeOut"
      }
    }
  };

  const lineVariants = {
    hidden: { scaleY: 0 },
    visible: { 
      scaleY: 1,
      transition: {
        duration: 0.8,
        delay: index * 0.3 + 0.2,
        ease: "easeOut"
      }
    }
  };

  const dotVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.3 + 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="relative flex items-center">
      {/* 时间线 */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        {/* 连接线 */}
        {!isLast && (
          <motion.div
            variants={lineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`w-0.5 h-32 transform origin-top mt-20 ${
              experience.current 
                ? 'bg-gradient-to-b from-green-500 to-blue-500' 
                : 'bg-gradient-to-b from-blue-500 to-purple-500'
            }`}
          />
        )}
        
        {/* 时间点 */}
        <motion.div
          variants={dotVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={`relative z-10 w-6 h-6 border-4 rounded-full shadow-lg ${
            experience.current 
              ? 'bg-green-500 border-green-300' 
              : 'bg-white border-blue-500'
          }`}
        >
          {/* 当前职位的脉冲效果 */}
          {experience.current && (
            <div className="absolute inset-0 w-6 h-6 bg-green-500 rounded-full animate-ping opacity-20" />
          )}
        </motion.div>
      </div>

      {/* 内容卡片 */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className={`w-5/12 ${index % 2 === 0 ? 'mr-auto pr-8' : 'ml-auto pl-8'}`}
      >
        <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 group">
          {/* 箭头指示器 */}
          <div className={`absolute top-8 ${index % 2 === 0 ? '-right-2' : '-left-2'} w-4 h-4 bg-white dark:bg-gray-800 transform rotate-45 shadow-md`} />
          
          {/* 当前职位标识 */}
          {experience.current && (
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-400 to-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              在职
            </div>
          )}

          {/* 时间标签 */}
          <div className="mb-4">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              experience.current 
                ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' 
                : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
            }`}>
              {experience.duration}
            </span>
          </div>

          {/* 公司和职位信息 */}
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {experience.company}
          </h3>
          
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
            {experience.position}
          </p>

          {experience.department && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {experience.department}
            </p>
          )}

          {/* 主要职责预览 */}
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900 dark:text-white text-sm">主要职责：</h4>
            <ul className="space-y-1">
              {experience.responsibilities.slice(0, 2).map((responsibility, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-600 dark:text-gray-300 text-sm">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                  {responsibility}
                </li>
              ))}
              {experience.responsibilities.length > 2 && (
                <li className="text-gray-500 dark:text-gray-400 text-sm italic">
                  ...还有 {experience.responsibilities.length - 2} 项职责
                </li>
              )}
            </ul>
          </div>

          {/* 主要成就预览 */}
          {experience.achievements && experience.achievements.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-2">主要成就：</h4>
              <div className="text-gray-600 dark:text-gray-300 text-sm">
                {experience.achievements[0]}
                {experience.achievements.length > 1 && (
                  <span className="text-gray-500 dark:text-gray-400 italic">
                    {' '}等 {experience.achievements.length} 项成就
                  </span>
                )}
              </div>
            </div>
          )}

          {/* 底部装饰 */}
          <div className={`absolute bottom-0 left-0 right-0 h-1 rounded-b-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${
            experience.current 
              ? 'bg-gradient-to-r from-green-500 to-blue-500' 
              : 'bg-gradient-to-r from-blue-500 to-purple-500'
          }`} />
        </div>
      </motion.div>
    </div>
  );
};

export const WorkTimeline: React.FC<WorkTimelineProps> = ({ workExperience }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  // 按时间倒序排列
  const sortedExperience = sortWorkExperienceByDate(workExperience);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="relative max-w-6xl mx-auto py-12"
    >
      {/* 主时间线 */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-green-200 via-blue-200 to-purple-200 dark:from-green-800 dark:via-blue-800 dark:to-purple-800" />
      
      {/* 时间线项目 */}
      <div className="space-y-20">
        {sortedExperience.map((experience, index) => (
          <TimelineItem
            key={experience.id}
            experience={experience}
            index={index}
            isLast={index === sortedExperience.length - 1}
          />
        ))}
      </div>
    </motion.div>
  );
};