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
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install dependencies using npm
                sh 'npm install'
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

        stage('Test') {
            steps {
                // Run tests inside the Docker container
                script {
                    def image = docker.image("${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}")
                    image.inside {
                        sh 'npm test'
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                // Use Docker Compose to deploy the application
                script {
                    sh "docker-compose -f ${DOCKER_COMPOSE_FILE} up -d"
                }
            }
        }
    }

    post {
        always {
            // Clean up Docker images and containers if necessary
            script {
                sh 'docker system prune -f'
            }
        }
    }
}
