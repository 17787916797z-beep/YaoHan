# 瑶语学习助手 - 蓝靛瑶语发音训练系统

## 📋 项目简介

"瑶语学习助手"是一款专注于蓝靛瑶语发音训练的AI学习应用，采用纯前端技术实现离线语音识别和智能评分。本项目是完整的单文件HTML应用，支持多端运行。

### 核心创新点

1. **民族语言保护创新**：支持瑶语数字化学习与发音评估，助力少数民族语言文化传承
2. **完全离线AI创新**：无需网络的本地AI语音评测系统，适配边缘设备、低资源环境
3. **跨平台统一引擎创新**：一套前端代码实现PC+移动端统一AI语音学习系统

---

## 🎯 功能特性

### 核心功能
- ✅ 中文↔蓝靛瑶双语对照大字展示
- ✅ 点击播放本地标准瑶语发音音频
- ✅ 麦克风实时录音跟读
- ✅ 本地离线AI发音评分（0-100分）
- ✅ 闯关规则：≥60分闯关成功，自动进入下一关
- ✅ 完整20关学习（10组基础发音×正常语速+慢速语速）
- ✅ 学习数据本地存储（进度、最高分、测试次数）

### AI评分系统（全面升级）
- **多维评分体系**：音准（Pitch）+ 节奏（Duration）+ 音色（MFCC）+ 流畅度
- **技术实现**：MFCC特征提取 + Pitch提取 + DTW动态时间规整 + 余弦相似度
- **AI评分解释机制**：
  - 发音偏差定位（声调/音素级）
  - 针对性发音纠正建议
  - 标准发音与用户发音的差异说明
- **轻量AI模型预留接口**：支持后续CNN/RNN模型扩展

### 学习成长系统
- 发音进步曲线（可视化图表）
- 连续学习天数统计
- 等级系统（Lv1-Lv10）自动升级
- AI个性化学习推荐（基于发音错误历史）

### Demo展示模式
- 一键启动演示模式
- 自动播放标准发音 → 自动录音 → 自动评分
- 全程无需手动操作，适合大赛现场演示

---

## 📁 项目结构

```
瑶语学习助手/
├── index.html              # 主应用文件（完整单文件HTML应用）
├── package.json            # Electron打包配置
├── main.js                 # Electron主进程入口
├── README.md               # 项目说明文档
├── assets/                 # 应用图标等资源（需要自行添加）
│   ├── icon.png
│   ├── icon.ico
│   └── icon.icns
└── audio/                  # 音频文件夹（需要自行准备）
    └── 基础发音/
        ├── 基础发音-001-蓝靛瑶-慢速.wav
        ├── 基础发音-001-蓝靛瑶-正常.wav
        ├── 基础发音-002-蓝靛瑶-慢速.wav
        ├── 基础发音-002-蓝靛瑶-正常.wav
        ... (一直到010，共20个文件)
```

---

## 🚀 快速开始

### 方式一：直接浏览器打开（最简单）

1. 将项目文件夹放入合适位置
2. 确保 `audio/基础发音/` 目录下包含所有音频文件
3. 直接用浏览器打开 `index.html` 文件
4. 允许浏览器访问麦克风权限即可使用

### 方式二：本地HTTP服务器（推荐）

```bash
# 进入项目目录
cd 瑶语学习助手

# 使用Python启动简单HTTP服务器
# Python 3
python -m http.server 8080

# Python 2
python -m SimpleHTTPServer 8080

# 或使用Node.js http-server
npx http-server -p 8080

# 然后浏览器访问 http://localhost:8080
```

---

## 💻 打包为桌面应用（Electron）

### 环境准备

```bash
# 确保已安装Node.js（建议v18或更高版本）
node --version

# 安装Electron打包依赖
npm install
```

### 开发模式运行

```bash
# 启动Electron开发模式
npm start
```

### 打包应用

```bash
# 打包所有平台
npm run build

# 仅打包Windows
npm run build:win

# 仅打包macOS
npm run build:mac

# 仅打包Linux
npm run build:linux
```

打包完成后，可在 `dist` 目录找到安装包：
- Windows: `dist/瑶语学习助手 Setup 1.0.0.exe`
- macOS: `dist/瑶语学习助手-1.0.0.dmg`
- Linux: `dist/瑶语学习助手-1.0.0.AppImage`

---

## 📱 打包为移动端应用

### 方案一：PWA（渐进式Web应用）

`index.html` 已经内置PWA支持（含Service Worker代码），可直接部署到HTTPS服务器，然后：

1. 在移动浏览器中打开应用
2. 点击"添加到主屏幕"
3. 即可像原生App一样使用

