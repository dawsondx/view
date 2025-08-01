import React from 'react';
import { motion } from 'framer-motion';
import { Education } from '../../types';

interface EducationTimelineProps {
  education: Education[];
}

interface TimelineItemProps {
  education: Education;
  index: number;
  isLast: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ education, index, isLast }) => {
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

  const is211School = education.schoolType?.includes('211');

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
            className="w-0.5 h-24 bg-gradient-to-b from-blue-500 to-purple-500 transform origin-top mt-16"
          />
        )}
        
        {/* 时间点 */}
        <motion.div
          variants={dotVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative z-10 w-4 h-4 bg-white border-4 border-blue-500 rounded-full shadow-lg"
        >
          {/* 脉冲效果 */}
          <div className="absolute inset-0 w-4 h-4 bg-blue-500 rounded-full animate-ping opacity-20" />
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
          <div className={`absolute top-6 ${index % 2 === 0 ? '-right-2' : '-left-2'} w-4 h-4 bg-white dark:bg-gray-800 transform rotate-45 shadow-md`} />
          
          {/* 211标识 */}
          {is211School && (
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-md">
              211
            </div>
          )}

          {/* 时间标签 */}
          <div className="mb-4">
            <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
              {education.duration}
            </span>
          </div>

          {/* 学校信息 */}
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {education.school}
          </h3>
          
          {education.schoolType && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              {education.schoolType}
            </p>
          )}

          {/* 专业和学历 */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="font-semibold text-gray-900 dark:text-white">
                {education.major}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full" />
              <span className="text-gray-600 dark:text-gray-300">
                {education.degree}
              </span>
            </div>
          </div>

          {/* 描述 */}
          {education.description && (
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {education.description}
            </p>
          )}

          {/* 底部装饰 */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-b-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        </div>
      </motion.div>
    </div>
  );
};

export const EducationTimeline: React.FC<EducationTimelineProps> = ({ education }) => {
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="relative max-w-6xl mx-auto py-12"
    >
      {/* 主时间线 */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-200 via-purple-200 to-blue-200 dark:from-blue-800 dark:via-purple-800 dark:to-blue-800" />
      
      {/* 时间线项目 */}
      <div className="space-y-16">
        {education.map((edu, index) => (
          <TimelineItem
            key={edu.id}
            education={edu}
            index={index}
            isLast={index === education.length - 1}
          />
        ))}
      </div>
    </motion.div>
  );
};