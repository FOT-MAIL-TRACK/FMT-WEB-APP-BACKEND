pipeline {
    agent any

    environment {
        DOCKER_IMAGE_NAME = 'fmt-web-app-backend'
        DOCKER_IMAGE_TAG = 'latest'
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
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
                // Install dependencies using npm (Assuming Node.js is installed)
                bat 'npm install'
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
        stage('Inspect Image') {
            steps {
                sh 'docker inspect fmt-web-app-backend:latest'
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

        stage('Deploy') {
            steps {
                // Use Docker Compose to deploy the application
                script {
                    // On Windows, Docker Compose does not use nohup, so this should work without issues
                    bat "docker-compose -f ${DOCKER_COMPOSE_FILE} up -d"
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
