import React from 'react';
import { motion } from 'framer-motion';
import { PersonalInfo } from '../../types';
import { Section } from '../common/Section';

interface ContactSectionProps {
  personalInfo: PersonalInfo;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ personalInfo }) => {
  const handleEmailClick = () => {
    window.location.href = `mailto:${personalInfo.email}`;
  };

  const handleWeChatClick = () => {
    // 复制微信号到剪贴板
    navigator.clipboard.writeText(personalInfo.wechat).then(() => {
      alert(`微信号 ${personalInfo.wechat} 已复制到剪贴板`);
    });
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
    <Section id="contact" className="bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-4xl mx-auto"
      >
        {/* 标题区域 */}
        <div className="text-center mb-16">
          <motion.h2
            variants={titleVariants}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            联系方式
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
            期待与您的交流合作，共同创造更多可能
          </motion.p>
        </div>

        {/* 联系信息卡片 - 仅保留三项 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* 邮箱 */}
          <motion.div
            variants={cardVariants}
            className="flex flex-col items-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group border border-gray-100 dark:border-gray-700"
            onClick={handleEmailClick}
            whileHover={{ scale: 1.02, y: -8 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors duration-300">
              <svg className="w-10 h-10 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              邮箱联系
            </h4>
            <p className="text-blue-600 dark:text-blue-400 text-center break-all font-medium">
              {personalInfo.email}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 text-center">
              点击发送邮件
            </p>
          </motion.div>

          {/* 微信 */}
          <motion.div
            variants={cardVariants}
            className="flex flex-col items-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group border border-gray-100 dark:border-gray-700"
            onClick={handleWeChatClick}
            whileHover={{ scale: 1.02, y: -8 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6 group-hover:bg-green-200 dark:group-hover:bg-green-800/50 transition-colors duration-300">
              <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 4.882-1.932 7.621-.55-.302-2.676-2.476-4.991-5.748-6.294C9.466 2.884 9.081 2.188 8.691 2.188z"/>
                <path d="M17.31 11.19c-3.573 0-6.426 2.385-6.426 5.315 0 1.694.94 3.206 2.424 4.223a.462.462 0 0 1 .167.525l-.312 1.191a.326.326 0 0 0-.029.141c0 .108.086.195.195.195a.233.233 0 0 0 .117-.039l1.514-.882a.694.694 0 0 1 .573-.079 8.265 8.265 0 0 0 2.277.316c3.573 0 6.426-2.385 6.426-5.315s-2.853-5.315-6.426-5.315z"/>
              </svg>
            </div>
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
              微信联系
            </h4>
            <p className="text-green-600 dark:text-green-400 font-medium">
              {personalInfo.wechat}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 text-center">
              点击复制微信号
            </p>
          </motion.div>

          {/* 位置 */}
          <motion.div
            variants={cardVariants}
            className="flex flex-col items-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-100 dark:border-gray-700"
            whileHover={{ scale: 1.02, y: -8 }}
          >
            <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-6 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/50 transition-colors duration-300">
              <svg className="w-10 h-10 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
              所在位置
            </h4>
            <p className="text-purple-600 dark:text-purple-400 font-medium">
              {personalInfo.location}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 text-center">
              欢迎线下交流
            </p>
          </motion.div>
        </div>
        {/* 微信二维码展示 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 rounded-2xl p-8 text-white relative overflow-hidden">
            {/* 装饰性背景 */}
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full transform -translate-x-16 -translate-y-16" />
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full transform translate-x-12 translate-y-12" />
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">
                扫码添加微信，开启合作之旅
              </h3>
              <p className="text-blue-100 max-w-2xl mx-auto mb-8">
                微信号：{personalInfo.wechat} | 欢迎扫码添加，讨论Office培训、PPT设计、神器分享等合作机会
              </p>
              
              {/* 微信二维码 */}
              <div className="inline-block bg-white rounded-2xl p-6 shadow-2xl">
                <div className="w-48 h-48 rounded-xl overflow-hidden mx-auto mb-4">
                  <img
                    src="/qrcode-wechat.webp"
                    alt="微信二维码"
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
                      <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 4.882-1.932 7.621-.55-.302-2.676-2.476-4.991-5.748-6.294C9.466 2.884 9.081 2.188 8.691 2.188z"/>
                        <path d="M17.31 11.19c-3.573 0-6.426 2.385-6.426 5.315 0 1.694.94 3.206 2.424 4.223a.462.462 0 0 1 .167.525l-.312 1.191a.326.326 0 0 0-.029.141c0 .108.086.195.195.195a.233.233 0 0 0 .117-.039l1.514-.882a.694.694 0 0 1 .573-.079 8.265 8.265 0 0 0 2.277.316c3.573 0 6.426-2.385 6.426-5.315s-2.853-5.315-6.426-5.315z"/>
                      </svg>
                      <p className="text-sm">微信二维码</p>
                      <p className="text-xs mt-1">{personalInfo.wechat}</p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm font-medium">
                  扫码添加微信好友
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
};