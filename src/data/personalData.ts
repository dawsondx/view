import { PersonalData, SkillLevel, CertificateType, ProjectCategory } from '../types';

export const personalData: PersonalData = {
  basicInfo: {
    name: '段翔',
    title: '综合部经理',
    email: 'dawsondx@foxmail.com',
    phone: '13005479826',
    location: '中国，广东省，深圳市，宝安区',
    age: 32,
    education: '本科',
    major: '电子信息工程',
    university: '中国地质大学',
    currentJob: '综合部经理',
    status: '在职，考虑好的职业机会',
    company: '北京泰豪智能工程有限公司深圳分公司'
  },

  education: [
    {
      id: 'edu-1',
      school: '中国地质大学',
      major: '电子信息工程',
      degree: '本科',
      duration: '2012年9月 - 2016年6月',
      startYear: 2012,
      endYear: 2016,
      schoolType: '211工程',
      description: '主修电子信息工程专业，掌握了扎实的电子信息理论基础和实践技能。在校期间积极参与各类技术项目和实践活动，培养了良好的团队协作能力和项目管理能力。'
    }
  ],

  workExperience: [
    {
      id: 'work-1',
      company: '北京泰豪智能工程有限公司',
      position: '综合部经理',
      duration: '2022年6月 - 至今',
      startDate: '2022-06',
      department: '综合部',
      current: true,
      responsibilities: [
        '整理运维部各项制度、流程等文件并进行补充',
        '负责综合部体系搭建及岗位工作职责的明确',
        '负责各项对甲方输出的方案、报告类文件的输出或审核，并负责区域化运维管理的方案汇报及实施',
        '负责昆明、鄂州机场运维项目的运维方案输出，各类文档输出',
        '负责昆明、鄂州机场运维项目的现场管理工作直至项目结束验收的台账等管理工作'
      ],
      achievements: [
        '成功建立完善的综合部管理体系和工作流程',
        '主导完成昆明、鄂州机场运维项目的全流程管理',
        '建立标准化运维流程，确保项目质量和效率',
        '项目验收通过率100%，客户满意度达到优秀水平'
      ]
    },
    {
      id: 'work-2',
      company: '深圳市伍壹科技有限公司',
      position: '产品经理',
      duration: '2018年5月 - 2022年6月',
      startDate: '2018-05',
      endDate: '2022-06',
      department: '产品部',
      current: false,
      responsibilities: [
        '对已有产品公园SaaS平台功能、数据展示等方面进行迭代，绘制原型，沟通UI设计、研发等人员进行产品迭代',
        '负责各产品介绍、路演PPT优化，编写并整理各产品操作手册文档',
        '从0开始设计敏捷训练系列产品架构，绘制PC端管理后台及iPad端应用原型图，跟进产品研发全流程',
        '对外沟通需求，整理需求评定优先级，做需求管理/产品功能管理',
        '负责部分新媒体运营、产品内容运营等工作，对各公众号的整体设计、功能菜单进行设计'
      ],
      achievements: [
        '成功迭代优化公园SaaS平台，用户体验显著提升',
        '从0到1设计敏捷训练系列产品，获得市场认可',
        '建立完善的产品需求管理流程，提高研发效率',
        '负责的新媒体运营工作取得良好效果'
      ]
    },
    {
      id: 'work-3',
      company: '中国联合网络通信集团有限公司广东省潮州市分公司',
      position: '运行维护专员',
      duration: '2016年7月 - 2018年3月',
      startDate: '2016-07',
      endDate: '2018-03',
      department: '运行维护部',
      current: false,
      responsibilities: [
        '负责动力故障引发断站或小区退服故障的跟进处理',
        '与铁塔公司对接，对每月起租单及费用账单进行稽核，完成报账',
        '与财务对接，完成每月费用预提及费用预测，并报给财务，根据财务所需，提供完善相应资料',
        '与省公司对接，独立负责物业系统中铁塔模块中的所有内容，包括起租表更新、账单导入、产品服务费预提调整等事项'
      ],
      achievements: [
        '保障每月预提与实际差额控制在允许范围内',
        '文件管理有序，能随时提供各项资料供查询数据',
        '与铁塔以及省公司对接沟通顺畅，能高效率完成各项工作安排',
        '获得潮州联通主题演讲比赛一等奖、广东联通安全生产技能竞赛个人三等奖'
      ]
    }
  ],

  projects: [
    {
      id: 'proj-1',
      name: '鄂州花湖机场信息弱电业务外包项目',
      duration: '2024年5月 - 2025年4月',
      company: '北京泰豪智能工程有限公司',
      role: '项目经理',
      description: '鄂州花湖机场信息弱电业务外包项目，作为新项目经理顶替原项目经理职责驻场鄂州花湖国际机场，管理17人团队，确保项目正常稳定运行',
      category: ProjectCategory.SYSTEM_INTEGRATION,
      responsibilities: [
        '担任项目经理，直接管理2名技术骨干（组长）',
        '作为公司与项目现场的唯一对接人，确保公司政策及时传达至项目部',
        '与原有项目负责人进行交接，确保项目正常稳定进行',
        '作为机场方与运维团队的核心接口，统筹运维管理、资源协调及风险管控全流程',
        '参与甲方部门级及科室例会，编制项目周报汇报项目运行情况'
      ],
      challenges: [
        '作为中途替换的新项目经理，前期对鄂州机场运维项目不甚了解',
        '与原有项目负责人交接时间仅两天，需迅速建立对项目的了解',
        '业务技术知识参与不多，后期涉及新增业务的人员协调调动',
        '确保运维工作顺利进行，维护业主满意度'
      ],
      achievements: [
        '主导完成项目经理变更流程，与公司及甲方多方沟通确保变更顺利',
        '驻场以来迅速了解项目实际情况，逐一整理和优化现有报告类文档',
        '在人员流动期间完成新人招聘及培训工作，实现运维质量零波动',
        '按固定周期执行项目请款工作，保证正常款项全部收回'
      ],
      technologies: ['机场信息系统', '弱电系统', '运维管理', '项目管理'],
      teamSize: 17
    },
    {
      id: 'proj-2',
      name: '昆明长水国际机场信息弱电系统运维项目',
      duration: '2023年3月 - 2024年4月',
      company: '北京泰豪智能工程有限公司',
      role: '项目现场执行经理',
      description: '昆明长水国际机场信息弱电系统（包括航显、广播、安防、通信、网络等系统）运维项目，涵盖13个系统，团队规模29人，服务周期1年',
      category: ProjectCategory.SYSTEM_INTEGRATION,
      responsibilities: [
        '作为项目现场负责人，直接管理3名技术骨干（班组长）及3家设备原厂外包服务商',
        '作为公司与项目现场的唯一对接人，确保公司政策及时传达至项目部',
        '建立标准化运维流程，满足机场方对安全、效率及合规性的严苛要求',
        '统筹运维管理、资源协调及风险管控全流程',
        '独立负责项目验收工作，确保项目验收台账100%符合合同条款'
      ],
      challenges: [
        '机场方、外包单位、设备厂商多方沟通成本高',
        '作为入职半年的员工，对机场运维工作了解不够深入',
        '对全新地区的全新项目较为生疏，需多方面了解现场实际运维情况',
        '第一次负责整体项目验收工作'
      ],
      achievements: [
        '深入研究昆明机场过往项目文档，与甲方业主及班组长多沟通',
        '内部推行"日巡检 周例会 月报告"制度，确保流程实施准确',
        '基本主导完成项目后80%进度，确保日常运维工作正常顺利进行',
        '项目验收圆满通过，三次回款工作独立完成100%收回款项'
      ],
      technologies: ['航显系统', '广播系统', '安防系统', '通信系统', '网络系统'],
      teamSize: 29
    },
    {
      id: 'proj-3',
      name: '铁塔租赁费稽核与预提',
      duration: '2016年12月 - 2018年3月',
      company: '中国联合网络通信集团有限公司广东省潮州市分公司',
      role: '运行维护专员',
      description: '负责每月新签起租单的稽核，根据起租规则与业务单属性核对价格，并根据稽核结果核对每月产品服务费，完成报账及费用预提工作',
      category: ProjectCategory.DATA_ANALYSIS,
      responsibilities: [
        '与铁塔公司对接，独立对每月起租单进行稽核，并根据稽核的起租单稽核月账单铁塔产品服务费',
        '与财务对接，独立完成每月费用预提及费用预测，并报给财务',
        '与省公司对接，独立负责物业系统中铁塔模块中的所有内容',
        '包括起租表更新、账单导入、产品服务费预提调整等事项',
        '每月月底进行下个月产品服务费及用电费维护费等各项费用的计提'
      ],
      challenges: [
        '复杂的起租规则与业务单属性匹配',
        '多方协调沟通，确保数据准确性',
        '费用预提的准确性控制',
        '系统操作的规范性和及时性'
      ],
      achievements: [
        '保障每月预提与实际差额不大，在允许范围内',
        '文件管理有序，能随时提供各项资料供查询数据',
        '与铁塔以及省公司对接沟通顺畅，能高效率完成各项工作安排',
        '建立了完善的稽核流程和费用管理体系'
      ],
      technologies: ['Excel', 'VBA', '物业系统', '财务系统'],
      teamSize: 3
    }
  ],

  skills: [
    {
      id: 'skill-1',
      name: 'Excel/PPT/Word',
      level: SkillLevel.EXPERT,
      category: '办公软件',
      description: '精通Office办公软件，擅长数据分析、报告制作和文档编写，具备VBA开发能力'
    },
    {
      id: 'skill-2',
      name: 'PS/PR',
      level: SkillLevel.GOOD,
      category: '设计软件',
      description: '熟练使用Photoshop和Premiere进行图像处理和视频编辑'
    },
    {
      id: 'skill-3',
      name: 'AI智能体',
      level: SkillLevel.EXPERT,
      category: '新兴技术',
      description: '精通AI智能体技术，从0研究搭建AI智能体工作流，实现自动创建并生成题库至飞书多维表中'
    },
    {
      id: 'skill-4',
      name: '产品/运营/项目',
      level: SkillLevel.GOOD,
      category: '管理技能',
      description: '具备良好的产品管理、运营管理和项目管理能力，有丰富的实践经验'
    },
    {
      id: 'skill-5',
      name: '机场运维管理',
      level: SkillLevel.PROFICIENT,
      category: '专业技能',
      description: '深度参与过三个机场运维项目，对机场运维行业有深入了解和实践经验'
    },
    {
      id: 'skill-6',
      name: 'VBA开发',
      level: SkillLevel.PROFICIENT,
      category: '编程技能',
      description: '熟练使用VBA进行Excel自动化开发，自制工具提升工作效率'
    },
    {
      id: 'skill-7',
      name: '沟通协调',
      level: SkillLevel.PROFICIENT,
      category: '软技能',
      description: '具备优秀的沟通协调能力，擅长多方协调和团队管理'
    },
    {
      id: 'skill-8',
      name: '学习研究',
      level: SkillLevel.PROFICIENT,
      category: '软技能',
      description: '学习能力强，擅长学习研究并使用新技术，适应变化能力强'
    }
  ],

  certificates: [
    {
      id: 'cert-1',
      name: 'PMP项目管理证书',
      issuer: 'PMI',
      date: '2023年',
      type: CertificateType.CERTIFICATE,
      description: '国际权威的项目管理专业认证，证明具备专业的项目管理知识和技能'
    },
    {
      id: 'cert-2',
      name: 'CISAW信息安全保障人员认证',
      issuer: 'CISAW',
      date: '2023年',
      type: CertificateType.CERTIFICATE,
      description: '信息安全保障人员专业认证，具备信息安全管理和技术能力'
    },
    {
      id: 'cert-3',
      name: '潮州联通主题演讲比赛一等奖',
      issuer: '中国联通潮州分公司',
      date: '2017年',
      type: CertificateType.AWARD,
      description: '在潮州联通主题演讲比赛中获得一等奖，展现了优秀的表达和沟通能力'
    },
    {
      id: 'cert-4',
      name: '广东联通安全生产技能竞赛个人三等奖',
      issuer: '中国联通广东省分公司',
      date: '2017年',
      type: CertificateType.AWARD,
      description: '在广东联通安全生产技能竞赛中获得个人三等奖，体现了专业技能水平'
    }
  ],

  selfEvaluation: [
    '乐于助人，乐观大方，学习能力强，爱分享知识，适应变化',
    '大学期间有着丰富的活动组织策划经验，在此期间培养了自己对于PPT的兴趣，有在演界网和千图网上传自己设计的PPT模板作品',
    '擅长挖掘高效解决问题的思路，工作半年时间以内从零学习Excel及VBA，培养了对于Excel的兴趣，喜欢多研究问题研究简便操作，并将自己所学的技巧输出成文分享到简书、知乎等平台，其后结合自己的工作内容，通过VBA自制了一个简易工具来节省自己工作中繁琐操作Excel的时间',
    '在现任职公司中深度参与过三个机场运维项目的报告输出、项目实施及质量管控工作，对于机场运维行业有一定了解',
    '擅长学习研究并使用新技术，从0研究搭建AI智能体工作流，实现自动创建并生成题库至飞书多维表中'
  ],

  portfolio: {
    title: '段翔个人作品集',
    filename: 'Dawson个人作品集.pdf',
    url: '/Dawson个人作品集.pdf',
    description: '包含项目案例、技术文档和设计作品的完整作品集',
    size: '2.5MB'
  }
};