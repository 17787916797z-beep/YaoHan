/**
 * 移动端构建脚本 - 使用 Capacitor 构建 Android/iOS 应用
 *
 * 使用方法:
 *   node build-mobile.js [platform]
 *
 * 平台选项:
 *   - android : Android (默认)
 *   - ios     : iOS (需要 Mac + Xcode)
 *   - sync    : 仅同步 Web 资源
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 获取命令行参数
const platform = process.argv[2] || 'android';

// 检查 Capacitor 是否安装
function checkCapacitor() {
    console.log('🔍 检查 Capacitor 环境...\n');

    const nodeModulesPath = path.join(__dirname, 'node_modules', '@capacitor');

    if (!fs.existsSync(nodeModulesPath)) {
        console.log('⚠️ Capacitor 未安装');
        console.log('📦 正在安装 Capacitor...\n');

        try {
            execSync('npm install @capacitor/core @capacitor/cli @capacitor/android --save', {
                stdio: 'inherit',
                cwd: __dirname
            });
            console.log('✅ Capacitor 安装完成\n');
            return true;
        } catch (err) {
            console.error('❌ Capacitor 安装失败:', err.message);
            return false;
        }
    } else {
        console.log('✅ Capacitor 已安装\n');
        return true;
    }
}

// 初始化 Capacitor
function initCapacitor() {
    console.log('🚀 初始化 Capacitor...\n');

    const capacitorConfigPath = path.join(__dirname, 'capacitor.config.json');

    if (!fs.existsSync(capacitorConfigPath)) {
        console.log('⚠️ capacitor.config.json 不存在，正在创建...\n');

        const config = {
            appId: 'com.yaolanguage.learning',
            appName: '瑶语学习助手',
            webDir: '.',
            bundledWebRuntime: false
        };

        fs.writeFileSync(capacitorConfigPath, JSON.stringify(config, null, 2));
    }

    // 检查 android 目录是否存在
    const androidDir = path.join(__dirname, 'android');
    if (!fs.existsSync(androidDir)) {
        console.log('📱 添加 Android 平台...\n');

        try {
            execSync('npx cap add android', {
                stdio: 'inherit',
                cwd: __dirname
            });
        } catch (err) {
            console.error('❌ 添加 Android 平台失败:', err.message);
            console.log('💡 请确保已安装 Android Studio 和 Android SDK');
            return false;
        }
    }

    return true;
}

// 同步 Web 资源
function syncWebAssets() {
    console.log('🔄 同步 Web 资源...\n');

    try {
        execSync('npx cap sync', {
            stdio: 'inherit',
            cwd: __dirname
        });
        console.log('✅ 资源同步完成\n');
        return true;
    } catch (err) {
        console.error('❌ 资源同步失败:', err.message);
        return false;
    }
}

// 构建 Android APK
function buildAndroid() {
    console.log('🏗️ 构建 Android 应用...\n');

    const gradlewPath = path.join(__dirname, 'android', 'gradlew');

    if (!fs.existsSync(gradlewPath)) {
        console.error('❌ 找不到 gradlew 文件');
        console.log('💡 请确保已正确初始化 Capacitor');
        return false;
    }

    try {
        // 构建 APK
        const isWindows = process.platform === 'win32';
        const gradleCmd = isWindows ? 'gradlew.bat' : './gradlew';

        console.log('📦 正在打包 APK...\n');

        execSync(`${gradleCmd} assembleRelease`, {
            stdio: 'inherit',
            cwd: path.join(__dirname, 'android')
        });

        console.log('\n✅ Android 应用构建成功!');

        // 显示 APK 路径
        const apkPath = path.join(__dirname, 'android', 'app', 'build', 'outputs', 'apk', 'release', 'app-release-unsigned.apk');
        if (fs.existsSync(apkPath)) {
            const stats = fs.statSync(apkPath);
            const size = (stats.size / 1024 / 1024).toFixed(2);
            console.log(`\n📱 APK 文件:`);
            console.log(`   路径: ${apkPath}`);
            console.log(`   大小: ${size} MB`);
            console.log('\n💡 提示: 如需签名，请使用 jarsigner 或 Android Studio');
        }

        return true;
    } catch (err) {
        console.error('❌ Android 构建失败:', err.message);
        console.log('\n💡 可能的解决方案:');
        console.log('   1. 确保已安装 Android Studio');
        console.log('   2. 确保 ANDROID_HOME 环境变量已设置');
        console.log('   3. 运行 npx cap open android 检查配置');
        return false;
    }
}

// 主函数
function main() {
    console.log('╔════════════════════════════════════════════════════════╗');
    console.log('║        瑶语学习助手 - 移动端构建脚本                  ║');
    console.log('╚════════════════════════════════════════════════════════╝\n');

    // 根据平台执行不同操作
    switch (platform) {
        case 'sync':
            if (!checkCapacitor()) return;
            syncWebAssets();
            break;

        case 'android':
            if (!checkCapacitor()) return;
            if (!initCapacitor()) return;
            if (!syncWebAssets()) return;
            buildAndroid();
            break;

        case 'ios':
            console.log('🍎 iOS 构建');
            console.log('💡 请使用 Mac 电脑运行此脚本');
            console.log('📋 步骤:');
            console.log('   1. npx cap add ios');
            console.log('   2. npx cap open ios');
            console.log('   3. 在 Xcode 中构建');
            break;

        default:
            console.log('❌ 未知平台:', platform);
            console.log('💡 可用平台: android, ios, sync');
    }
}

// 运行主函数
main();
