// Multi-Project Jenkins Pipeline Configuration
// Use this for managing multiple products/websites

// Configuration for multiple projects
def projects = [
    [
        name: 'company-website',
        gitRepo: 'https://github.com/your-username/company-website.git',
        firebaseProjectId: 'company-website-firebase',
        branch: 'main'
    ],
    [
        name: 'product-2',
        gitRepo: 'https://github.com/your-username/product-2.git',
        firebaseProjectId: 'product-2-firebase',
        branch: 'main'
    ],
    [
        name: 'product-3',
        gitRepo: 'https://github.com/your-username/product-3.git',
        firebaseProjectId: 'product-3-firebase',
        branch: 'main'
    ]
    // Add more projects as needed
]

// Pipeline function for each project
def deployProject(project) {
    return {
        stage("Deploy ${project.name}") {
            steps {
                script {
                    echo "Deploying ${project.name}..."
                    
                    // Checkout specific project
                    checkout([
                        $class: 'GitSCM',
                        branches: [[name: "*/${project.branch}"]],
                        userRemoteConfigs: [[url: project.gitRepo]]
                    ])
                    
                    // Install Firebase CLI
                    sh 'npm install -g firebase-tools'
                    
                    // Deploy to Firebase
                    withCredentials([string(credentialsId: 'firebase-token', variable: 'FIREBASE_TOKEN')]) {
                        sh """
                            firebase deploy --only hosting \
                                --project ${project.firebaseProjectId} \
                                --token ${FIREBASE_TOKEN} \
                                --non-interactive
                        """
                    }
                    
                    echo "✅ ${project.name} deployed successfully!"
                }
            }
        }
    }
}

// Main pipeline
pipeline {
    agent any
    
    stages {
        stage('Deploy All Projects') {
            steps {
                script {
                    projects.each { project ->
                        stage("Deploy ${project.name}") {
                            checkout([
                                $class: 'GitSCM',
                                branches: [[name: "*/${project.branch}"]],
                                userRemoteConfigs: [[url: project.gitRepo]]
                            ])
                            
                            sh 'npm install -g firebase-tools'
                            
                            withCredentials([string(credentialsId: 'firebase-token', variable: 'FIREBASE_TOKEN')]) {
                                sh """
                                    firebase deploy --only hosting \
                                        --project ${project.firebaseProjectId} \
                                        --token ${FIREBASE_TOKEN} \
                                        --non-interactive
                                """
                            }
                        }
                    }
                }
            }
        }
    }
    
    post {
        success {
            echo '✅ All projects deployed successfully!'
        }
        failure {
            echo '❌ Deployment failed!'
        }
    }
}
