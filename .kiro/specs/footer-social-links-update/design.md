# Design Document

## Overview

更新Footer组件中的社交媒体链接配置，将现有的GitHub、LinkedIn、微信、邮箱链接替换为公众号、知乎、小红书、语雀四个平台。公众号采用悬浮二维码显示方式，其他平台直接跳转到对应链接。

## Architecture

### 组件结构
- Footer组件保持现有结构
- 更新socialLinks数组配置
- 为公众号添加特殊的悬浮二维码组件
- 更新图标SVG内容

### 数据流
1. socialLinks配置数组定义平台信息
2. 公众号项包含特殊的hover处理逻辑
3. 其他平台直接使用href跳转

## Components and Interfaces

### SocialLink Interface
```typescript
interface SocialLink {
  name: string;
  href?: string; // 公众号可能不需要href
  icon: React.ReactNode;
  showQRCode?: boolean; // 是否显示二维码
  qrCodeImage?: string; // 二维码图片路径
}
```

### QRCodeTooltip Component
```typescript
interface QRCodeTooltipProps {
  imageSrc: string;
  altText: string;
  isVisible: boolean;
}
```

## Data Models

### 社交媒体链接配置
```typescript
const socialLinks: SocialLink[] = [
  {
    name: '公众号',
    showQRCode: true,
    qrCodeImage: '/qrcode-gzh.webp',
    icon: <WeChatIcon />
  },
  {
    name: '知乎',
    href: 'https://www.zhihu.com/people/dawsondx',
    icon: <ZhihuIcon />
  },
  {
    name: '小红书',
    href: 'https://www.xiaohongshu.com/user/profile/6303a620000000001200d7bd',
    icon: <XiaohongshuIcon />
  },
  {
    name: '语雀',
    href: 'https://www.yuque.com/dawsondx',
    icon: <YuqueIcon />
  }
];
```

### 图标设计
- **公众号**: 使用微信公众号相关的图标（可能是微信图标的变体）
- **知乎**: 使用知乎的"知"字图标或品牌图标
- **小红书**: 使用小红书的品牌图标
- **语雀**: 使用语雀的品牌图标

## Error Handling

### 二维码加载失败
- 显示备用文本："扫码关注公众号"
- 或显示默认的二维码占位图标

### 链接跳转失败
- 使用target="_blank"和rel="noopener noreferrer"确保安全跳转
- 添加错误边界处理

### 图标加载失败
- 为每个图标提供备用的文本标识
- 使用title属性提供可访问性支持

## Testing Strategy

### 单元测试
- 测试socialLinks配置正确性
- 测试二维码悬浮显示/隐藏逻辑
- 测试链接跳转功能

### 集成测试
- 测试Footer组件渲染
- 测试用户交互（悬停、点击）
- 测试响应式布局

### 视觉测试
- 验证二维码显示尺寸和位置
- 验证图标样式一致性
- 验证悬浮效果动画

## Implementation Notes

### 二维码悬浮实现
- 使用CSS position: absolute定位
- 使用framer-motion实现平滑动画
- 固定尺寸避免变形（建议150x150px）

### 图标获取策略
1. 优先使用各平台官方提供的SVG图标
2. 如无官方图标，使用简化的品牌识别图标
3. 确保图标风格与现有设计一致

### 响应式考虑
- 移动端可能需要调整二维码显示方式
- 考虑使用点击而非悬停来显示二维码（移动端）