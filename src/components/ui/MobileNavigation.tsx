import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavigationItem } from '../../types/navigation';

interface MobileNavigationProps {
  items: NavigationItem[];
  activeSection: string;
  isOpen: boolean;
  onItemClick: (sectionId: string) => void;
  onClose: () => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  items,
  activeSection,
  isOpen,
  onItemClick,
  onClose
}) => {
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const menuVariants = {
    hidden: { 
      x: '100%',
      transition: {
        type: 'tween',
        duration: 0.3
      }
    },
    visible: { 
      x: 0,
      transition: {
        type: 'tween',
        duration: 0.3,
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    },
    exit: {
      x: '100%',
      transition: {
        type: 'tween',
        duration: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: 20 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const handleItemClick = (item: NavigationItem) => {
    onItemClick(item.id);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 背景遮罩 */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={onClose}
          />

          {/* 侧边菜单 */}
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white dark:bg-gray-900 shadow-2xl z-50 md:hidden"
          >
            {/* 菜单头部 */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                导航菜单
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                aria-label="关闭菜单"
              >
                <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* 菜单项 */}
            <div className="py-4">
              {items.map((item) => (
                <motion.button
                  key={item.id}
                  variants={itemVariants}
                  onClick={() => handleItemClick(item)}
                  className={`
                    w-full flex items-center gap-4 px-6 py-4 text-left transition-all duration-200
                    border-l-4 hover:bg-gray-50 dark:hover:bg-gray-800
                    ${activeSection === item.id
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-600'
                      : 'text-gray-700 dark:text-gray-300 border-transparent hover:border-gray-300'
                    }
                  `}
                >
                  {/* 图标占位符 */}
                  <div className={`
                    w-2 h-2 rounded-full transition-colors duration-200
                    ${activeSection === item.id ? 'bg-blue-600' : 'bg-gray-400'}
                  `} />
                  
                  <span className="font-medium text-base">
                    {item.label}
                  </span>

                  {/* 激活指示器 */}
                  {activeSection === item.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto w-2 h-2 bg-blue-600 rounded-full"
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* 菜单底部 */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  段翔个人简历
                </p>
                <div className="flex items-center justify-center gap-4">
                  <a
                    href="mailto:duanxiang@example.com"
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200"
                    title="邮箱"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </a>
                  <a
                    href="tel:+86138-0000-0000"
                    className="p-2 text-gray-400 hover:text-green-600 transition-colors duration-200"
                    title="电话"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};