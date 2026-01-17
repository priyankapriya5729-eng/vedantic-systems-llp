# Jenkins CI/CD Setup Guide for Firebase Hosting

## Complete Guide: Automate Website Deployment with Jenkins

This guide will help you set up Jenkins to automatically deploy your website (and multiple products) to Firebase Hosting whenever you push code to Git.

---

## Prerequisites

- Jenkins server installed and running
- Git repository (GitHub, GitLab, Bitbucket, etc.)
- Firebase project created
- Node.js installed on Jenkins server

---

## Part 1: Setup Firebase Authentication

### Step 1: Generate Firebase Token

1. **Install Firebase CLI on your local machine:**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase:**
   ```bash
   firebase login:ci
   ```

3. **Copy the token** that appears (you'll need this for Jenkins)

### Step 2: Add Firebase Token to Jenkins

1. Go to Jenkins Dashboard
2. Click **"Manage Jenkins"** → **"Manage Credentials"**
3. Click **"Global"** → **"Add Credentials"**
4. Fill in:
   - **Kind:** Secret text
   - **Secret:** Paste your Firebase token
   - **ID:** `firebase-token`
   - **Description:** Firebase CI Token
5. Click **"OK"**

---

## Part 2: Setup Jenkins Job for Single Project

### Option A: Using Jenkinsfile (Recommended)

1. **Create Jenkinsfile in your repository** (already created: `Jenkinsfile`)

2. **Update the Jenkinsfile:**
   - Edit `FIREBASE_PROJECT_ID` with your Firebase project ID
   - Edit `GIT_REPO` with your Git repository URL

3. **Create Jenkins Pipeline Job:**
   - Go to Jenkins Dashboard
   - Click **"New Item"**
   - Enter name: `company-website-deploy`
   - Select **"Pipeline"**
   - Click **"OK"**

4. **Configure Pipeline:**
   - **Definition:** Pipeline script from SCM
   - **SCM:** Git
   - **Repository URL:** Your Git repository URL
   - **Credentials:** Add if repository is private
   - **Branch:** `*/main` (or your branch name)
   - **Script Path:** `Jenkinsfile`
   - Click **"Save"**

5. **Build Now:**
   - Click **"Build Now"** to test
   - Check console output for deployment status

### Option B: Using Jenkins Web UI

1. **Create New Job:**
   - Go to Jenkins Dashboard
   - Click **"New Item"**
   - Enter name: `company-website-deploy`
   - Select **"Freestyle project"**
   - Click **"OK"**

2. **Configure Source Code Management:**
   - **Source Code Management:** Git
   - **Repository URL:** Your Git repository URL
   - **Credentials:** Add if private
   - **Branch:** `*/main`

3. **Add Build Steps:**
   - Click **"Add build step"** → **"Execute shell"**
   - Add these commands:
   ```bash
   # Install Firebase CLI
   npm install -g firebase-tools
   
   # Deploy to Firebase
   firebase deploy --only hosting \
       --project your-firebase-project-id \
       --token $FIREBASE_TOKEN \
       --non-interactive
   ```

4. **Add Build Environment:**
   - Check **"Use secret text(s) or file(s)"**
   - **Bindings:** Add
     - **Variable:** `FIREBASE_TOKEN`
     - **Credentials:** Select `firebase-token`

5. **Save and Build**

---

## Part 3: Setup for Multiple Products

### Method 1: Separate Jenkins Jobs (Recommended)

Create separate Jenkins jobs for each product:

1. **Job 1:** `company-website-deploy`
   - Git Repo: `https://github.com/your-username/company-website.git`
   - Firebase Project: `company-website-firebase`

2. **Job 2:** `product-2-deploy`
   - Git Repo: `https://github.com/your-username/product-2.git`
   - Firebase Project: `product-2-firebase`

3. **Job 3:** `product-3-deploy`
   - Git Repo: `https://github.com/your-username/product-3.git`
   - Firebase Project: `product-3-firebase`

**Benefits:**
- Independent deployments
- Separate build history
- Easy to manage

### Method 2: Multi-Project Pipeline

Use the `jenkins-multiproject.groovy` file:

1. **Update the configuration:**
   ```groovy
   def projects = [
       [
           name: 'company-website',
           gitRepo: 'https://github.com/your-username/company-website.git',
           firebaseProjectId: 'company-website-firebase',
           branch: 'main'
       ],
       // Add more projects...
   ]
   ```

2. **Create Pipeline Job:**
   - New Item → Pipeline
   - Use the `jenkins-multiproject.groovy` script
   - This will deploy all projects in sequence

---

## Part 4: Automatic Deployment on Git Push

### Setup Webhook (GitHub Example)

1. **In Jenkins:**
   - Install **"GitHub Plugin"** if not installed
   - Go to your job → **"Configure"**
   - **Build Triggers:** Check **"GitHub hook trigger for GITScm polling"**

2. **In GitHub:**
   - Go to your repository
   - **Settings** → **Webhooks** → **Add webhook**
   - **Payload URL:** `http://your-jenkins-server:8080/github-webhook/`
   - **Content type:** `application/json`
   - **Events:** Select **"Just the push event"**
   - Click **"Add webhook"**

3. **Test:**
   - Push a commit to your repository
   - Jenkins should automatically trigger a build

### Setup Webhook (GitLab Example)

1. **In Jenkins:**
   - Install **"GitLab Plugin"**
   - Configure similar to GitHub

2. **In GitLab:**
   - Go to your project → **Settings** → **Webhooks**
   - **URL:** `http://your-jenkins-server:8080/project/your-job-name`
   - **Trigger:** Push events
   - Click **"Add webhook"**

---

## Part 5: Jenkinsfile Configuration

### Update Your Jenkinsfile

Edit the `Jenkinsfile` in your repository:

```groovy
environment {
    // Update these values
    FIREBASE_PROJECT_ID = 'your-actual-firebase-project-id'
    GIT_REPO = 'https://github.com/your-username/company-website.git'
    DEPLOY_BRANCH = 'main'
}
```

### For Multiple Projects

Create separate Jenkinsfiles for each project, or use the multi-project configuration.

---

## Part 6: Required Jenkins Plugins

Install these plugins in Jenkins:

1. **Git Plugin** (usually pre-installed)
2. **Pipeline Plugin**
3. **Credentials Binding Plugin**
4. **GitHub Plugin** (if using GitHub)
5. **GitLab Plugin** (if using GitLab)

**To install:**
- **Manage Jenkins** → **Manage Plugins** → **Available**
- Search and install plugins
- Restart Jenkins if required

---

## Part 7: Environment Variables (Optional)

For better security, use environment variables:

1. **In Jenkins:**
   - **Manage Jenkins** → **Configure System**
   - **Global properties** → **Environment variables**
   - Add:
     - `FIREBASE_PROJECT_ID` = `your-project-id`
     - `FIREBASE_TOKEN` = (use credentials instead)

2. **Update Jenkinsfile:**
   ```groovy
   environment {
       FIREBASE_PROJECT_ID = "${env.FIREBASE_PROJECT_ID}"
   }
   ```

---

## Part 8: Deployment Workflow

### Typical Workflow:

```
Developer pushes code to Git
    ↓
Git webhook triggers Jenkins
    ↓
Jenkins checks out code
    ↓
Jenkins installs Firebase CLI
    ↓
Jenkins deploys to Firebase
    ↓
Website is live!
```

---

## Troubleshooting

### Firebase Token Expired
- Regenerate: `firebase login:ci`
- Update credentials in Jenkins

### Build Fails
- Check Jenkins console output
- Verify Firebase project ID is correct
- Ensure Firebase token has proper permissions

### Webhook Not Working
- Check Jenkins URL is accessible
- Verify webhook URL is correct
- Check Jenkins logs: **Manage Jenkins** → **System Log**

### Permission Denied
- Ensure Firebase token has deployment permissions
- Check Firebase project settings

---

## Advanced: Multi-Branch Pipeline

For deploying different branches:

1. **Create Multi-branch Pipeline:**
   - New Item → **Multibranch Pipeline**
   - **Branch Sources:** Add Git source
   - **Build Configuration:** Jenkinsfile

2. **This will:**
   - Automatically detect branches
   - Create jobs for each branch
   - Deploy based on branch

---

## Security Best Practices

1. **Never commit Firebase tokens** to Git
2. **Use Jenkins credentials** for sensitive data
3. **Restrict Jenkins access** to authorized users
4. **Use HTTPS** for Jenkins server
5. **Rotate Firebase tokens** regularly

---

## Example: Complete Jenkinsfile for Your Project

```groovy
pipeline {
    agent any
    
    environment {
        FIREBASE_PROJECT_ID = 'vedantic-systems-website'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Deploy') {
            steps {
                sh 'npm install -g firebase-tools'
                withCredentials([string(credentialsId: 'firebase-token', variable: 'FIREBASE_TOKEN')]) {
                    sh """
                        firebase deploy --only hosting \
                            --project ${env.FIREBASE_PROJECT_ID} \
                            --token ${FIREBASE_TOKEN} \
                            --non-interactive
                    """
                }
            }
        }
    }
    
    post {
        success {
            echo '✅ Website deployed successfully!'
        }
    }
}
```

---

## Summary Checklist

- [ ] Firebase token generated and added to Jenkins credentials
- [ ] Jenkinsfile created in repository
- [ ] Jenkins job created and configured
- [ ] Git webhook configured (optional)
- [ ] Test deployment successful
- [ ] Automatic deployment working

---

## Need Help?

- **Jenkins Documentation:** https://www.jenkins.io/doc/
- **Firebase CLI Docs:** https://firebase.google.com/docs/cli
- **Jenkins Pipeline Syntax:** https://www.jenkins.io/doc/book/pipeline/syntax/

---

**Your automated deployment pipeline is ready! 🚀**
