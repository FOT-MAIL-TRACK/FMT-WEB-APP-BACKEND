pipeline {
    agent any

    environment {
        DOCKER_IMAGE_NAME = 'fmt-web-app-backend'
        DOCKER_IMAGE_TAG = 'latest'
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
       // PROJECT_DIR = 'C:\\path\\to\\your\\project' Update this path to your local project directory
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from the GitHub repository
                git branch: 'main', url: 'https://github.com/FOT-MAIL-TRACK/FMT-WEB-APP-BACKEND.git'
                // If using credentials for a private repository, uncomment the following line and provide the credentials ID:
                // git credentialsId: 'your-credentials-id', branch: 'main', url: 'https://github.com/FOT-MAIL-TRACK/FMT-WEB-APP-BACKEND.git'
            }
        }

        stage('Install Dependencies') {
            steps { 
                 dir('backend') {  // Navigate to the 'backend' directory where package.json is located
                    // Install dependencies using npm (Assuming Node.js is installed)
                    bat 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                // Build the Docker image
                script {
                    docker.build("${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}")
                }
            }
        }

        stage('Inspect') {
            steps {
                // Inspect the Docker image
                script {
                    bat 'docker inspect -f "{{ . }}" "fmt-web-app-backend:latest"'
                }
            }
        }

        stage('Test') {
            steps {
                // Run tests inside the Docker container
                script {
                    def image = docker.image("${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}")
                    image.inside {
                        bat 'npm test'
                    }
                }
            }
        }
    }

    post {
        always {
            // Clean up Docker images and containers if necessary
            script {
                bat 'docker system prune -f'
            }
        }
    }
}

