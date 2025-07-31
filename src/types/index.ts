// 个人基础信息接口
export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  age: number;
  education: string;
  major: string;
  university: string;
  currentJob: string;
  status: string;
  company: string;
  avatar?: string;
}

// 教育背景接口
export interface Education {
  id: string;
  school: string;
  major: string;
  degree: string;
  duration: string;
  startYear: number;
  endYear: number;
  schoolType: string;
  description?: string;
}

// 工作经历接口
export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  duration: string;
  startDate: string;
  endDate?: string;
  department?: string;
  responsibilities: string[];
  current: boolean;
  achievements?: string[];
}

// 项目经验接口
export interface Project {
  id: string;
  name: string;
  duration: string;
  company: string;
  role: string;
  description: string;
  responsibilities: string[];
  challenges: string[];
  achievements: string[];
  category: ProjectCategory;
  technologies?: string[];
  teamSize?: number;
}

// 技能接口
export interface Skill {
  id: string;
  name: string;
  level: SkillLevel;
  category: string;
  description?: string;
}

// 证书和奖项接口
export interface Certificate {
  id: string;
  name: string;
  issuer?: string;
  date?: string;
  type: CertificateType;
  description?: string;
}

// 作品集接口
export interface Portfolio {
  title: string;
  filename: string;
  url: string;
  description?: string;
  size?: string;
}

// 完整个人数据接口
export interface PersonalData {
  basicInfo: PersonalInfo;
  education: Education[];
  workExperience: WorkExperience[];
  projects: Project[];
  skills: Skill[];
  certificates: Certificate[];
  selfEvaluation: string[];
  portfolio: Portfolio;
}

// 技能等级枚举
export enum SkillLevel {
  BEGINNER = 'beginner',
  GOOD = 'good',
  PROFICIENT = 'proficient',
  EXPERT = 'expert'
}

// 证书类型枚举
export enum CertificateType {
  CERTIFICATE = 'certificate',
  AWARD = 'award'
}

// 项目分类枚举
export enum ProjectCategory {
  WEB_DEVELOPMENT = 'web-development',
  MOBILE_APP = 'mobile-app',
  SYSTEM_INTEGRATION = 'system-integration',
  DATA_ANALYSIS = 'data-analysis',
  PROJECT_MANAGEMENT = 'project-management'
}

// 导出导航相关类型
export * from './navigation';