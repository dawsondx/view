import React from 'react';
import { motion } from 'framer-motion';
import { TraitCard } from '../ui/TraitCard';
import { Section } from '../common/Section';

interface EvaluationSectionProps {
  selfEvaluation: string[];
}

export const EvaluationSection: React.FC<EvaluationSectionProps> = ({ selfEvaluation }) => {
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

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.2,
        ease: "easeOut"
      }
    }
  };

  const quoteVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.4,
        ease: "easeOut"
      }
    }
  };

  // 核心特质数据
  const coreTraits = [
    {
      title: "学习能力",
      description: "具有强烈的学习能力和适应能力，能够快速掌握新技术和新工具，持续保持技术敏感度",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      color: 'blue' as const
    },
    {
      title: "团队协作",
      description: "拥有优秀的沟通协调能力，善于团队合作和跨部门协作，能够有效整合团队资源",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: 'green' as const
    },
    {
      title: "分享精神",
      description: "注重分享和知识传递，积极参与技术交流和团队培训，热爱技术分享和经验传播",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
        </svg>
      ),
      color: 'purple' as const
    },
    {
      title: "领导能力",
      description: "在大学期间积极参与各类活动，担任学生会干部，锻炼了组织和领导能力",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      color: 'orange' as const
    },
    {
      title: "执行力",
      description: "具有强烈的责任心和执行力，能够在压力下保持高效工作，确保项目按时交付",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: 'pink' as const
    },
    {
      title: "创新思维",
      description: "善于分析和解决复杂问题，具备系统性思维和创新意识，能够提出有效的解决方案",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      color: 'indigo' as const
    }
  ];

  return (
    <Section id="evaluation" className="bg-white dark:bg-gray-900">
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
            自我评价
          </motion.h2>
          
          <motion.div
            variants={subtitleVariants}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent flex-1 max-w-20" />
            <div className="w-3 h-3 bg-emerald-500 rounded-full" />
            <div className="h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent flex-1 max-w-20" />
          </motion.div>
          
          <motion.p
            variants={subtitleVariants}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            个人特质与能力的全面展示，持续成长的见证
          </motion.p>
        </div>

        {/* 个人格言 */}
        <motion.div
          variants={quoteVariants}
          className="mb-16 text-center"
        >
          <div className="relative inline-block">
            <div className="absolute -top-4 -left-4 text-6xl text-emerald-500/20 font-serif">"</div>
            <div className="absolute -bottom-4 -right-4 text-6xl text-emerald-500/20 font-serif">"</div>
            <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white italic px-8 py-4">
              持续学习，不断进步，用技术创造价值
            </blockquote>
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            — 段翔的职业理念
          </p>
        </motion.div>

        {/* 核心特质网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {coreTraits.map((trait, index) => (
            <TraitCard
              key={trait.title}
              title={trait.title}
              description={trait.description}
              icon={trait.icon}
              index={index}
              color={trait.color}
            />
          ))}
        </div>

        {/* 详细自我评价 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 mb-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            详细评价
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {selfEvaluation.map((evaluation, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-3 p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm"
              >
                <div className="flex-shrink-0 w-6 h-6 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mt-0.5">
                  <svg className="w-3 h-3 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {evaluation}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 成长历程时间线 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            成长历程
          </h3>
          <div className="relative">
            {/* 时间线 */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-emerald-200 via-blue-200 to-purple-200 dark:from-emerald-800 dark:via-blue-800 dark:to-purple-800" />
            
            <div className="space-y-12">
              {[
                {
                  period: "大学时期",
                  title: "基础能力培养",
                  description: "担任学生会干部，参与各类活动，培养组织协调能力和领导力",
                  color: "emerald"
                },
                {
                  period: "职业初期",
                  title: "技术能力积累",
                  description: "专注技术学习和实践，快速掌握新技术，建立扎实的技术基础",
                  color: "blue"
                },
                {
                  period: "成长阶段",
                  title: "综合能力提升",
                  description: "从技术专家向项目管理转型，培养团队协作和项目管理能力",
                  color: "purple"
                },
                {
                  period: "现在",
                  title: "持续学习成长",
                  description: "保持技术敏感度，注重知识分享，追求个人和团队的共同成长",
                  color: "pink"
                }
              ].map((milestone, index) => (
                <motion.div
                  key={milestone.period}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                >
                  {/* 时间点 */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-4 border-emerald-500 rounded-full shadow-lg z-10" />
                  
                  {/* 内容卡片 */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 text-xs font-medium rounded-full">
                          {milestone.period}
                        </span>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {milestone.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 底部装饰 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-full shadow-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="font-medium">用心做事，用情待人，用智慧创造</span>
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
};