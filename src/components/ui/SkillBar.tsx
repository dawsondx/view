import React from 'react';
import { motion } from 'framer-motion';
import { Skill } from '../../types';
import { getSkillLevelText, getSkillLevelValue, getCustomSkillValue } from '../../utils/dataProcessing';

interface SkillBarProps {
  skill: Skill;
  index: number;
}

export const SkillBar: React.FC<SkillBarProps> = ({ skill, index }) => {
  const customValue = getCustomSkillValue(skill.name);
  const levelValue = customValue !== null ? customValue : getSkillLevelValue(skill.level);
  const levelText = getSkillLevelText(skill.level);

  const containerVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut"
      }
    }
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: {
      width: `${levelValue}%`,
      transition: {
        duration: 1,
        delay: index * 0.1 + 0.3,
        ease: "easeOut"
      }
    }
  };

  const getProgressColor = (level: string) => {
    switch (level) {
      case 'expert':
        return 'from-green-500 to-emerald-500';
      case 'proficient':
        return 'from-blue-500 to-cyan-500';
      case 'good':
        return 'from-yellow-500 to-orange-500';
      case 'beginner':
        return 'from-gray-400 to-gray-500';
      default:
        return 'from-blue-500 to-purple-500';
    }
  };

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case 'expert':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'proficient':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'good':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'beginner':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="group"
    >
      {/* 技能名称和等级 */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {skill.name}
          </h4>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelBadgeColor(skill.level)}`}>
            {levelText}
          </span>
        </div>
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
          {levelValue}%
        </span>
      </div>

      {/* 进度条 */}
      <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          variants={progressVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={`absolute top-0 left-0 h-full bg-gradient-to-r ${getProgressColor(skill.level)} rounded-full`}
        />
        
        {/* 进度条光效 */}
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{
            duration: 2,
            delay: index * 0.1 + 0.8,
            ease: "easeInOut"
          }}
          className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent transform skew-x-12"
        />
      </div>

      {/* 技能描述 */}
      {skill.description && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          whileInView={{ opacity: 1, height: "auto" }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.5 }}
          className="mt-2 text-sm text-gray-600 dark:text-gray-300 leading-relaxed"
        >
          {skill.description}
        </motion.p>
      )}
    </motion.div>
  );
};