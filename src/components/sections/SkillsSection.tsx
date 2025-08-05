import React from 'react';
import { motion } from 'framer-motion';
import { Skill, SkillLevel } from '../../types';
import { Section } from '../common/Section';

interface SkillsSectionProps {
  skills: Skill[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  // 按类别分组技能
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  // 技能等级配置
  const levelConfig = {
    [SkillLevel.EXPERT]: { label: '精通', color: 'emerald', percentage: 100 },
    [SkillLevel.PROFICIENT]: { label: '熟练', color: 'blue', percentage: 80 },
    [SkillLevel.GOOD]: { label: '良好', color: 'yellow', percentage: 60 },
    [SkillLevel.BEGINNER]: { label: '入门', color: 'gray', percentage: 40 }
  };

  // 类别配置
  const categoryConfig = {
    '办公软件': {
      icon: '📊',
      color: 'blue',
      bgGradient: 'from-blue-500 to-cyan-600'
    },
    '设计软件': {
      icon: '🎨',
      color: 'purple',
      bgGradient: 'from-purple-500 to-pink-600'
    },
    '新兴技术': {
      icon: '🤖',
      color: 'green',
      bgGradient: 'from-green-500 to-emerald-600'
    },
    '编程技能': {
      icon: '💻',
      color: 'orange',
      bgGradient: 'from-orange-500 to-red-600'
    }
  };

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

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <Section id="skills" className="bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto"
      >
        {/* 标题区域 */}
        <div className="text-center mb-16">
          <motion.h2
            variants={titleVariants}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            专业技能
          </motion.h2>
          
          <motion.div
            variants={titleVariants}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent flex-1 max-w-20" />
            <div className="w-3 h-3 bg-blue-500 rounded-full" />
            <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent flex-1 max-w-20" />
          </motion.div>
          
          <motion.p
            variants={titleVariants}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            专注四大核心技能领域，持续精进专业能力
          </motion.p>
        </div>

        {/* 技能分类展示 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {Object.entries(skillsByCategory).map(([category, categorySkills], categoryIndex) => {
            const config = categoryConfig[category as keyof typeof categoryConfig];
            if (!config) return null;

            return (
              <motion.div
                key={category}
                variants={cardVariants}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 h-full border border-gray-100 dark:border-gray-700">
                  {/* 类别标题 */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-12 h-12 bg-gradient-to-r ${config.bgGradient} rounded-xl flex items-center justify-center text-white text-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {config.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {category}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {categorySkills.length} 项技能
                      </p>
                    </div>
                  </div>

                  {/* 技能列表 */}
                  <div className="space-y-4">
                    {categorySkills.map((skill, skillIndex) => {
                      const levelInfo = levelConfig[skill.level];
                      return (
                        <motion.div
                          key={skill.id}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ 
                            duration: 0.4, 
                            delay: categoryIndex * 0.1 + skillIndex * 0.05 
                          }}
                          className="group/skill"
                        >
                          {/* 技能名称和等级 */}
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900 dark:text-white group-hover/skill:text-blue-600 dark:group-hover/skill:text-blue-400 transition-colors duration-200">
                              {skill.name}
                            </h4>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full bg-${levelInfo.color}-100 text-${levelInfo.color}-700 dark:bg-${levelInfo.color}-900/30 dark:text-${levelInfo.color}-300`}>
                              {levelInfo.label}
                            </span>
                          </div>

                          {/* 技能描述 */}
                          {skill.description && (
                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 leading-relaxed">
                              {skill.description}
                            </p>
                          )}

                          {/* 技能进度条 */}
                          <div className="relative">
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <motion.div
                                className={`h-2 bg-gradient-to-r ${config.bgGradient} rounded-full`}
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.customPercentage || levelInfo.percentage}%` }}
                                viewport={{ once: true }}
                                transition={{ 
                                  duration: 1, 
                                  delay: categoryIndex * 0.2 + skillIndex * 0.1,
                                  ease: "easeOut"
                                }}
                              />
                            </div>
                            <div className="absolute -top-1 right-0 text-xs text-gray-500 dark:text-gray-400">
                              {skill.customPercentage || levelInfo.percentage}%
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 技能统计概览 */}
        <motion.div
          variants={cardVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{skills.length}</h3>
            <p className="text-gray-600 dark:text-gray-300">项技能</p>
          </div>

          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center text-green-600 dark:text-green-400 mx-auto mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {skills.filter(s => s.level === SkillLevel.EXPERT).length}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">精通技能</p>
          </div>

          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400 mx-auto mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">4</h3>
            <p className="text-gray-600 dark:text-gray-300">个分类</p>
          </div>

          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center text-orange-600 dark:text-orange-400 mx-auto mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {Math.round((skills.filter(s => s.level === SkillLevel.EXPERT).length / skills.length) * 100)}%
            </h3>
            <p className="text-gray-600 dark:text-gray-300">精通率</p>
          </div>
        </motion.div>

        {/* 底部总结 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl p-8 text-white relative overflow-hidden">
            {/* 装饰性背景 */}
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full transform -translate-x-16 -translate-y-16" />
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full transform translate-x-12 translate-y-12" />
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">
                专业技能，持续精进
              </h3>
              <p className="text-blue-100 max-w-2xl mx-auto mb-6">
                专注于Office办公、设计创作、新兴技术和编程开发四大核心领域，不断学习新技术，提升专业能力，为用户提供更优质的服务。
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
                  <span>📊</span>
                  <span>Office专家</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
                  <span>🎨</span>
                  <span>设计能手</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
                  <span>🤖</span>
                  <span>AI应用</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
                  <span>💻</span>
                  <span>编程开发</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
};