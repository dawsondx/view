# Requirements Document

## Introduction

更新网站底部Footer组件中的"关注我"社交媒体链接部分，将现有的4个社交媒体入口更新为：公众号（带二维码悬浮显示）、知乎、小红书、语雀，并为每个平台配置正确的链接和图标。

## Requirements

### Requirement 1

**User Story:** 作为网站访问者，我希望能够通过底部的社交媒体链接关注Dawson的各个平台账号，以便获取更多内容和保持联系。

#### Acceptance Criteria

1. WHEN 用户查看网站底部 THEN 系统应显示4个社交媒体入口：公众号、知乎、小红书、语雀
2. WHEN 用户悬停在公众号图标上 THEN 系统应显示公众号二维码图片（public/qrcode-gzh.webp）
3. WHEN 用户点击知乎图标 THEN 系统应跳转到 https://www.zhihu.com/people/dawsondx
4. WHEN 用户点击小红书图标 THEN 系统应跳转到 https://www.xiaohongshu.com/user/profile/6303a620000000001200d7bd
5. WHEN 用户点击语雀图标 THEN 系统应跳转到 https://www.yuque.com/dawsondx

### Requirement 2

**User Story:** 作为网站访问者，我希望看到合适的图标来识别不同的社交媒体平台，以便快速找到我想要关注的平台。

#### Acceptance Criteria

1. WHEN 用户查看社交媒体图标 THEN 每个平台应显示其特有的识别图标
2. WHEN 用户查看公众号图标 THEN 应显示微信公众号相关的图标
3. WHEN 用户查看知乎图标 THEN 应显示知乎品牌相关的图标
4. WHEN 用户查看小红书图标 THEN 应显示小红书品牌相关的图标
5. WHEN 用户查看语雀图标 THEN 应显示语雀品牌相关的图标

### Requirement 3

**User Story:** 作为网站访问者，我希望公众号二维码以合适的尺寸和样式显示，以便我能够清晰地扫描关注。

#### Acceptance Criteria

1. WHEN 用户悬停在公众号图标上 THEN 二维码应以固定尺寸显示，不发生变形
2. WHEN 二维码显示时 THEN 应有适当的背景和边框样式以提高可读性
3. WHEN 用户移开鼠标 THEN 二维码应平滑隐藏
4. IF 二维码图片加载失败 THEN 系统应显示备用内容或错误提示