import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number; // 0-100
  max?: number;
  label?: string;
  showValue?: boolean;
  color?: 'primary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const colorClasses = {
  primary: 'bg-primary-600',
  success: 'bg-green-600',
  warning: 'bg-yellow-600',
  error: 'bg-red-600'
};

const sizeClasses = {
  sm: 'h-2',
  md: 'h-3',
  lg: 'h-4'
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  showValue = false,
  color = 'primary',
  size = 'md',
  className = ''
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={`w-full ${className}`}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <span className="text-sm font-medium text-gray-700">{label}</span>
          )}
          {showValue && (
            <span className="text-sm text-gray-500">{Math.round(percentage)}%</span>
          )}
        </div>
      )}
      
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <motion.div
          className={`${colorClasses[color]} ${sizeClasses[size]} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

interface SkillProgressBarProps {
  skillName: string;
  level: 'beginner' | 'good' | 'proficient' | 'expert';
  className?: string;
}

export const SkillProgressBar: React.FC<SkillProgressBarProps> = ({
  skillName,
  level,
  className = ''
}) => {
  const levelValues = {
    beginner: 40,
    good: 60,
    proficient: 80,
    expert: 100
  };

  const levelTexts = {
    beginner: '入门',
    good: '良好',
    proficient: '熟练',
    expert: '精通'
  };

  const levelColors = {
    beginner: 'warning' as const,
    good: 'primary' as const,
    proficient: 'success' as const,
    expert: 'success' as const
  };

  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-900">{skillName}</span>
        <span className="text-xs text-gray-500">{levelTexts[level]}</span>
      </div>
      <ProgressBar
        value={levelValues[level]}
        color={levelColors[level]}
        size="sm"
      />
    </div>
  );
};