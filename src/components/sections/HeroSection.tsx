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

const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
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
    words: [personalInfo.title, personalInfo.currentJob, '产品经理', '综合部经理', '项目经理'],
    typeSpeed: 100,
    deleteSpeed: 50,
    delayBetweenWords: 2000,
  });

  const containerVariants = staggerContainer;
  const itemVariants = fadeInUp;

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50 relative overflow-hidden">
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
              className="space-y-2 mb-8 text-gray-600"
              variants={itemVariants}
            >
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <LocationIcon />
                <span>{personalInfo.location}</span>
              </div>
              <p className="text-lg">
                {personalInfo.age}岁 • {personalInfo.education} • {personalInfo.major}
              </p>
              <p className="text-lg">
                毕业于 <span className="font-semibold text-primary-600">{personalInfo.university}</span>
              </p>
              <p className="text-lg">
                现任 <span className="font-semibold text-primary-600">{personalInfo.company}</span> {personalInfo.currentJob}
              </p>
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
                href={personalInfo.phone}
                icon={<PhoneIcon />}
                label="拨打电话"
                type="phone"
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
                    {personalInfo.status}
                  </p>
                  <p className="text-xs text-gray-600">
                    {personalInfo.company}
                  </p>
                  <p className="text-xs text-gray-600">
                    {personalInfo.currentJob}
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