# GitHub Actions Workflows

This repository includes comprehensive GitHub Actions workflows for CI/CD, security, and automated dependency management.

## 🚀 Workflows Overview

### 1. Main Deployment (`deploy.yml`)
**Triggers**: Push to `main` branch
- **Test Job**: Runs linting and builds the application
- **GitHub Pages Deployment**: Deploys to GitHub Pages

### 2. Preview Testing (`deploy-preview.yml`)
**Triggers**: Pull requests to `main`, pushes to `develop`/`staging`
- **Build Testing**: Tests builds on pull requests
- **PR Comments**: Automatically comments on successful builds

### 3. Security & Quality (`security.yml`)
**Triggers**: Push to main branches, pull requests, weekly schedule
- **Security Audit**: Runs `npm audit` for vulnerability checks
- **Dependency Review**: Reviews new dependencies in PRs
- **Outdated Packages**: Checks for outdated dependencies

### 4. Dependabot Auto-merge (`dependabot.yml`)
**Triggers**: Dependabot pull requests
- **Automated Testing**: Runs tests on dependency updates
- **Auto-merge**: Automatically merges minor/patch updates
- **Squash Merge**: Uses squash merge for clean history

## 🔧 Configuration Files

### Dependabot (`dependabot.yml`)
- Weekly updates for npm packages and GitHub Actions
- Auto-assignment to maintainers
- Smart ignore rules for major version updates
- Proper labeling and commit message formatting

### Environment Variables
No additional secrets required! GitHub Pages deployment uses the built-in `GITHUB_TOKEN` which is automatically provided by GitHub Actions.

## 📋 Setup Instructions

1. **Enable GitHub Pages**: Go to Settings > Pages > Source: "GitHub Actions"
2. **Configure Branches**: Set up `main`, `develop`, and `staging` branches
3. **Push to Main**: The workflow will automatically deploy your site

## 🛠️ Local Testing

Use the provided test script to verify builds locally:
```bash
npm run test:build
```

This script mimics the GitHub Actions build process:
1. Installs dependencies with `--legacy-peer-deps`
2. Runs ESLint
3. Builds the application
4. Verifies build output

## 📊 Monitoring

- **Actions Tab**: View workflow runs and logs
- **Pages Tab**: Monitor GitHub Pages deployments
- **Security Tab**: Review security alerts and dependency updates
- **Dependabot**: Track automated dependency updates

## 🔒 Security Features

- Automated security audits
- Dependency vulnerability scanning
- License compliance checking
- Secure secret management
- Branch protection rules support

## 🚀 Deployment Platform

### GitHub Pages
- **Best for**: Static sites, documentation, portfolio sites
- **Features**: Free hosting, custom domains, HTTPS
- **Setup**: Enable in repository settings
- **URL**: `https://yourusername.github.io/repository-name`

## 📈 Performance Optimizations

- **Caching**: npm cache in workflows
- **Parallel Jobs**: Test and deploy simultaneously
- **Build Artifacts**: Reuse build outputs across jobs
- **Conditional Deployments**: Only deploy on successful tests

## 🐛 Troubleshooting

### Common Issues
1. **Build Failures**: Check Node.js version compatibility
2. **Deployment Errors**: Verify platform secrets and permissions
3. **Linting Errors**: Run `npm run lint` locally first
4. **Dependency Conflicts**: Use `--legacy-peer-deps` flag

### Getting Help
- Check workflow logs in Actions tab
- Review platform-specific documentation
- Open an issue for workflow-related problems

## 🔄 Workflow Customization

All workflows are designed to be easily customizable:
- Modify triggers in workflow files
- Add/remove deployment platforms
- Adjust security policies
- Configure notification settings

## 📝 Best Practices

- Always test changes locally first
- Use semantic versioning for releases
- Keep dependencies up to date
- Monitor security alerts regularly
- Use feature branches for development
- Review PRs before merging to main
