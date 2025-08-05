// 个人基础信息接口
export interface PersonalInfo {
  name: string;
  wechatName: string;
  title: string;
  email: string;
  wechat: string;
  location: string;
  tags: string[];           // 标签版介绍（7个身份标签）
  personalStory: string[];  // 自话版介绍（个人成长故事）
  selfIntro: string[];      // 基础自我介绍数组
  services: string[];       // 提供的服务
  avatar?: string;
}

// 技能接口
export interface Skill {
  id: string;
  name: string;
  level: SkillLevel;
  category: SkillCategory;
  description?: string;
  customPercentage?: number; // 自定义百分比，如果不设置则使用默认映射
}



// 作品集接口
export interface Portfolio {
  title: string;
  filename: string;
  url: string;
  description?: string;
  size?: string;
}

// 成就数据接口
export interface Achievement {
  id: string;
  title: string;
  description: string;
  metrics?: {
    value: string;
    label: string;
  };
  category: 'education' | 'design' | 'tools' | 'ai';
}

// 服务数据接口
export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  features: string[];
}

// 完整个人数据接口
export interface PersonalData {
  basicInfo: PersonalInfo;
  skills: Skill[];
  achievements: Achievement[];
  services: Service[];
  portfolio: Portfolio;
}

// 技能等级枚举
export enum SkillLevel {
  BEGINNER = 'beginner',
  GOOD = 'good',
  PROFICIENT = 'proficient',
  EXPERT = 'expert'
}

// 技能分类枚举
export enum SkillCategory {
  OFFICE_SOFTWARE = '办公软件',
  DESIGN_SOFTWARE = '设计软件',
  EMERGING_TECH = '新兴技术',
  PROGRAMMING = '编程技能'
}



// 导出导航相关类型
export * from './navigation';