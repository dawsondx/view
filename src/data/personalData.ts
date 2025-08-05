import { PersonalData, SkillLevel, SkillCategory } from '../types';

export const personalData: PersonalData = {
  basicInfo: {
    name: 'Dawson',
    wechatName: 'Dawson',
    title: 'Office培训师 | PPT设计师 | 神器收藏家',
    email: 'dawsondx@foxmail.com',
    wechat: 'dawsondx00',
    location: '深圳',

    // 标签版介绍
    tags: [
      '匠心定制设计师',
      '秋叶Office核心助教',
      '《秒懂Word》著书合作者',
      'Excel高效技巧研究爱好者',
      '秋叶&华师经济职场加速器认证培训讲师',
      '阿猫觉醒合伙人',
      '粥左罗顶峰会会员'
    ],

    // 自话版介绍
    personalStory: [
      '通过项目管理PMP认证，6年先后转行3次，做过数据稽核，做过互联网产品，做过综合管理。',
      '纯小白纯自学，到秋叶Office的ToB&C核心助教，并参与过两次Office课程研发升级以及《秋懂Word》书稿的撰写。',
      '佛系接单但匠心设计的定制设计师。',
      '会Word、Excel、PPT、PS、PR、培训、文案、运营、AI智能体应用、AI编程的互联网多面手。'
    ],

    // 基础服务介绍
    selfIntro: [
      '秋叶Office课研/升级老师',
      '职场加速器课程认证讲师',
      'PPT定制设计师',
      '神器挖掘/收藏'
    ],

    services: [
      'Office疑难杂症解答',
      'PPT定制',
      '海报设计',
      '神器分享'
    ]
  },



  skills: [
    // 办公软件
    {
      id: 'office-excel',
      name: 'Excel',
      level: SkillLevel.EXPERT,
      category: SkillCategory.OFFICE_SOFTWARE,
      description: '精通Excel函数、数据分析、VBA开发',
      customPercentage: 90
    },
    {
      id: 'office-word',
      name: 'Word',
      level: SkillLevel.EXPERT,
      category: SkillCategory.OFFICE_SOFTWARE,
      description: '《秒懂Word》书稿撰写，文档排版专家',
      customPercentage: 90
    },
    {
      id: 'office-ppt',
      name: 'PPT',
      level: SkillLevel.EXPERT,
      category: SkillCategory.OFFICE_SOFTWARE,
      description: 'PPT定制设计，模板制作，培训教学',
      customPercentage: 90
    },

    // 设计软件
    {
      id: 'design-ps',
      name: 'Photoshop',
      level: SkillLevel.PROFICIENT,
      category: SkillCategory.DESIGN_SOFTWARE,
      description: '图像处理、海报设计、视觉设计',
      customPercentage: 78
    },
    {
      id: 'design-pr',
      name: 'Premiere/剪映',
      level: SkillLevel.PROFICIENT,
      category: SkillCategory.DESIGN_SOFTWARE,
      description: '视频编辑、短视频制作',
      customPercentage: 75
    },

    // 新兴技术
    {
      id: 'ai-tools',
      name: 'AI工具应用',
      level: SkillLevel.PROFICIENT,
      category: SkillCategory.EMERGING_TECH,
      description: 'AI智能工具开发、效率提升',
      customPercentage: 82
    },
    {
      id: 'ai-programming',
      name: 'AI编程',
      level: SkillLevel.PROFICIENT,
      category: SkillCategory.EMERGING_TECH,
      description: '番茄钟、浏览器扩展等工具开发',
      customPercentage: 80
    },

    // 编程技能
    {
      id: 'programming-vba',
      name: 'VBA开发',
      level: SkillLevel.PROFICIENT,
      category: SkillCategory.PROGRAMMING,
      description: 'Excel自动化、Office插件开发',
      customPercentage: 75
    }
  ],

  achievements: [
    {
      id: 'qiuye-office',
      title: '秋叶Office核心助教',
      description: '连任7期秋叶Office打卡营答疑点评助教，专业解答学员问题',
      metrics: { value: '7期', label: '连任期数' },
      category: 'education'
    },
    {
      id: 'career-accelerator',
      title: '职场加速器认证培训讲师',
      description: '深度参与秋叶&华师经济职场加速器认证培训讲师连续两期，担任过秋叶线下To B培训助教',
      metrics: { value: '2期', label: '深度参与' },
      category: 'education'
    },
    {
      id: 'course-development',
      title: '秋叶课程研发合作',
      description: '参与《秒懂Word》书稿撰写，贡献专业内容；《和秋叶一起学Excel》课件及剪辑等工作合作',
      metrics: { value: '2项', label: '合作项目' },
      category: 'education'
    },
    {
      id: 'ppt-template',
      title: 'PPT模板设计',
      description: '51PPT模板网免费模板单个下载量5500+',
      metrics: { value: '5500+', label: '下载量' },
      category: 'design'
    },
    {
      id: 'ppt-monetization',
      title: '设计变现',
      description: '累计PPT/海报定制设计服务变现10000+元',
      metrics: { value: '10000+', label: '变现金额' },
      category: 'design'
    },
    {
      id: 'tools-collection',
      title: '神器收藏整理',
      description: '整理浏览器收藏夹800+工具，创建语雀哆啦口袋知识小组',
      metrics: { value: '800+', label: '工具数量' },
      category: 'tools'
    },
    {
      id: 'knowledge-base',
      title: '知识库建设',
      description: 'ima知识库《工具神器搜罗》已有5000+人加入，入选官方每周精选知识库（7.21-7.27）',
      metrics: { value: '5000+', label: '用户' },
      category: 'tools'
    },
    {
      id: 'ai-agent',
      title: 'AI智能体应用搭建',
      description: '开发多个AI智能体应用，提升工作效率和用户体验',
      metrics: { value: '持续更新', label: '应用数量' },
      category: 'ai'
    },
    {
      id: 'ai-programming',
      title: 'AI编程',
      description: '利用AI技术进行编程开发，包括番茄钟、浏览器扩展等工具开发',
      metrics: { value: '50个', label: '开发小目标' },
      category: 'ai'
    }
  ],

  services: [
    {
      id: 'office-qa',
      name: 'Office疑难杂症解答',
      description: '基于秋叶Office核心助教经验，提供专业的Office问题解答服务',
      icon: '💡',
      features: [
        '7期秋叶Office打卡营答疑经验',
        '覆盖Excel、Word、PPT全套Office软件',
        '快速定位问题并提供解决方案',
        '提供最佳实践建议'
      ]
    },
    {
      id: 'ppt-custom',
      name: 'PPT定制',
      description: '匠心定制设计师，提供高质量PPT定制服务',
      icon: '🎨',
      features: [
        '51PPT模板网5500+下载量作品',
        '10000+元设计变现经验',
        '从设计到制作一站式服务',
        '支持各种场景和风格需求'
      ]
    },
    {
      id: 'poster-design',
      name: '海报设计',
      description: '结合PS技能，提供专业海报设计服务',
      icon: '🖼️',
      features: [
        '熟练使用Photoshop进行设计',
        '多种风格和场景适配',
        '高质量视觉效果',
        '快速交付'
      ]
    },
    {
      id: 'tools-sharing',
      name: '神器分享',
      description: '基于400+工具收藏，分享实用神器和使用技巧',
      icon: '🔧',
      features: [
        '400+浏览器收藏夹工具整理',
        'ima知识库《工具神器搜罗》5000+用户',
        '实用工具推荐和使用指南',
        '效率提升解决方案'
      ]
    }
  ],

  portfolio: {
    title: 'Dawson个人作品集',
    filename: 'Dawson个人作品集.pdf',
    url: '/Dawson个人作品集.pdf',
    description: '包含项目案例、技术文档和设计作品的完整作品集',
    size: '2.5MB'
  }
};