# 瑶语学习助手 - 快速开始指南

本文档提供最简单的打包步骤，帮助您快速将瑶语学习助手封装为电脑软件和手机APP。

---

## 📋 准备工作

### 安装 Node.js

1. 访问 https://nodejs.org/
2. 下载 LTS 版本 (推荐 v18 或更高)
3. 运行安装程序，按提示完成安装
4. 验证安装：打开命令提示符，输入
   ```
   node --version
   npm --version
   ```

---

## 🖥️ 一、打包为 Windows 电脑软件

### 方法一：使用快速构建工具 (推荐)

1. **打开项目文件夹**
   ```
   双击打开 C:\Users\lenovo\Desktop\YaoHan 文件夹
   ```

2. **运行快速构建脚本**
   ```
   双击运行 quick-build.bat
   ```

3. **按提示操作**
   - 输入 `1` 选择 Windows 桌面版
   - 等待构建完成

4. **获取安装包**
   - 构建完成后，安装包位于 `dist` 文件夹
   - 文件名: `瑶语学习助手 Setup 1.0.0.exe`

### 方法二：使用命令行

1. **打开命令提示符**
   - 按 `Win + R`
   - 输入 `cmd`
   - 按回车

2. **进入项目目录**
   ```bash
   cd C:\Users\lenovo\Desktop\YaoHan
   ```

3. **安装依赖 (首次运行)**
   ```bash
   npm install
   ```

4. **运行打包命令**
   ```bash
   npm run build:win
   ```

5. **获取安装包**
   - 安装包位于 `dist` 文件夹

---

## 📱 二、打包为 Android 手机APP

### 环境准备

1. **安装 Java JDK 11**
   - 访问 https://adoptium.net/
   - 下载 OpenJDK 11 (LTS)
   - 安装并设置环境变量

2. **安装 Android Studio**
   - 访问 https://developer.android.com/studio
   - 下载并安装
   - 首次启动时安装 Android SDK

### 构建步骤

1. **打开命令提示符**
   ```bash
   cd C:\Users\lenovo\Desktop\YaoHan
   ```

2. **安装依赖 (首次运行)**
   ```bash
   npm install
   ```

3. **运行移动端构建脚本**
   ```bash
   node build-mobile.js android
   ```

4. **在 Android Studio 中完成打包**
   - 等待 Gradle 同步
   - 选择 `Build` → `Generate Signed Bundle / APK`
   - 选择 `APK` 并完成签名

5. **获取 APK**
   - 位置: `android/app/build/outputs/apk/release/app-release.apk`

---

## 📋 命令速查表

### 电脑端

```bash
npm start          # 启动开发模式
npm run build:win   # Windows
npm run build:mac   # macOS
npm run build:linux # Linux
```

### 手机端

```bash
node build-mobile.js android  # Android
npm run mobile:sync           # 同步资源
npm run mobile:open           # 打开 Android Studio
```

---

## 🆘 常见问题

### Q1: 构建失败，提示缺少依赖

**解决:**
```bash
rmdir /s /q node_modules
npm install
```

### Q2: Android 构建提示找不到 SDK

**解决:**
1. 安装 Android Studio
2. 设置环境变量 `ANDROID_HOME`
3. 重启命令提示符

### Q3: 图标显示不正确

**解决:**
```bash
npm run icons
```

---

**祝打包顺利！** 🎉
