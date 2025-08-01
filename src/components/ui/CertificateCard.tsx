import React from 'react';
import { motion } from 'framer-motion';
import { Certificate } from '../../types';
import { getCertificateTypeText } from '../../utils/dataProcessing';

interface CertificateCardProps {
  certificate: Certificate;
  index: number;
}

// 证书图标
const CertificateIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

// 奖项图标
const AwardIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

// 日期图标
const DateIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

// 机构图标
const IssuerIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

export const CertificateCard: React.FC<CertificateCardProps> = ({ certificate, index }) => {
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
        delay: index * 0.15,
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
        delay: index * 0.15 + 0.3,
        ease: "easeOut"
      }
    }
  };

  const isCertificate = certificate.type === 'certificate';
  const typeText = getCertificateTypeText(certificate.type);

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3 }
      }}
      className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col h-full"
    >
      {/* 背景装饰 */}
      <div className={`absolute top-0 right-0 w-24 h-24 rounded-full transform translate-x-12 -translate-y-12 group-hover:scale-110 transition-transform duration-500 ${
        isCertificate 
          ? 'bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20'
          : 'bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20'
      }`} />
      
      {/* 类型标签 */}
      <div className="absolute top-4 right-4 z-10">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          isCertificate
            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
        }`}>
          {typeText}
        </span>
      </div>

      <div className="relative p-6 z-10 flex-1 flex flex-col">
        {/* 图标和标题 */}
        <div className="flex items-start gap-4 mb-4">
          <motion.div
            variants={iconVariants}
            className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${
              isCertificate
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
            }`}
          >
            {isCertificate ? <CertificateIcon /> : <AwardIcon />}
          </motion.div>
          
          <div className="flex-1 min-w-0 pr-16">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
              {certificate.name}
            </h3>
          </div>
        </div>

        {/* 证书信息 */}
        <div className="space-y-2 mb-4">
          {certificate.issuer && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <IssuerIcon />
              <span>{certificate.issuer}</span>
            </div>
          )}
          
          {certificate.date && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <DateIcon />
              <span>{certificate.date}</span>
            </div>
          )}
        </div>

        {/* 描述 */}
        {certificate.description && (
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex-1">
            {certificate.description}
          </p>
        )}
      </div>

      {/* 底部装饰线 */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: index * 0.15 + 0.8, duration: 0.5 }}
        className={`h-1 transform origin-left ${
          isCertificate
            ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
            : 'bg-gradient-to-r from-yellow-500 to-orange-500'
        }`}
        style={{ width: '100%' }}
      />
    </motion.div>
  );
};