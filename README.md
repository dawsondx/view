# 段翔 - 个人展示网站

这是一个基于 React + TypeScript + Vite + Tailwind CSS 构建的现代化个人简历网站。

## 🚀 特性

- ⚡️ **快速加载** - 基于 Vite 构建，开发和生产环境都极速
- 🎨 **现代设计** - 使用 Tailwind CSS 和 Framer Motion 打造精美动画
- 📱 **响应式设计** - 完美适配桌面端、平板和移动设备
- 🔧 **TypeScript** - 完整的类型安全支持
- 🎯 **SEO 优化** - 良好的搜索引擎优化
- 🚀 **自动部署** - GitHub Actions 自动部署到 GitHub Pages

## 🛠️ 技术栈

- **前端框架**: React 18
- **开发语言**: TypeScript
- **构建工具**: Vite
- **样式框架**: Tailwind CSS
- **动画库**: Framer Motion
- **部署平台**: GitHub Pages

## 📦 安装和运行

### 本地开发

```bash
# 克隆项目 (HTTPS)
git clone https://github.com/dawsondx/resume.git
# 或使用 SSH
git clone git@github.com:dawsondx/resume.git
cd resume

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 构建生产版本

```bash
# 构建项目
npm run build

# 预览构建结果
npm run preview
```

## 🚀 部署到 GitHub Pages

### 自动部署（推荐）

1. **Fork 或克隆此项目到你的 GitHub 账户**

2. **修改配置**：
   - 如果你的仓库名不是 `username.github.io`，需要修改 `vite.config.ts` 中的 `base` 配置：
   ```typescript
   base: '/resume/',
   ```

3. **启用 GitHub Pages**：
   - 进入仓库的 Settings > Pages
   - Source 选择 "GitHub Actions"

4. **推送代码**：
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

5. **等待部署完成**：
   - GitHub Actions 会自动构建和部署
   - 部署完成后可通过 `https://dawsondx.github.io/resume` 访问

### 手动部署

```bash
# 构建项目
npm run build

# 部署到 gh-pages 分支（需要先安装 gh-pages）
npm install -g gh-pages
gh-pages -d dist
```

## 📁 项目结构

```
├── .github/workflows/    # GitHub Actions 工作流
├── public/              # 静态资源
├── src/
│   ├── components/      # React 组件
│   │   ├── common/      # 通用组件
│   │   ├── layout/      # 布局组件
│   │   ├── sections/    # 页面区块组件
│   │   └── ui/          # UI 组件
│   ├── data/           # 数据文件
│   ├── hooks/          # 自定义 Hooks
│   ├── types/          # TypeScript 类型定义
│   ├── utils/          # 工具函数
│   └── config/         # 配置文件
├── dist/               # 构建输出目录
└── ...
```

## 🎨 自定义内容

### 修改个人信息

编辑 `src/data/personalData.ts` 文件，更新你的个人信息：

```typescript
export const personalData: PersonalData = {
  basicInfo: {
    name: '你的姓名',
    title: '你的职位',
    email: 'your-email@example.com',
    // ... 其他信息
  },
  // ... 其他数据
};
```

### 修改样式主题

编辑 `tailwind.config.js` 文件来自定义颜色主题：

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // 自定义主色调
      },
    },
  },
},
```

## 🔧 性能优化

项目已包含以下性能优化：

- **代码分割**: 自动分离 vendor 和业务代码
- **资源压缩**: 生产环境自动压缩 JS/CSS
- **图片优化**: 使用 WebP 格式和懒加载
- **缓存策略**: 合理的缓存配置
- **移动端优化**: 响应式设计和触摸优化

## 📝 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 联系方式

- 邮箱: dawsondx@foxmail.com
- 电话: 13005479826

---

⭐ 如果这个项目对你有帮助，请给个 Star！