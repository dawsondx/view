# 部署指南

本文档详细说明如何将个人展示网站部署到 GitHub Pages。

## 🚀 快速部署

### 方法一：自动部署（推荐）

1. **准备 GitHub 仓库**
   ```bash
   # 如果还没有创建仓库，先在 GitHub 上创建一个新仓库
   # 然后克隆到本地或推送现有代码
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   # 使用 SSH 方式添加远程仓库（推荐）
   git remote add origin git@github.com:dawsondx/resume.git
   # 或使用 HTTPS 方式
   # git remote add origin https://github.com/dawsondx/resume.git
   git push -u origin main
   ```

2. **配置 GitHub Pages**
   - 进入你的 GitHub 仓库
   - 点击 `Settings` 选项卡
   - 在左侧菜单中找到 `Pages`
   - 在 `Source` 部分选择 `GitHub Actions`

3. **修改配置文件**
   
   如果你的仓库名不是 `username.github.io`，需要修改 `vite.config.ts`：
   ```typescript
   export default defineConfig({
     // 将 base 改为你的仓库名
     base: '/resume/',
     // 其他配置...
   })
   ```

4. **推送代码触发部署**
   ```bash
   git add .
   git commit -m "Configure for GitHub Pages deployment"
   git push origin main
   ```

5. **等待部署完成**
   - GitHub Actions 会自动运行部署流程
   - 在 `Actions` 选项卡中可以查看部署进度
   - 部署成功后，网站将在 `https://dawsondx.github.io/resume` 可访问

### 方法二：手动部署

1. **安装 gh-pages**
   ```bash
   npm install -g gh-pages
   ```

2. **构建项目**
   ```bash
   npm run build
   ```

3. **部署到 gh-pages 分支**
   ```bash
   npm run deploy
   ```

## 🔧 配置说明

### Vite 配置优化

项目已经针对 GitHub Pages 部署进行了优化：

```typescript
// vite.config.ts
export default defineConfig({
  base: './', // 相对路径，适用于大多数情况
  build: {
    sourcemap: false, // 生产环境不生成 sourcemap
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          motion: ['framer-motion']
        }
      }
    },
    minify: 'terser', // 使用 terser 压缩
    terserOptions: {
      compress: {
        drop_console: true, // 移除 console.log
        drop_debugger: true // 移除 debugger
      }
    }
  }
})
```

### GitHub Actions 工作流

`.github/workflows/deploy.yml` 文件配置了自动部署流程：

- 当推送到 `main` 或 `master` 分支时触发
- 自动安装依赖、构建项目
- 部署到 `gh-pages` 分支

## 🌐 自定义域名（可选）

如果你有自己的域名，可以配置自定义域名：

1. **在 GitHub 仓库设置中配置域名**
   - 进入 `Settings` > `Pages`
   - 在 `Custom domain` 中输入你的域名

2. **修改 GitHub Actions 配置**
   ```yaml
   # .github/workflows/deploy.yml
   - name: Deploy to GitHub Pages
     uses: peaceiris/actions-gh-pages@v3
     with:
       github_token: ${{ secrets.GITHUB_TOKEN }}
       publish_dir: ./dist
       cname: your-domain.com  # 添加这一行
   ```

3. **配置 DNS**
   - 在你的域名提供商处添加 CNAME 记录
   - 指向 `username.github.io`

## 🔍 SEO 优化

项目已包含以下 SEO 优化：

- **Meta 标签**：完整的 SEO meta 标签
- **Open Graph**：社交媒体分享优化
- **Twitter Cards**：Twitter 分享优化
- **Robots.txt**：搜索引擎爬虫指引
- **结构化数据**：有利于搜索引擎理解

## 📊 性能优化

- **代码分割**：自动分离 vendor 和业务代码
- **资源压缩**：CSS 和 JS 自动压缩
- **图片优化**：建议使用 WebP 格式
- **缓存策略**：合理的缓存配置

## 🐛 常见问题

### 1. 页面显示 404

**原因**：`base` 配置不正确

**解决方案**：
- 如果仓库名是 `username.github.io`，设置 `base: './'
- 如果仓库名是其他名称，设置 `base: '/repo-name/'`

### 2. 资源加载失败

**原因**：路径配置问题

**解决方案**：
- 检查 `vite.config.ts` 中的 `base` 配置
- 确保所有资源使用相对路径

### 3. GitHub Actions 部署失败

**原因**：权限或配置问题

**解决方案**：
- 确保仓库开启了 GitHub Actions
- 检查 `package.json` 中的脚本配置
- 查看 Actions 日志了解具体错误

### 4. 构建失败

**原因**：依赖或配置问题

**解决方案**：
```bash
# 清理并重新安装依赖
rm -rf node_modules package-lock.json
npm install

# 重新构建
npm run build
```

## 📞 技术支持

如果遇到问题，可以：

1. 查看 [GitHub Pages 官方文档](https://docs.github.com/en/pages)
2. 查看 [Vite 部署文档](https://vitejs.dev/guide/static-deploy.html)
3. 在项目仓库中提交 Issue

---

🎉 **恭喜！** 你的个人展示网站现在已经可以在互联网上访问了！