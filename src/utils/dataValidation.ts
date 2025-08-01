import { 
  PersonalInfo, 
  Education, 
  WorkExperience, 
  Project, 
  Skill, 
  Certificate, 
  PersonalData,
  SkillLevel,
  CertificateType 
} from '../types';

// 邮箱验证正则表达式
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 手机号验证正则表达式
const PHONE_REGEX = /^(\+86)?1[3-9]\d{9}$/;

// 验证个人基础信息
export const validatePersonalInfo = (info: PersonalInfo): string[] => {
  const errors: string[] = [];

  if (!info.name || info.name.trim().length === 0) {
    errors.push('姓名不能为空');
  }

  if (!info.title || info.title.trim().length === 0) {
    errors.push('职位不能为空');
  }

  if (!info.email || !EMAIL_REGEX.test(info.email)) {
    errors.push('邮箱格式不正确');
  }

  if (!info.phone || !PHONE_REGEX.test(info.phone)) {
    errors.push('手机号格式不正确');
  }

  if (!info.location || info.location.trim().length === 0) {
    errors.push('所在地不能为空');
  }

  if (!info.age || info.age < 18 || info.age > 65) {
    errors.push('年龄应在18-65岁之间');
  }

  return errors;
};

// 验证教育背景
export const validateEducation = (education: Education): string[] => {
  const errors: string[] = [];

  if (!education.school || education.school.trim().length === 0) {
    errors.push('学校名称不能为空');
  }

  if (!education.major || education.major.trim().length === 0) {
    errors.push('专业不能为空');
  }

  if (!education.degree || education.degree.trim().length === 0) {
    errors.push('学历不能为空');
  }

  if (education.startYear >= education.endYear) {
    errors.push('开始年份应早于结束年份');
  }

  const currentYear = new Date().getFullYear();
  if (education.endYear > currentYear) {
    errors.push('结束年份不能超过当前年份');
  }

  return errors;
};

// 验证工作经历
export const validateWorkExperience = (work: WorkExperience): string[] => {
  const errors: string[] = [];

  if (!work.company || work.company.trim().length === 0) {
    errors.push('公司名称不能为空');
  }

  if (!work.position || work.position.trim().length === 0) {
    errors.push('职位不能为空');
  }

  if (!work.startDate || work.startDate.trim().length === 0) {
    errors.push('开始时间不能为空');
  }

  if (!work.current && (!work.endDate || work.endDate.trim().length === 0)) {
    errors.push('非当前职位必须填写结束时间');
  }

  if (!work.responsibilities || work.responsibilities.length === 0) {
    errors.push('工作职责不能为空');
  }

  return errors;
};

// 验证项目经验
export const validateProject = (project: Project): string[] => {
  const errors: string[] = [];

  if (!project.name || project.name.trim().length === 0) {
    errors.push('项目名称不能为空');
  }

  if (!project.company || project.company.trim().length === 0) {
    errors.push('所属公司不能为空');
  }

  if (!project.role || project.role.trim().length === 0) {
    errors.push('担任角色不能为空');
  }

  if (!project.description || project.description.trim().length === 0) {
    errors.push('项目描述不能为空');
  }

  if (!project.responsibilities || project.responsibilities.length === 0) {
    errors.push('项目职责不能为空');
  }

  if (!project.category || project.category.trim().length === 0) {
    errors.push('项目分类不能为空');
  }

  return errors;
};

// 验证技能信息
export const validateSkill = (skill: Skill): string[] => {
  const errors: string[] = [];

  if (!skill.name || skill.name.trim().length === 0) {
    errors.push('技能名称不能为空');
  }

  if (!Object.values(SkillLevel).includes(skill.level)) {
    errors.push('技能等级不正确');
  }

  if (!skill.category || skill.category.trim().length === 0) {
    errors.push('技能分类不能为空');
  }

  return errors;
};

// 验证证书信息
export const validateCertificate = (certificate: Certificate): string[] => {
  const errors: string[] = [];

  if (!certificate.name || certificate.name.trim().length === 0) {
    errors.push('证书名称不能为空');
  }

  if (!Object.values(CertificateType).includes(certificate.type)) {
    errors.push('证书类型不正确');
  }

  return errors;
};

// 验证完整个人数据
export const validatePersonalData = (data: PersonalData): { isValid: boolean; errors: string[] } => {
  const allErrors: string[] = [];

  // 验证基础信息
  const basicInfoErrors = validatePersonalInfo(data.basicInfo);
  allErrors.push(...basicInfoErrors.map(error => `基础信息: ${error}`));

  // 验证教育背景
  data.education.forEach((edu, index) => {
    const eduErrors = validateEducation(edu);
    allErrors.push(...eduErrors.map(error => `教育背景${index + 1}: ${error}`));
  });

  // 验证工作经历
  data.workExperience.forEach((work, index) => {
    const workErrors = validateWorkExperience(work);
    allErrors.push(...workErrors.map(error => `工作经历${index + 1}: ${error}`));
  });

  // 验证项目经验
  data.projects.forEach((project, index) => {
    const projectErrors = validateProject(project);
    allErrors.push(...projectErrors.map(error => `项目${index + 1}: ${error}`));
  });

  // 验证技能
  data.skills.forEach((skill, index) => {
    const skillErrors = validateSkill(skill);
    allErrors.push(...skillErrors.map(error => `技能${index + 1}: ${error}`));
  });

  // 验证证书
  data.certificates.forEach((cert, index) => {
    const certErrors = validateCertificate(cert);
    allErrors.push(...certErrors.map(error => `证书${index + 1}: ${error}`));
  });

  return {
    isValid: allErrors.length === 0,
    errors: allErrors
  };
};