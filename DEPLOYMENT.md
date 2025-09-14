# Deployment Guide

This guide explains how to deploy the shadcn/ui app using GitHub Actions to GitHub Pages.

## 🚀 Deployment Platform

### GitHub Pages
- **Best for**: Static sites, documentation, portfolio sites
- **Features**: Free hosting, custom domains, HTTPS
- **Setup**: Enable GitHub Pages in repository settings

## 🔧 Required Secrets

No additional secrets are required! GitHub Pages deployment uses the built-in `GITHUB_TOKEN` which is automatically provided by GitHub Actions.

## 📋 Workflow Overview

### Main Deployment (`deploy.yml`)
- **Triggers**: Push to `main` branch
- **Jobs**:
  1. **Test**: Lint, build, and test the application
  2. **Deploy to GitHub Pages**: Production deployment

### Preview Testing (`deploy-preview.yml`)
- **Triggers**: Pull requests to `main`, pushes to `develop`/`staging`
- **Features**: Build testing and PR comments

### Security Checks (`security.yml`)
- **Triggers**: Push to main branches, pull requests, weekly schedule
- **Features**: Security audits, dependency reviews

## 🛠️ Setup Instructions

### GitHub Pages Setup
1. Go to your repository `Settings > Pages`
2. Under "Source", select "GitHub Actions"
3. The workflow will automatically deploy when you push to `main`
4. Your site will be available at `https://yourusername.github.io/repository-name`

## 🔄 Deployment Process

### Automatic Deployments
- **Production**: Push to `main` branch → Deploys to GitHub Pages
- **Testing**: Create pull request to `main` → Runs tests and comments on PR
- **Staging**: Push to `develop` or `staging` branch → Runs tests

### Manual Deployments
You can trigger deployments manually from the Actions tab:
1. Go to `Actions` tab in your repository
2. Select the workflow you want to run
3. Click "Run workflow"

## 📊 Monitoring Deployments

### GitHub Actions
- View deployment status in the `Actions` tab
- Check logs for any errors
- Monitor build times and success rates

### GitHub Pages Dashboard
- **Repository Settings > Pages**: View deployment history and status
- **Actions Tab**: Monitor workflow runs and build logs
- **Security Tab**: Review security alerts and dependency updates

## 🐛 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Review build logs for specific errors

2. **Deployment Failures**
   - Check GitHub Pages settings are configured correctly
   - Ensure repository permissions allow Pages deployment
   - Verify the workflow has the correct permissions

3. **Static Export Issues**
   - Verify Next.js configuration
   - Check for dynamic imports or server-side code
   - Review image optimization settings

### Getting Help
- Check GitHub Actions logs for detailed error messages
- Review [GitHub Pages documentation](https://docs.github.com/en/pages)
- Open an issue in the repository for support

## 🔒 Security Considerations

- Never commit secrets or API keys
- Use GitHub Secrets for sensitive information
- Regularly update dependencies
- Monitor security alerts from GitHub

## 📈 Performance Optimization

- Enable caching in workflows
- Use build artifacts for faster deployments
- Optimize images and assets
- Monitor bundle sizes

## 🌐 Custom Domains

### GitHub Pages
1. Add CNAME file to repository root with your domain name
2. Configure DNS settings to point to GitHub Pages
3. Enable HTTPS in repository settings (automatic)
4. Wait for DNS propagation (up to 24 hours)
