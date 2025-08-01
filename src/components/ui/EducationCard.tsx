import React from 'react';
import { motion } from 'framer-motion';
import { Education } from '../../types';

interface EducationCardProps {
  education: Education;
  index: number;
}

// 学校图标
const SchoolIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
  </svg>
);

// 日历图标
const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

// 学位图标
const DegreeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

export const EducationCard: React.FC<EducationCardProps> = ({ education, index }) => {
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

  // 判断是否为211学校
  const is211School = education.schoolType?.includes('211');

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
      {/* 背景装饰 */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full transform translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform duration-500" />
      
      {/* 211标识 */}
      {is211School && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.2 + 0.5 }}
          className="absolute top-4 right-4 z-10"
        >
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
            211工程
          </div>
        </motion.div>
      )}

      <div className="relative p-6 z-10 flex-1 flex flex-col">
        {/* 学校图标和名称 */}
        <div className="flex items-start gap-4 mb-4">
          <motion.div
            variants={iconVariants}
            className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400"
          >
            <SchoolIcon />
          </motion.div>
          
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              {education.school}
            </h3>
            {education.schoolType && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {education.schoolType}
              </p>
            )}
          </div>
        </div>

        {/* 专业和学历信息 */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center text-green-600 dark:text-green-400">
              <DegreeIcon />
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                {education.major}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {education.degree}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400">
              <CalendarIcon />
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                {education.duration}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {education.endYear - education.startYear}年学制
              </p>
            </div>
          </div>
        </div>

        {/* 描述信息 */}
        {education.description && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ delay: index * 0.2 + 0.7 }}
            className="pt-4 border-t border-gray-200 dark:border-gray-700"
          >
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {education.description}
            </p>
          </motion.div>
        )}

      </div>

      {/* 底部装饰线 */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: index * 0.2 + 0.8, duration: 0.5 }}
        className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform origin-left"
        style={{ width: '100%' }}
      />
    </motion.div>
  );
};