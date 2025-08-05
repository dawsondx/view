import React from 'react';
import { motion } from 'framer-motion';
import { PersonalInfo } from '../../types';
import { useTypewriter } from '../../hooks';
import { ContactLink } from '../ui/ContactLink';
import { Avatar } from '../ui/Avatar';
import { fadeInUp, staggerContainer, wave, float } from '../../utils/animations';

interface HeroSectionProps {
  personalInfo: PersonalInfo;
}

// Simple icons as SVG components
const EmailIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const WeChatIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 4.882-1.932 7.621-.55-.302-2.676-2.476-4.991-5.748-6.294C9.466 2.884 9.081 2.188 8.691 2.188z" />
    <path d="M17.31 11.19c-3.573 0-6.426 2.385-6.426 5.315 0 1.694.94 3.206 2.424 4.223a.462.462 0 0 1 .167.525l-.312 1.191a.326.326 0 0 0-.029.141c0 .108.086.195.195.195a.233.233 0 0 0 .117-.039l1.514-.882a.694.694 0 0 1 .573-.079 8.265 8.265 0 0 0 2.277.316c3.573 0 6.426-2.385 6.426-5.315s-2.853-5.315-6.426-5.315z" />
  </svg>
);

const LocationIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const HeroSection: React.FC<HeroSectionProps> = ({ personalInfo }) => {
  const typewriterText = useTypewriter({
    words: personalInfo.tags,
    typeSpeed: 100,
    deleteSpeed: 50,
    delayBetweenWords: 2000,
  });

  const containerVariants = staggerContainer;
  const itemVariants = fadeInUp;

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50 relative overflow-hidden pt-20">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      </div>

      <motion.div
        className="container-max relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left side - Personal Info */}
          <motion.div className="flex-1 text-center lg:text-left" variants={itemVariants}>
            {/* Name */}
            <motion.h1
              className="text-5xl lg:text-6xl font-bold text-gray-900 mb-4"
              variants={itemVariants}
            >
              {personalInfo.name.split('').map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  whileHover={{ ...wave.animate, color: '#3B82F6' }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>

            {/* Typewriter Title */}
            <motion.div
              className="h-16 mb-6"
              variants={itemVariants}
            >
              <h2 className="text-2xl lg:text-3xl font-semibold text-gradient">
                {typewriterText}
                <span className="animate-pulse">|</span>
              </h2>
            </motion.div>

            {/* Basic Info */}
            <motion.div
              className="space-y-4 mb-8 text-gray-600"
              variants={itemVariants}
            >
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <LocationIcon />
                <span>{personalInfo.location}</span>
              </div>

              {/* 基础服务介绍 */}
              <div className="space-y-2">
                {personalInfo.selfIntro.map((intro, index) => (
                  <motion.p
                    key={index}
                    className="text-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <span className="font-semibold text-primary-600">{intro}</span>
                  </motion.p>
                ))}
              </div>
            </motion.div>

            {/* 标签展示区域 */}
            <motion.div
              className="mb-8"
              variants={itemVariants}
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center lg:text-left">身份标签</h3>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {personalInfo.tags.map((tag, index) => (
                  <motion.span
                    key={index}
                    className="px-3 py-1 bg-gradient-to-r from-primary-100 to-accent-100 text-primary-700 rounded-full text-sm font-medium border border-primary-200"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* 个人故事展示区域 */}
            <motion.div
              className="mb-8 bg-white/50 backdrop-blur-sm rounded-lg p-6 border border-gray-200"
              variants={itemVariants}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center lg:text-left">个人成长故事</h3>
              <div className="space-y-3">
                {personalInfo.personalStory.map((story, index) => (
                  <motion.p
                    key={index}
                    className="text-gray-700 leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 + index * 0.2 }}
                  >
                    {story}
                  </motion.p>
                ))}
              </div>
            </motion.div>

            {/* Contact Links */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              variants={itemVariants}
            >
              <ContactLink
                href={personalInfo.email}
                icon={<EmailIcon />}
                label="发送邮件"
                type="email"
              />
              <ContactLink
                href={personalInfo.wechat}
                icon={<WeChatIcon />}
                label="微信联系"
                type="wechat"
              />
            </motion.div>
          </motion.div>

          {/* Right side - Avatar and Info Card */}
          <motion.div className="flex-1 flex justify-center" variants={itemVariants}>
            <div className="relative">
              {/* Avatar */}
              <Avatar name={personalInfo.name} src="touxiang.webp" size="xl" />

              {/* Floating info card */}
              <motion.div
                className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-6 max-w-xs"
                initial={{ opacity: 0, scale: 0.8 }}
                variants={{
                  visible: { opacity: 1, scale: 1 }
                }}
                transition={{ delay: 0.8, duration: 0.5 }}
                whileHover={{ y: -5 }}
                {...float}
              >
                <div className="text-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2 animate-pulse"></div>
                  <p className="text-sm font-semibold text-gray-800 mb-1">
                    开放合作
                  </p>
                  <p className="text-xs text-gray-600">
                    {personalInfo.title}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    微信: {personalInfo.wechat}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <div className="flex flex-col items-center text-gray-400">
            <span className="text-sm mb-2">向下滚动</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};