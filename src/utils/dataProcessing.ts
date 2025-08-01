import { 
  WorkExperience, 
  Project, 
  Skill, 
  Certificate, 
  SkillLevel,
  CertificateType,
  ProjectCategory 
} from '../types';

// 计算工作年限
export const calculateWorkYears = (workExperience: WorkExperience[]): number => {
  let totalMonths = 0;

  workExperience.forEach(work => {
    const startDate = new Date(work.startDate);
    const endDate = work.endDate ? new Date(work.endDate) : new Date();
    
    const monthsDiff = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                      (endDate.getMonth() - startDate.getMonth());
    
    totalMonths += monthsDiff;
  });

  return Math.round(totalMonths / 12 * 10) / 10; // 保留一位小数
};

// 获取当前工作信息
export const getCurrentJob = (workExperience: WorkExperience[]): WorkExperience | null => {
  return workExperience.find(work => work.current) || null;
};

// 按时间排序工作经历（最新的在前）
export const sortWorkExperienceByDate = (workExperience: WorkExperience[]): WorkExperience[] => {
  return [...workExperience].sort((a, b) => {
    const dateA = new Date(a.startDate);
    const dateB = new Date(b.startDate);
    return dateB.getTime() - dateA.getTime();
  });
};

// 按分类分组技能
export const groupSkillsByCategory = (skills: Skill[]): Record<string, Skill[]> => {
  return skills.reduce((groups, skill) => {
    const category = skill.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(skill);
    return groups;
  }, {} as Record<string, Skill[]>);
};

// 按技能等级排序
export const sortSkillsByLevel = (skills: Skill[]): Skill[] => {
  const levelOrder = {
    [SkillLevel.EXPERT]: 4,
    [SkillLevel.PROFICIENT]: 3,
    [SkillLevel.GOOD]: 2,
    [SkillLevel.BEGINNER]: 1
  };

  return [...skills].sort((a, b) => levelOrder[b.level] - levelOrder[a.level]);
};

// 获取技能等级的中文描述
export const getSkillLevelText = (level: SkillLevel): string => {
  const levelTexts = {
    [SkillLevel.EXPERT]: '精通',
    [SkillLevel.PROFICIENT]: '熟练',
    [SkillLevel.GOOD]: '良好',
    [SkillLevel.BEGINNER]: '入门'
  };
  return levelTexts[level];
};

// 获取技能等级的数值（用于进度条显示）
export const getSkillLevelValue = (level: SkillLevel, skillName?: string, category?: string): number => {
  // 为特定技能设置自定义百分比
  if (skillName) {
    const customValues: Record<string, number> = {
      '沟通协调': 70,
      '学习研究': 80
    };
    if (customValues[skillName]) {
      return customValues[skillName];
    }
  }
  
  // 为技能类别设置自定义百分比
  if (category) {
    const categoryValues: Record<string, number> = {
      '办公软件': 100,
      '设计软件': 70,
      '新兴技术': 80,
      '管理技能': 75,
      '专业技能': 70,
      '编程技能': 70,
      '软技能': 75 // 默认值，具体技能会被上面的customValues覆盖
    };
    if (categoryValues[category]) {
      return categoryValues[category];
    }
  }
  
  const levelValues = {
    [SkillLevel.EXPERT]: 100,
    [SkillLevel.PROFICIENT]: 80,
    [SkillLevel.GOOD]: 60,
    [SkillLevel.BEGINNER]: 40
  };
  return levelValues[level];
};

// 按分类筛选项目
export const filterProjectsByCategory = (projects: Project[], category?: ProjectCategory): Project[] => {
  if (!category) return projects;
  return projects.filter(project => project.category === category);
};

// 搜索项目（按名称、描述、技术栈）
export const searchProjects = (projects: Project[], searchTerm: string): Project[] => {
  if (!searchTerm.trim()) return projects;
  
  const term = searchTerm.toLowerCase();
  return projects.filter(project => 
    project.name.toLowerCase().includes(term) ||
    project.description.toLowerCase().includes(term) ||
    project.role.toLowerCase().includes(term) ||
    project.company.toLowerCase().includes(term) ||
    (project.technologies && project.technologies.some(tech => 
      tech.toLowerCase().includes(term)
    ))
  );
};

// 获取项目分类的中文名称
export const getProjectCategoryText = (category: ProjectCategory): string => {
  const categoryTexts = {
    [ProjectCategory.WEB_DEVELOPMENT]: 'Web开发',
    [ProjectCategory.MOBILE_APP]: '移动应用',
    [ProjectCategory.SYSTEM_INTEGRATION]: '系统集成',
    [ProjectCategory.DATA_ANALYSIS]: '数据分析',
    [ProjectCategory.PROJECT_MANAGEMENT]: '项目管理'
  };
  return categoryTexts[category];
};

// 按类型分组证书
export const groupCertificatesByType = (certificates: Certificate[]): Record<string, Certificate[]> => {
  return certificates.reduce((groups, cert) => {
    const type = cert.type;
    if (!groups[type]) {
      groups[type] = [];
    }
    groups[type].push(cert);
    return groups;
  }, {} as Record<string, Certificate[]>);
};

// 获取证书类型的中文名称
export const getCertificateTypeText = (type: CertificateType): string => {
  const typeTexts = {
    [CertificateType.CERTIFICATE]: '专业证书',
    [CertificateType.AWARD]: '荣誉奖项'
  };
  return typeTexts[type];
};

// 按日期排序证书（最新的在前）
export const sortCertificatesByDate = (certificates: Certificate[]): Certificate[] => {
  return [...certificates].sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
};

// 格式化日期显示
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return `${year}年${month}月`;
};

// 计算项目持续时间（月数）
export const calculateProjectDuration = (duration: string): number => {
  // 解析类似 "2022年6月 - 2023年3月" 的格式
  const match = duration.match(/(\d{4})年(\d{1,2})月\s*-\s*(\d{4})年(\d{1,2})月/);
  if (!match) return 0;
  
  const [, startYear, startMonth, endYear, endMonth] = match;
  const start = new Date(parseInt(startYear), parseInt(startMonth) - 1);
  const end = new Date(parseInt(endYear), parseInt(endMonth) - 1);
  
  return (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
};

// 获取最近的项目
export const getRecentProjects = (projects: Project[], count: number = 3): Project[] => {
  return [...projects]
    .sort((a, b) => {
      // 简单按项目名称中的年份排序，实际项目中应该有更准确的日期字段
      const yearA = parseInt(a.duration.match(/(\d{4})/)?.[1] || '0');
      const yearB = parseInt(b.duration.match(/(\d{4})/)?.[1] || '0');
      return yearB - yearA;
    })
    .slice(0, count);
};

// 统计技能分布
export const getSkillStatistics = (skills: Skill[]) => {
  const total = skills.length;
  const byLevel = skills.reduce((stats, skill) => {
    stats[skill.level] = (stats[skill.level] || 0) + 1;
    return stats;
  }, {} as Record<SkillLevel, number>);
  
  const byCategory = skills.reduce((stats, skill) => {
    stats[skill.category] = (stats[skill.category] || 0) + 1;
    return stats;
  }, {} as Record<string, number>);

  return {
    total,
    byLevel,
    byCategory
  };
};