### 方案二：Capacitor（推荐）

```bash
# 安装Capacitor CLI
npm install @capacitor/core @capacitor/cli

# 初始化Capacitor
npx cap init 瑶语学习助手 com.yaolanguage.learning --web-dir .

# 添加Android平台
npx cap add android

# 添加iOS平台（需要Mac）
npx cap add ios

# 同步Web资源
npx cap sync

# 打开Android Studio/Xcode进行打包
npx cap open android
npx cap open ios
```

---

## ⚙️ 技术栈说明

### 核心技术
- **纯前端三件套**：HTML5 + CSS3 + JavaScript (ES6+)
- **Web Audio API**：音频录制、分析和特征提取
- **MediaRecorder API**：麦克风录音
- **Canvas API**：实时波形可视化和图表绘制

### AI算法实现
- **MFCC特征提取**：Mel频率倒谱系数，用于音色分析
- **Pitch提取（YIN算法）**：基频检测，用于音准分析
- **DTW动态时间规整**：时序对齐和相似度计算
- **余弦相似度**：特征向量匹配度计算

### 存储方案
- **LocalStorage**：学习进度、分数等数据持久化
- **IndexedDB**（预留接口）：支持更大的存储需求

### 打包方案
- **Electron**：桌面端打包（Windows/macOS/Linux）
- **Capacitor**：移动端打包（Android/iOS）
- **PWA**：渐进式Web应用

---

## 📚 数据集说明

### 音频文件要求
- **格式**：WAV（16kHz, 单声道, 16bit）
- **命名规则**：`基础发音-{序号}-蓝靛瑶-{语速}.wav`
- **语速类型**：慢速（初学者）、正常（标准发音）
- **存放位置**：`./audio/基础发音/`

### 关卡数据结构

```javascript
{
    id: 1,              // 关卡ID（1-20）
    yao: "你好",        // 瑶语文字
    chinese: "你好",    // 中文释义
    group: 1,           // 发音组（1-10）
    speed: "slow"       // 语速（slow/normal）
}
```

### 关卡顺序
```
001慢速 → 001正常 → 002慢速 → 002正常 → ... → 010正常
（共20关）
```

---

## 🔧 常见问题排查

### Q1: 浏览器提示"无法访问麦克风"
**解决方案**：
1. 确保使用HTTPS或localhost访问
2. 点击浏览器地址栏的🔒图标，允许麦克风权限
3. 检查系统隐私设置中浏览器的麦克风权限

### Q2: 音频无法播放
**解决方案**：
1. 检查音频文件路径是否正确
2. 确认音频文件格式为WAV（16kHz, 单声道）
3. 使用HTTP服务器而不是直接打开文件
4. 查看浏览器控制台的错误信息

### Q3: 评分结果异常或一直很低
**解决方案**：
1. 确保在安静环境下录音
2. 调整麦克风音量至合适水平
3. 尽量靠近麦克风发音
4. 确保使用了正确的语速模式（初学者建议先用慢速）

### Q4: Electron打包失败
**解决方案**：
1. 确保Node.js版本≥18
2. 删除`node_modules`和`package-lock.json`后重新`npm install`
3. 检查是否有足够的磁盘空间
4. 查看错误日志进行针对性修复

### Q5: 数据丢失
**解决方案**：
1. 检查浏览器LocalStorage是否被清除
2. 使用Electron桌面版可获得更稳定的数据存储
3. 定期导出备份数据（可在控制台运行`localStorage.getItem('yaoLanguageLearning')`获取数据）

---

## 🤝 贡献指南

欢迎提交Issue和Pull Request！

### 提交Issue
- 描述问题时请提供详细的环境信息（操作系统、浏览器版本等）
- 如果是Bug，请提供复现步骤
- 如果是功能建议，请描述使用场景

### 代码贡献
1. Fork本项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开Pull Request

---

## 📜 开源协议

本项目采用 [MIT License](LICENSE) 开源协议。

---

## 🙏 致谢

- 感谢蓝靛瑶语使用者为本项目提供语言支持
- 感谢所有为民族语言保护事业做出贡献的工作者
- 感谢开源社区提供的优秀工具和技术

---

## 📞 联系我们

如有任何问题或建议，欢迎联系我们：

- 项目主页：[GitHub](https://github.com/yourusername/yao-language-learning)
- 问题反馈：[Issues](https://github.com/yourusername/yao-language-learning/issues)
- 电子邮箱：contact@yaolanguage.com（示例）

---

**传承瑶族语言文化，从每一个音节开始。** 🏔️
