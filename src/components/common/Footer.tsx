import React from 'react';
import { motion } from 'framer-motion';
import { PersonalInfo } from '../../types';

import { SocialButtonWithQR } from '../ui/QRCodeTooltip';

interface FooterProps {
  personalInfo: PersonalInfo;
}

export const Footer: React.FC<FooterProps> = ({ personalInfo }) => {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const socialLinks = [
    {
      name: '知乎',
      href: 'https://www.zhihu.com/people/dawsondx',
      icon: <img src="/zh.svg" alt="知乎" className="w-5 h-5" />
    },
    {
      name: '公众号',
      icon: <img src="/gzh.svg" alt="公众号" className="w-5 h-5" />,
      qrCodeImage: '/qrcode-gzh.webp'
    },
    {
      name: '小红书',
      href: 'https://www.xiaohongshu.com/user/profile/6303a620000000001200d7bd',
      icon: <img src="/xhs.svg" alt="小红书" className="w-5 h-5" />
    },
    {
      name: '语雀',
      href: 'https://www.yuque.com/dawsondx',
      icon: <img src="/yq.svg" alt="语雀" className="w-5 h-5" />
    }
  ];

  const quickLinks = [
    { name: '个人介绍', href: '#hero' },
    { name: '专业技能', href: '#skills' },
    { name: '服务内容', href: '#services' },
    { name: '成就展示', href: '#achievements' },
    { name: '作品集', href: '#portfolio' },
    { name: '联系方式', href: '#contact' }
  ];

  const handleLinkClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.substring(1));
      if (element) {
        const headerHeight = 80;
        const elementPosition = element.offsetTop - headerHeight;

        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* 个人信息 */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4">{personalInfo.name}</h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              {personalInfo.title}，专注于技术创新和AI赋能，
              致力于用技术创造价值，推动个人终身成长。
            </p>
            <div className="flex items-center gap-2 text-gray-300 mb-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{personalInfo.location}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
              </svg>
              <span>{personalInfo.title}</span>
            </div>
          </motion.div>

          {/* 快速链接 */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-4">快速导航</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* 联系方式 */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-4">联系方式</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:${personalInfo.email}`} className="hover:text-white transition-colors duration-200">
                  {personalInfo.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 4.882-1.932 7.621-.55-.302-2.676-2.476-4.991-5.748-6.294C9.466 2.884 9.081 2.188 8.691 2.188z" />
                  <path d="M17.31 11.19c-3.573 0-6.426 2.385-6.426 5.315 0 1.694.94 3.206 2.424 4.223a.462.462 0 0 1 .167.525l-.312 1.191a.326.326 0 0 0-.029.141c0 .108.086.195.195.195a.233.233 0 0 0 .117-.039l1.514-.882a.694.694 0 0 1 .573-.079 8.265 8.265 0 0 0 2.277.316c3.573 0 6.426-2.385 6.426-5.315s-2.853-5.315-6.426-5.315z" />
                </svg>
                <span className="hover:text-white transition-colors duration-200">
                  微信: {personalInfo.wechat}
                </span>
              </div>
            </div>

            {/* 社交媒体链接 */}
            <div className="mt-6">
              <h5 className="text-sm font-medium mb-3">关注我</h5>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <SocialButtonWithQR
                    key={social.name}
                    name={social.name}
                    icon={social.icon}
                    href={social.href}
                    qrCodeImage={social.qrCodeImage}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* 分割线 */}
        <motion.div
          variants={itemVariants}
          className="border-t border-gray-800 mt-8 pt-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-400 text-sm">
              © {currentYear} {personalInfo.name}个人简历网站. 保留所有权利.
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <span>使用 React + TypeScript 构建</span>
              <span>•</span>
              <span>响应式设计</span>
              <span>•</span>
              <span>现代化界面</span>
            </div>
          </div>

          {/* 备案信息预留位置 */}
          <div className="mt-4 pt-4 border-t border-gray-800 text-center">
            <div className="text-gray-500 text-xs space-y-1">
              {/* 备案信息将在此处显示，格式示例： */}
              {/* <p>粤ICP备XXXXXXXX号-1</p> */}
              {/* <p>粤公网安备 XXXXXXXXXXXXXX号</p> */}
              <p className="text-gray-600">备案信息预留位置</p>
            </div>
          </div>
        </motion.div>

        {/* 返回顶部按钮 */}
        <motion.button
          variants={itemVariants}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 w-12 h-12 bg-cyan-600 hover:bg-cyan-700 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 z-40"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title="返回顶部"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      </motion.div>
    </footer>
  );
};