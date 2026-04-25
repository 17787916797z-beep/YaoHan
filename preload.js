/**
 * 预加载脚本 - 安全地暴露必要的API给渲染进程
 */

const { contextBridge, ipcRenderer } = require('electron');

// 暴露安全的API给渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
    // 应用信息
    getAppInfo: () => ipcRenderer.invoke('get-app-info'),

    // 音频设备
    getAudioDevices: () => ipcRenderer.invoke('get-audio-devices'),

    // 文件系统（受限）
    checkAudioFile: (filePath) => ipcRenderer.invoke('check-audio-file', filePath),

    // 数据存储
    saveData: (key, data) => ipcRenderer.invoke('save-data', key, data),
    loadData: (key) => ipcRenderer.invoke('load-data', key),

    // 窗口控制
    minimize: () => ipcRenderer.invoke('window-minimize'),
    maximize: () => ipcRenderer.invoke('window-maximize'),
    close: () => ipcRenderer.invoke('window-close'),

    // 平台信息
    platform: process.platform,

    // 检查更新
    checkUpdate: () => ipcRenderer.invoke('check-update'),

    // 监听事件
    onUpdateAvailable: (callback) => ipcRenderer.on('update-available', callback),
    onUpdateDownloaded: (callback) => ipcRenderer.on('update-downloaded', callback)
});

// 通知渲染进程预加载完成
console.log('[Preload] Electron API exposed successfully');
