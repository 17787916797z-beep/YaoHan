#!/bin/bash

# 瑶语学习助手 - 快速构建工具 (macOS/Linux)

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 打印彩色文本
print_info() {
    echo -e "${BLUE}$1${NC}"
}

print_success() {
    echo -e "${GREEN}$1${NC}"
}

print_warning() {
    echo -e "${YELLOW}$1${NC}"
}

print_error() {
    echo -e "${RED}$1${NC}"
}

# 显示标题
show_header() {
    clear
    echo "╔════════════════════════════════════════════════════════╗"
    echo "║        瑶语学习助手 - 快速构建工具                    ║"
    echo "╚════════════════════════════════════════════════════════╝"
    echo ""
}

# 检查依赖
check_dependencies() {
    print_info "🔍 检查依赖..."

    # 检查 Node.js
    if ! command -v node &> /dev/null; then
        print_error "❌ 未安装 Node.js"
        echo "请访问 https://nodejs.org/ 下载安装"
        exit 1
    fi

    NODE_VERSION=$(node --version)
    print_success "✅ Node.js 版本: $NODE_VERSION"

    # 检查 npm
    if ! command -v npm &> /dev/null; then
        print_error "❌ 未安装 npm"
        exit 1
    fi

    NPM_VERSION=$(npm --version)
    print_success "✅ npm 版本: $NPM_VERSION"

    echo ""
}

# 安装项目依赖
install_deps() {
    print_info "📦 安装项目依赖..."

    if [ -d "node_modules" ]; then
        print_warning "⚠️ node_modules 已存在，跳过安装"
        return 0
    fi

    npm install

    if [ $? -eq 0 ]; then
        print_success "✅ 依赖安装完成"
    else
        print_error "❌ 依赖安装失败"
        return 1
    fi

    echo ""
}

# 生成图标
generate_icons() {
    print_info "🎨 生成应用图标..."

    if [ -f "assets/icon.png" ]; then
        print_warning "⚠️ 图标已存在，跳过生成"
        return 0
    fi

    node create-icons.js

    if [ $? -eq 0 ]; then
        print_success "✅ 图标生成完成"
    else
        print_warning "⚠️ 图标生成失败，将使用默认图标"
    fi

    echo ""
}

# 构建 macOS 版本
build_macos() {
    print_info "🍎 开始构建 macOS 版本..."

    # 检查是否在 macOS 上运行
    if [[ "$OSTYPE" != "darwin"* ]]; then
        print_error "❌ macOS 构建需要在 macOS 系统上运行"
        return 1
    fi

    npm run build:mac

    if [ $? -eq 0 ]; then
        print_success "✅ macOS 构建完成"
        print_info "📂 输出目录: dist/"
        ls -lh dist/*.{dmg,zip} 2>/dev/null || true
    else
        print_error "❌ macOS 构建失败"
        return 1
    fi

    echo ""
}

# 构建 Linux 版本
build_linux() {
    print_info "🐧 开始构建 Linux 版本..."

    npm run build:linux

    if [ $? -eq 0 ]; then
        print_success "✅ Linux 构建完成"
        print_info "📂 输出目录: dist/"
        ls -lh dist/*.{AppImage,deb,rpm} 2>/dev/null || true
    else
        print_error "❌ Linux 构建失败"
        return 1
    fi

    echo ""
}

# Android 构建
build_android() {
    print_info "📱 开始构建 Android 版本..."

    # 检查 Capacitor
    if [ ! -d "node_modules/@capacitor" ]; then
        print_info "📦 安装 Capacitor..."
        npm install @capacitor/core @capacitor/cli @capacitor/android --save
    fi

    # 运行构建脚本
    node build-mobile.js android

    if [ $? -eq 0 ]; then
        print_success "✅ Android 构建流程完成"
        print_warning "💡 请在 Android Studio 中完成最终签名和打包"
    else
        print_error "❌ Android 构建失败"
        return 1
    fi

    echo ""
}

# iOS 构建
build_ios() {
    print_info "🍎 开始构建 iOS 版本..."

    # 检查是否在 macOS 上运行
    if [[ "$OSTYPE" != "darwin"* ]]; then
        print_error "❌ iOS 构建需要在 macOS 系统上运行"
        return 1
    fi

    print_info "📋 iOS 构建步骤:"
    echo "   1. npm install @capacitor/ios"
    echo "   2. npx cap add ios"
    echo "   3. npx cap open ios"
    echo "   4. 在 Xcode 中配置签名并构建"
    echo ""
}

# 显示菜单
show_menu() {
    echo "请选择构建目标:"
    echo ""
    echo "  电脑端:"
    echo "    [1] Windows 桌面版"
    echo "    [2] macOS 桌面版"
    echo "    [3] Linux 桌面版"
    echo ""
    echo "  手机端:"
    echo "    [4] Android APP"
    echo "    [5] iOS APP (仅 Mac)"
    echo ""
    echo "  其他:"
    echo "    [6] 安装依赖"
    echo "    [7] 生成图标"
    echo "    [0] 退出"
    echo ""
}

# 主函数
main() {
    show_header

    # 检查依赖
    check_dependencies

    # 主循环
    while true; do
        show_menu
        read -p "请输入选项 [0-7]: " choice

        case $choice in
            1)
                install_deps
                generate_icons
                # Windows 构建需要在 Windows 上运行，这里给出提示
                print_warning "💡 Windows 构建需要在 Windows 系统上运行"
                print_info "   请在 Windows 上运行: npm run build:win"
                ;;
            2)
                install_deps
                generate_icons
                build_macos
                ;;
            3)
                install_deps
                generate_icons
                build_linux
                ;;
            4)
                install_deps
                build_android
                ;;
            5)
                build_ios
                ;;
            6)
                install_deps
                ;;
            7)
                generate_icons
                ;;
            0)
                echo ""
                print_success "感谢使用，再见！"
                exit 0
                ;;
            *)
                print_error "无效选项，请重新选择"
                ;;
        esac

        echo ""
        read -p "按 Enter 键继续..."
        clear
        show_header
    done
}

# 运行主函数
main
