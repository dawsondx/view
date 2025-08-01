import React from 'react';
import { motion } from 'framer-motion';
import { ProjectCategory } from '../../types';
import { getProjectCategoryText } from '../../utils/dataProcessing';

interface ProjectFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: ProjectCategory | 'all';
  onCategoryChange: (category: ProjectCategory | 'all') => void;
  projectCount: number;
  availableCategories: ProjectCategory[];
}

// 搜索图标
const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

// 清除图标
const ClearIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// 筛选图标
const FilterIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
  </svg>
);

export const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  projectCount,
  availableCategories
}) => {
  // 根据实际可用的项目分类动态生成分类选项
  const categories: Array<{ key: ProjectCategory | 'all'; label: string }> = [
    { key: 'all', label: '全部项目' },
    ...availableCategories.map(category => ({
      key: category,
      label: getProjectCategoryText(category)
    }))
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
    >
      <div className="flex flex-col lg:flex-row gap-6">
        {/* 搜索框 */}
        <motion.div variants={itemVariants} className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            搜索项目
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="搜索项目名称、描述、技术栈..."
              className="block w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            />
            {searchTerm && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <ClearIcon />
              </button>
            )}
          </div>
        </motion.div>

        {/* 分类筛选 */}
        <motion.div variants={itemVariants} className="lg:w-80">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
            <FilterIcon />
            项目分类
          </label>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => onCategoryChange(category.key)}
                className={`
                  px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 text-left
                  ${selectedCategory === category.key
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }
                `}
              >
                {category.label}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* 结果统计 */}
      <motion.div
        variants={itemVariants}
        className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>
            {searchTerm || selectedCategory !== 'all' ? (
              <>找到 <span className="font-semibold text-blue-600 dark:text-blue-400">{projectCount}</span> 个项目</>
            ) : (
              <>共 <span className="font-semibold text-blue-600 dark:text-blue-400">{projectCount}</span> 个项目</>
            )}
          </span>
          
          {(searchTerm || selectedCategory !== 'all') && (
            <button
              onClick={() => {
                onSearchChange('');
                onCategoryChange('all');
              }}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
            >
              清除筛选
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};