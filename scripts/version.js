#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class VersionManager {
    constructor() {
        this.configPath = path.join(__dirname, '../config.json');
        this.versionPath = path.join(__dirname, '../VERSION');
        this.changelogPath = path.join(__dirname, '../CHANGELOG.md');
    }

    loadConfig() {
        const configData = fs.readFileSync(this.configPath, 'utf8');
        return JSON.parse(configData);
    }

    getCurrentVersion() {
        const config = this.loadConfig();
        return config.app.version;
    }

    bumpVersion(type = 'patch') {
        const config = this.loadConfig();
        const currentVersion = config.app.version;
        const [major, minor, patch] = currentVersion.split('.').map(Number);
        
        let newVersion;
        switch (type) {
            case 'major':
                newVersion = `${major + 1}.0.0`;
                break;
            case 'minor':
                newVersion = `${major}.${minor + 1}.0`;
                break;
            case 'patch':
                newVersion = `${major}.${minor}.${patch + 1}`;
                break;
            default:
                throw new Error('Invalid version type. Use major, minor, or patch.');
        }
        
        // Update config
        config.app.version = newVersion;
        fs.writeFileSync(this.configPath, JSON.stringify(config, null, 2));
        
        // Update VERSION file
        const today = new Date().toISOString().split('T')[0];
        const versionContent = `v${newVersion}\n${today} - Versiune actualizată\n- Automat prin script de versionare\n- Management configurație implementat`;
        fs.writeFileSync(this.versionPath, versionContent);
        
        // Update changelog
        this.updateChangelog(newVersion, today);
        
        console.log(`✅ Version bumped to v${newVersion}`);
        return newVersion;
    }

    updateChangelog(version, date) {
        const changelog = fs.existsSync(this.changelogPath) 
            ? fs.readFileSync(this.changelogPath, 'utf8')
            : '# Changelog Speedy-MATE5\n\n';
        
        const newEntry = `## [${version}] - ${date}\n\n### Changed\n- Version bump via automated script\n- Configuration management updated\n\n---\n\n`;
        
        const updatedChangelog = newEntry + changelog;
        fs.writeFileSync(this.changelogPath, updatedChangelog);
    }

    createRelease() {
        const version = this.getCurrentVersion();
        console.log(`🚀 Creating release v${version}`);
        
        // Build standalone version
        this.buildStandalone();
        
        // Create release notes
        this.createReleaseNotes(version);
        
        console.log(`✅ Release v${version} created successfully`);
    }

    buildStandalone() {
        const config = this.loadConfig();
        const inputPath = path.join(__dirname, '../', config.build.input);
        const outputPath = path.join(__dirname, '../', config.build.output, config.build.standalone);
        
        // Ensure output directory exists
        const outputDir = path.dirname(outputPath);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        
        console.log(`📦 Building standalone version...`);
        console.log(`Input: ${inputPath}`);
        console.log(`Output: ${outputPath}`);
        
        // Copy working version as standalone
        const workingPath = path.join(__dirname, '../speedy_mate5_working.html');
        if (fs.existsSync(workingPath)) {
            fs.copyFileSync(workingPath, outputPath);
            console.log(`✅ Standalone built successfully`);
        } else {
            console.error(`❌ Working version not found at ${workingPath}`);
        }
    }

    createReleaseNotes(version) {
        const notes = `# Speedy-MATE5 v${version}\n\n## Features\n- 3 nivele de dificultate\n- Design modern responsive\n- Probleme ONM reale\n- Timer și scor\n- Export date\n\n## Installation\n1. Download \`speedy_mate5_standalone.html\`\n2. Open in browser\n\n## Links\n- GitHub: https://github.com/Laurst2710/SpeedyMate5\n- Live: https://laurst2710.github.io/SpeedyMate5/\n`;
        
        const notesPath = path.join(__dirname, '../RELEASE_NOTES.md');
        fs.writeFileSync(notesPath, notes);
        console.log(`📝 Release notes created at ${notesPath}`);
    }
}

// CLI interface
const args = process.argv.slice(2);
const versionManager = new VersionManager();

if (args.length === 0) {
    console.log('Speedy-MATE5 Version Manager');
    console.log('Usage:');
    console.log('  npm run version bump <type>  - Bump version (major/minor/patch)');
    console.log('  npm run version release     - Create release');
    console.log('  npm run version current     - Show current version');
    process.exit(0);
}

const command = args[0];

switch (command) {
    case 'bump':
        const type = args[1] || 'patch';
        versionManager.bumpVersion(type);
        break;
    case 'release':
        versionManager.createRelease();
        break;
    case 'current':
        console.log(`Current version: ${versionManager.getCurrentVersion()}`);
        break;
    default:
        console.error(`Unknown command: ${command}`);
        process.exit(1);
}
