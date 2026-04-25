/**
 * 图标生成脚本 - 使用 Canvas 生成应用图标
 * 运行: node create-icons.js
 */

const fs = require('fs');
const path = require('path');

// 创建 assets 目录
const assetsDir = path.join(__dirname, 'assets');
if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
}

// 生成 PNG 图标 (用于 Windows/Mac/Linux)
function generatePNGIcon(size) {
    // 创建一个简单的 SVG 图标
    const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#6366f1;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="100" fill="url(#grad)"/>
  <text x="256" y="340" font-family="Segoe UI, PingFang SC, sans-serif" font-size="200" font-weight="bold" text-anchor="middle" fill="white">瑶</text>
  <text x="256" y="420" font-family="Segoe UI, PingFang SC, sans-serif" font-size="60" font-weight="500" text-anchor="middle" fill="rgba(255,255,255,0.9)">YAO</text>
</svg>`;

    // 保存 SVG (临时)
    const svgPath = path.join(assetsDir, `icon-${size}.svg`);
    fs.writeFileSync(svgPath, svgContent);

    console.log(`✓ Generated icon-${size}.svg`);

    return svgPath;
}

// 生成不同尺寸的图标
console.log('🎨 Generating application icons...\n');

const sizes = [16, 32, 48, 64, 128, 256, 512];
sizes.forEach(size => generatePNGIcon(size));

// 创建 icon.ico 的内容说明
const icoReadme = `# Application Icons

## Generated Files
- icon-{size}.svg - SVG icons for all sizes (16px to 512px)

## Required Files (to be converted)
To complete the icon set, you need to convert the SVG files:

### Windows (.ico)
1. Install ImageMagick: https://imagemagick.org
2. Run: \`magick convert icon-256.svg icon.ico\`
3. Copy icon.ico to this folder

### macOS (.icns)
1. Create iconset folder: \`mkdir icon.iconset\`
2. Convert SVG to PNGs at different sizes
3. Run: \`iconutil -c icns icon.iconset\`
4. Copy icon.icns to this folder

### Alternative (Online Tools)
- https://convertio.co/svg-ico/
- https://www.icoconverter.com/

## Icon Design
The icon features:
- Gradient background (Indigo to Violet)
- Chinese character "瑶" (Yao)
- Text "YAO" below
- Rounded corners for modern look
`;

fs.writeFileSync(path.join(assetsDir, 'README.md'), icoReadme);

console.log('\n✅ Icons generated successfully!');
console.log('\n📋 Next steps:');
console.log('   1. SVG files are in: assets/ folder');
console.log('   2. Convert SVG to icon.ico for Windows');
console.log('   3. Convert SVG to icon.icns for macOS');
console.log('   4. See assets/README.md for detailed instructions');
