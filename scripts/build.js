#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class BuildManager {
    constructor() {
        this.configPath = path.join(__dirname, '../config.json');
        this.rootPath = path.join(__dirname, '../');
    }

    loadConfig() {
        const configData = fs.readFileSync(this.configPath, 'utf8');
        return JSON.parse(configData);
    }

    async build() {
        const config = this.loadConfig();
        console.log('🔨 Building Speedy-MATE5...');
        
        // Create dist directory
        const distPath = path.join(this.rootPath, config.build.output);
        if (!fs.existsSync(distPath)) {
            fs.mkdirSync(distPath, { recursive: true });
        }
        
        // Copy working version as standalone
        await this.buildStandalone(config);
        
        // Copy assets
        await this.copyAssets(config);
        
        // Generate build info
        await this.generateBuildInfo(config);
        
        console.log('✅ Build completed successfully');
    }

    async buildStandalone(config) {
        const workingPath = path.join(this.rootPath, 'speedy_mate5_working.html');
        const standalonePath = path.join(this.rootPath, config.build.output, config.build.standalone);
        
        if (fs.existsSync(workingPath)) {
            fs.copyFileSync(workingPath, standalonePath);
            console.log(`📄 Standalone: ${config.build.standalone}`);
        } else {
            console.error(`❌ Working version not found: ${workingPath}`);
        }
    }

    async copyAssets(config) {
        const distPath = path.join(this.rootPath, config.build.output);
        
        // Copy README
        const readmePath = path.join(this.rootPath, 'README.md');
        if (fs.existsSync(readmePath)) {
            fs.copyFileSync(readmePath, path.join(distPath, 'README.md'));
        }
        
        // Copy VERSION
        const versionPath = path.join(this.rootPath, 'VERSION');
        if (fs.existsSync(versionPath)) {
            fs.copyFileSync(versionPath, path.join(distPath, 'VERSION'));
        }
        
        // Copy CHANGELOG
        const changelogPath = path.join(this.rootPath, 'CHANGELOG.md');
        if (fs.existsSync(changelogPath)) {
            fs.copyFileSync(changelogPath, path.join(distPath, 'CHANGELOG.md'));
        }
        
        console.log('📁 Assets copied');
    }

    async generateBuildInfo(config) {
        const buildInfo = {
            version: config.app.version,
            buildDate: new Date().toISOString(),
            nodeVersion: process.version,
            platform: process.platform,
            config: config
        };
        
        const buildInfoPath = path.join(this.rootPath, config.build.output, 'build-info.json');
        fs.writeFileSync(buildInfoPath, JSON.stringify(buildInfo, null, 2));
        
        console.log('📋 Build info generated');
    }

    async clean() {
        const config = this.loadConfig();
        const distPath = path.join(this.rootPath, config.build.output);
        
        if (fs.existsSync(distPath)) {
            fs.rmSync(distPath, { recursive: true, force: true });
            console.log('🧹 Build directory cleaned');
        }
    }
}

// CLI interface
const args = process.argv.slice(2);
const buildManager = new BuildManager();

if (args.length === 0) {
    buildManager.build();
} else {
    const command = args[0];
    switch (command) {
        case 'clean':
            buildManager.clean();
            break;
        case 'standalone':
            buildManager.buildStandalone(buildManager.loadConfig());
            break;
        default:
            console.error(`Unknown command: ${command}`);
            process.exit(1);
    }
}
