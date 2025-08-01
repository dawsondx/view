# 段翔 - 个人展示网站

这是一个基于 React + TypeScript + Vite 构建的个人简历展示网站，展示个人信息、工作经验、项目经历、技能和作品集。

## 🚀 技术栈

- **前端框架**: React 18
- **开发语言**: TypeScript
- **构建工具**: Vite
- **样式框架**: Tailwind CSS
- **动画库**: Framer Motion
- **部署平台**: GitHub Pages

## 📦 项目结构

```
├── src/
│   ├── components/          # 组件目录
│   │   ├── common/         # 通用组件
│   │   ├── layout/         # 布局组件
│   │   ├── sections/       # 页面区块组件
│   │   └── ui/            # UI组件
│   ├── data/              # 数据文件
│   ├── hooks/             # 自定义Hook
│   ├── types/             # TypeScript类型定义
│   ├── utils/             # 工具函数
│   └── config/            # 配置文件
├── public/                # 静态资源
└── dist/                  # 构建输出目录
```

## 🛠️ 开发

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看项目

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 🚀 部署

项目配置了 GitHub Actions 自动部署到 GitHub Pages。当代码推送到 main 分支时，会自动触发构建和部署流程。

### 手动部署步骤

1. 确保 GitHub 仓库已创建
2. 推送代码到 main 分支
3. 在 GitHub 仓库设置中启用 GitHub Pages
4. 选择 "GitHub Actions" 作为部署源

### 访问地址

部署完成后，可通过以下地址访问：
https://dawsondx.github.io/resume0801/

## 📝 功能特性

- ✅ 响应式设计，支持移动端和桌面端
- ✅ 流畅的动画效果和交互体验
- ✅ 模块化组件设计，易于维护
- ✅ TypeScript 类型安全
- ✅ 性能优化和代码分割
- ✅ SEO 友好
- ✅ 自动化部署

## 📄 许可证

MIT License

## 👤 作者

**段翔**
- Email: dawsondx@foxmail.com
- GitHub: [@dawsondx](https://github.com/dawsondx)

---

如有任何问题或建议，欢迎提交 Issue 或 Pull Request！