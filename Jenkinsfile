pipeline {
    agent any
    
    environment {
        // Firebase project ID - Update this for your project
        FIREBASE_PROJECT_ID = 'your-firebase-project-id'
        // Git repository URL
        GIT_REPO = 'https://github.com/your-username/company-website.git'
        // Branch to deploy
        DEPLOY_BRANCH = 'main'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from Git repository...'
                checkout scm
                // Or use: git branch: "${DEPLOY_BRANCH}", url: "${GIT_REPO}"
            }
        }
        
        stage('Install Firebase CLI') {
            steps {
                echo 'Installing Firebase CLI...'
                sh '''
                    npm install -g firebase-tools
                    firebase --version
                '''
            }
        }
        
        stage('Deploy to Firebase') {
            steps {
                echo 'Deploying to Firebase Hosting...'
                withCredentials([string(credentialsId: 'firebase-token', variable: 'FIREBASE_TOKEN')]) {
                    sh '''
                        firebase use ${FIREBASE_PROJECT_ID} --token ${FIREBASE_TOKEN}
                        firebase deploy --only hosting --project ${FIREBASE_PROJECT_ID} --token ${FIREBASE_TOKEN} --non-interactive
                    '''
                }
            }
        }
        
        stage('Verify Deployment') {
            steps {
                echo 'Verifying deployment...'
                sh '''
                    echo "Deployment completed successfully!"
                    echo "Website URL: https://${FIREBASE_PROJECT_ID}.web.app"
                '''
            }
        }
    }
    
    post {
        success {
            echo '✅ Deployment successful!'
            // Optional: Send notification (email, Slack, etc.)
        }
        failure {
            echo '❌ Deployment failed!'
            // Optional: Send failure notification
        }
        always {
            echo 'Cleaning up...'
            cleanWs()
        }
    }
}
