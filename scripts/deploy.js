#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class DeployManager {
    constructor() {
        this.configPath = path.join(__dirname, '../config.json');
        this.rootPath = path.join(__dirname, '../');
    }

    loadConfig() {
        const configData = fs.readFileSync(this.configPath, 'utf8');
        return JSON.parse(configData);
    }

    async deploy() {
        const config = this.loadConfig();
        console.log('🚀 Deploying Speedy-MATE5...');
        
        // Build first
        await this.build();
        
        // Deploy to GitHub Pages
        await this.deployToGitHub(config);
        
        // Generate deployment info
        await this.generateDeployInfo(config);
        
        console.log('✅ Deployment completed');
    }

    async build() {
        console.log('🔨 Building before deployment...');
        const { spawn } = require('child_process');
        
        return new Promise((resolve, reject) => {
            const build = spawn('npm', ['run', 'build'], {
                cwd: this.rootPath,
                stdio: 'inherit'
            });
            
            build.on('close', (code) => {
                if (code === 0) {
                    resolve();
                } else {
                    reject(new Error(`Build failed with code ${code}`));
                }
            });
        });
    }

    async deployToGitHub(config) {
        console.log('📤 Deploying to GitHub Pages...');
        
        const distPath = path.join(this.rootPath, config.build.output);
        const githubPath = path.join(this.rootPath, 'docs');
        
        // Copy dist to docs for GitHub Pages
        if (fs.existsSync(githubPath)) {
            fs.rmSync(githubPath, { recursive: true, force: true });
        }
        
        if (fs.existsSync(distPath)) {
            fs.cpSync(distPath, githubPath, { recursive: true });
            console.log('📁 Files copied to docs/ directory');
            
            // Create index.html from standalone
            const standalonePath = path.join(distPath, config.build.standalone);
            const indexPath = path.join(githubPath, 'index.html');
            
            if (fs.existsSync(standalonePath)) {
                fs.copyFileSync(standalonePath, indexPath);
                console.log('📄 index.html created for GitHub Pages');
            }
        } else {
            console.error('❌ Build directory not found');
        }
    }

    async generateDeployInfo(config) {
        const deployInfo = {
            version: config.app.version,
            deployDate: new Date().toISOString(),
            environment: 'production',
            url: 'https://laurst2710.github.io/SpeedyMate5/',
            config: config
        };
        
        const deployInfoPath = path.join(this.rootPath, 'deploy-info.json');
        fs.writeFileSync(deployInfoPath, JSON.stringify(deployInfo, null, 2));
        
        console.log('📋 Deployment info generated');
    }

    async deployToNetlify() {
        console.log('📤 Preparing for Netlify deployment...');
        
        const config = this.loadConfig();
        const distPath = path.join(this.rootPath, config.build.output);
        
        // Create netlify.toml
        const netlifyConfig = `
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
        `;
        
        fs.writeFileSync(path.join(this.rootPath, 'netlify.toml'), netlifyConfig.trim());
        console.log('📄 netlify.toml created');
        
        console.log('🌐 Ready for Netlify deployment');
        console.log(`📁 Upload contents of ${distPath} to Netlify`);
    }

    createGitCommands() {
        const config = this.loadConfig();
        const version = config.app.version;
        
        const commands = `
# Git Commands for Deployment

## 1. Commit and Push
git add .
git commit -m "Release v${version}"
git push origin main

## 2. Enable GitHub Pages
# Go to repository Settings > Pages
# Source: Deploy from a branch
# Branch: main
# Folder: /docs

## 3. Deploy URL
# https://laurst2710.github.io/SpeedyMate5/

## 4. Netlify Alternative
# Upload dist/ folder to Netlify
# Or connect repository to Netlify
        `;
        
        const commandsPath = path.join(this.rootPath, 'DEPLOY_COMMANDS.md');
        fs.writeFileSync(commandsPath, commands.trim());
        console.log(`📝 Git commands saved to ${commandsPath}`);
    }
}

// CLI interface
const args = process.argv.slice(2);
const deployManager = new DeployManager();

if (args.length === 0) {
    deployManager.deploy();
} else {
    const command = args[0];
    switch (command) {
        case 'github':
            deployManager.deployToGitHub(deployManager.loadConfig());
            break;
        case 'netlify':
            deployManager.deployToNetlify();
            break;
        case 'commands':
            deployManager.createGitCommands();
            break;
        default:
            console.error(`Unknown command: ${command}`);
            process.exit(1);
    }
}
