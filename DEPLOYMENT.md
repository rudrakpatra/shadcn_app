# Deployment Guide

This guide explains how to deploy the shadcn/ui app using GitHub Actions to multiple platforms.

## 🚀 Supported Deployment Platforms

### 1. Vercel (Recommended)
- **Best for**: Next.js applications, serverless functions
- **Features**: Automatic deployments, preview deployments, edge functions
- **Setup**: Connect your GitHub repository to Vercel

### 2. Netlify
- **Best for**: Static sites, JAMstack applications
- **Features**: Form handling, serverless functions, branch previews
- **Setup**: Connect your GitHub repository to Netlify

### 3. GitHub Pages
- **Best for**: Static sites, documentation
- **Features**: Free hosting, custom domains
- **Setup**: Enable GitHub Pages in repository settings

## 🔧 Required Secrets

Add these secrets to your GitHub repository (`Settings > Secrets and variables > Actions`):

### Vercel Deployment
```
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id
```

### Netlify Deployment
```
NETLIFY_AUTH_TOKEN=your_netlify_token
NETLIFY_SITE_ID=your_site_id
```

## 📋 Workflow Overview

### Main Deployment (`deploy.yml`)
- **Triggers**: Push to `main` branch
- **Jobs**:
  1. **Test**: Lint, build, and test the application
  2. **Deploy to Vercel**: Production deployment
  3. **Deploy to Netlify**: Production deployment
  4. **Deploy to GitHub Pages**: Production deployment

### Preview Deployment (`deploy-preview.yml`)
- **Triggers**: Pull requests to `main`, pushes to `develop`/`staging`
- **Features**: Preview deployments for testing

### Security Checks (`security.yml`)
- **Triggers**: Push to main branches, pull requests, weekly schedule
- **Features**: Security audits, dependency reviews

## 🛠️ Setup Instructions

### 1. Vercel Setup
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Import your GitHub repository
3. Get your tokens from Vercel settings
4. Add secrets to GitHub repository

### 2. Netlify Setup
1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Connect your GitHub repository
3. Get your site ID and auth token
4. Add secrets to GitHub repository

### 3. GitHub Pages Setup
1. Go to repository `Settings > Pages`
2. Select source: "GitHub Actions"
3. The workflow will automatically deploy

## 🔄 Deployment Process

### Automatic Deployments
- **Production**: Push to `main` branch
- **Preview**: Create pull request to `main`
- **Staging**: Push to `develop` or `staging` branch

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

### Platform Dashboards
- **Vercel**: Monitor deployments, performance, and analytics
- **Netlify**: Track builds, form submissions, and functions
- **GitHub Pages**: View deployment history and status

## 🐛 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Review build logs for specific errors

2. **Deployment Failures**
   - Verify all required secrets are set
   - Check platform-specific configuration
   - Ensure repository permissions are correct

3. **Static Export Issues**
   - Verify Next.js configuration
   - Check for dynamic imports or server-side code
   - Review image optimization settings

### Getting Help
- Check GitHub Actions logs for detailed error messages
- Review platform-specific documentation
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

### Vercel
1. Add domain in Vercel dashboard
2. Configure DNS settings
3. Enable SSL certificate

### Netlify
1. Add custom domain in Netlify dashboard
2. Configure DNS settings
3. Enable HTTPS

### GitHub Pages
1. Add CNAME file to repository
2. Configure DNS settings
3. Enable HTTPS in repository settings
