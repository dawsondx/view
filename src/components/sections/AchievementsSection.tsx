import React from 'react';
import { motion } from 'framer-motion';
import { Achievement } from '../../types';
import { Section } from '../common/Section';

interface AchievementsSectionProps {
  achievements: Achievement[];
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({ achievements }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15
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
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // 按类别分组成就
  const groupedAchievements = achievements.reduce((acc, achievement) => {
    if (!acc[achievement.category]) {
      acc[achievement.category] = [];
    }
    acc[achievement.category].push(achievement);
    return acc;
  }, {} as Record<string, Achievement[]>);

  // 类别配置
  const categoryConfig = {
    education: {
      title: '教育培训',
      icon: '🎓',
      color: 'blue',
      bgColor: 'from-blue-500 to-indigo-600'
    },
    design: {
      title: '设计作品',
      icon: '🎨',
      color: 'purple',
      bgColor: 'from-purple-500 to-pink-600'
    },
    tools: {
      title: '工具收藏',
      icon: '🔧',
      color: 'green',
      bgColor: 'from-green-500 to-emerald-600'
    },
    ai: {
      title: 'AI应用',
      icon: '🤖',
      color: 'orange',
      bgColor: 'from-orange-500 to-red-600'
    }
  };

  return (
    <Section id="achievements" className="bg-gradient-to-br from-slate-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto"
      >
        {/* 标题区域 */}
        <div className="text-center mb-16">
          <motion.h2
            variants={titleVariants}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            成就展示
          </motion.h2>

          <motion.div
            variants={titleVariants}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent flex-1 max-w-20" />
            <div className="w-3 h-3 bg-indigo-500 rounded-full" />
            <div className="h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent flex-1 max-w-20" />
          </motion.div>

          <motion.p
            variants={titleVariants}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            用数据说话，展示在各个领域取得的具体成果和影响力
          </motion.p>
        </div>

        {/* 成就统计概览 */}
        <motion.div
          variants={cardVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {achievements.filter(a => a.metrics && !['qiuye-office', 'career-accelerator'].includes(a.id)).map((achievement) => (
            <motion.div
              key={achievement.id}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center border border-gray-100 dark:border-gray-700"
            >
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                {achievement.metrics?.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                {achievement.metrics?.label}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {achievement.title}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 分类成就展示 */}
        <div className="space-y-12">
          {Object.entries(groupedAchievements).map(([category, categoryAchievements]) => {
            const config = categoryConfig[category as keyof typeof categoryConfig];
            if (!config) return null;

            return (
              <motion.div
                key={category}
                variants={cardVariants}
                className="relative"
              >
                {/* 类别标题 */}
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-12 h-12 bg-gradient-to-r ${config.bgColor} rounded-xl flex items-center justify-center text-white text-xl shadow-lg`}>
                    {config.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {config.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {categoryAchievements.length} 项成就
                    </p>
                  </div>
                </div>

                {/* 成就卡片网格 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryAchievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{
                        y: -8,
                        transition: { duration: 0.3 }
                      }}
                      className="group relative"
                    >
                      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 h-full border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col">
                        {/* 装饰性背景 */}
                        <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${config.bgColor} opacity-10 rounded-full transform translate-x-6 -translate-y-6`} />

                        {/* 上方内容区域 - 自动填充剩余空间 */}
                        <div className="flex-1 relative z-10">
                          {/* 成就标题 */}
                          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                            {achievement.title}
                          </h4>

                          {/* 成就描述 */}
                          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                            {achievement.description}
                          </p>
                        </div>

                        {/* 底部数据指标区域 - 固定在底部 */}
                        {achievement.metrics && (
                          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 relative z-10">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 bg-gradient-to-r ${config.bgColor} rounded-full`} />
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {achievement.metrics.label}
                                </span>
                              </div>
                              <div className={`text-lg font-bold text-${config.color}-600 dark:text-${config.color}-400`}>
                                {achievement.metrics.value}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* 悬浮效果指示器 */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-600 to-transparent group-hover:via-indigo-500 transition-all duration-300" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 免费资源展示 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 mb-16"
        >
          <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-2xl p-8 text-white relative overflow-hidden">
            {/* 装饰性背景 */}
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full transform translate-x-20 -translate-y-20" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full transform -translate-x-16 translate-y-16" />

            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* 左侧内容 */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🔧</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">
                        免费资源分享
                      </h3>
                      <p className="text-green-100 text-sm">
                        ima知识库《工具神器搜罗》
                      </p>
                    </div>
                  </div>

                  <p className="text-green-100 mb-6 leading-relaxed">
                    入选ima官方每周精选知识库(7.21-7.27)，已有<span className="font-bold text-white">5000+人</span>加入学习。
                    涵盖办公效率、设计创作、开发工具、AI应用等各个领域，持续更新中。
                  </p>

                  <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6">
                    <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 text-sm">
                      <span>📊</span>
                      <span>办公效率工具</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 text-sm">
                      <span>🎨</span>
                      <span>设计创作工具</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 text-sm">
                      <span>🤖</span>
                      <span>AI智能工具</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 text-sm">
                      <span>💻</span>
                      <span>开发工具</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={() => window.open('https://ima.qq.com/wiki/?shareId=07061007500c6201187ddb696ec0b8417b2d3a74dc33a558bdf9f6d070410ef9', '_blank')}
                    >
                      立即访问知识库
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white/20 text-white px-6 py-3 rounded-lg font-semibold border border-white/30 hover:bg-white/30 transition-all duration-300"
                      onClick={() => {
                        navigator.clipboard.writeText('dawsondx00').then(() => {
                          alert('微信号已复制，添加好友获取更多资源');
                        });
                      }}
                    >
                      微信获取更多
                    </motion.button>
                  </div>
                </div>

                {/* 右侧二维码 */}
                <div className="flex-shrink-0">
                  <div className="bg-white rounded-2xl p-6 shadow-2xl">
                    <div className="w-40 h-40 rounded-xl overflow-hidden mb-4">
                      <img
                        src="/qrcode-ima.webp"
                        alt="ima知识库二维码"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // 如果图片加载失败，显示占位符
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const placeholder = target.nextElementSibling as HTMLElement;
                          if (placeholder) placeholder.style.display = 'flex';
                        }}
                      />
                      {/* 占位符，当图片加载失败时显示 */}
                      <div
                        className="w-full h-full bg-gray-100 rounded-xl flex items-center justify-center text-center text-gray-500"
                        style={{ display: 'none' }}
                      >
                        <div>
                          <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                            <span className="text-2xl">🔧</span>
                          </div>
                          <p className="text-sm font-medium">扫码访问</p>
                          <p className="text-xs">工具神器搜罗</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm text-center font-medium">
                      扫码加入知识库
                    </p>
                    <div className="flex items-center justify-center gap-1 mt-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-gray-500">5000+人已加入</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 底部总结 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-8 text-white relative overflow-hidden">
            {/* 装饰性背景 */}
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full transform -translate-x-16 -translate-y-16" />
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full transform translate-x-12 translate-y-12" />

            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">
                持续创造价值，追求卓越成果
              </h3>
              <p className="text-indigo-100 max-w-2xl mx-auto mb-6">
                每一个数字背后都是对专业的坚持和对用户的用心服务。未来将继续在各个领域深耕，创造更大的价值和影响力。
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
                  <span>🎯</span>
                  <span>专业专注</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
                  <span>📈</span>
                  <span>持续成长</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
                  <span>🤝</span>
                  <span>价值共创</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
};