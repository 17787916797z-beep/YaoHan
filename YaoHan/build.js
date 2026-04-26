/**
 * 构建脚本 - 打包 Electron 应用
 *
 * 使用方法:
 *   node build.js [platform]
 *
 * 平台选项:
 *   - win   : Windows (默认)
 *   - mac   : macOS
 *   - linux : Linux
 *   - all   : 所有平台
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 获取命令行参数
const platform = process.argv[2] || 'win';

// 检查是否安装了 electron-builder
function checkDependencies() {
    console.log('🔍 检查依赖...\n');

    try {
        require('electron-builder');
        console.log('✅ electron-builder 已安装\n');
        return true;
    } catch (e) {
        console.log('⚠️ electron-builder 未安装');
        console.log('📦 正在安装依赖...\n');

        try {
            execSync('npm install electron-builder electron --save-dev', {
                stdio: 'inherit',
                cwd: __dirname
            });
            console.log('✅ 依赖安装完成\n');
            return true;
        } catch (err) {
            console.error('❌ 依赖安装失败:', err.message);
            return false;
        }
    }
}

// 检查并生成图标
function checkIcons() {
    console.log('🎨 检查应用图标...\n');

    const assetsDir = path.join(__dirname, 'assets');

    if (!fs.existsSync(assetsDir)) {
        fs.mkdirSync(assetsDir, { recursive: true });
    }

    const iconFiles = ['icon.png', 'icon.ico', 'icon.icns'];
    const missingIcons = iconFiles.filter(icon =>
        !fs.existsSync(path.join(assetsDir, icon))
    );

    if (missingIcons.length > 0) {
        console.log('⚠️ 缺少以下图标文件:');
        missingIcons.forEach(icon => console.log(`   - ${icon}`));
        console.log('\n📦 生成默认图标...\n');

        // 运行图标生成脚本
        try {
            execSync('node create-icons.js', {
                stdio: 'inherit',
                cwd: __dirname
            });
        } catch (err) {
            console.log('⚠️ 图标生成失败，将使用系统默认图标\n');
        }
    } else {
        console.log('✅ 所有图标文件已存在\n');
    }
}

// 构建应用
function buildApp() {
    console.log('🏗️ 开始构建应用...\n');

    let buildCmd = 'electron-builder';

    switch (platform) {
        case 'win':
        case 'windows':
            buildCmd += ' --win';
            console.log('🪟 构建目标: Windows\n');
            break;
        case 'mac':
        case 'macos':
            buildCmd += ' --mac';
            console.log('🍎 构建目标: macOS\n');
            break;
        case 'linux':
            buildCmd += ' --linux';
            console.log('🐧 构建目标: Linux\n');
            break;
        case 'all':
            console.log('🌍 构建目标: 所有平台\n');
            break;
        default:
            buildCmd += ' --win';
            console.log('🪟 构建目标: Windows (默认)\n');
    }

    try {
        execSync(buildCmd, {
            stdio: 'inherit',
            cwd: __dirname
        });

        console.log('\n✅ 构建成功!');
        console.log('\n📦 输出目录: dist/');

        // 列出输出文件
        const distDir = path.join(__dirname, 'dist');
        if (fs.existsSync(distDir)) {
            const files = fs.readdirSync(distDir);
            console.log('\n📄 生成的文件:');
            files.forEach(file => {
                const filePath = path.join(distDir, file);
                const stats = fs.statSync(filePath);
                const size = (stats.size / 1024 / 1024).toFixed(2);
                console.log(`   - ${file} (${size} MB)`);
            });
        }

        console.log('\n🎉 打包完成!');

    } catch (err) {
        console.error('\n❌ 构建失败:', err.message);
        console.log('\n💡 可能的解决方案:');
        console.log('   1. 确保安装了所有依赖: npm install');
        console.log('   2. 确保有足够的磁盘空间');
        console.log('   3. 检查 package.json 配置是否正确');
        process.exit(1);
    }
}

// 主函数
function main() {
    console.log('╔════════════════════════════════════════════════════════╗');
    console.log('║        瑶语学习助手 - Electron 构建脚本              ║');
    console.log('╚════════════════════════════════════════════════════════╝\n');

    // 检查依赖
    if (!checkDependencies()) {
        process.exit(1);
    }

    // 检查图标
    checkIcons();

    // 构建应用
    buildApp();
}

// 运行主函数
main();
