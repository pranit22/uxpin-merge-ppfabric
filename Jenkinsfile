
pipeline {
    agent {
        label 'mesos'
    }
    tools {
      nodejs '11'
    }
    stages {
        stage('Init') {
          steps {
            sh '''
            node -v
            npm -v
            npm set registry https://npm.paypal.com
            '''
          }
        }
        stage('Install') {
          steps {
            sh '''
            npm install
            '''
            stash name: 'workspace', useDefaultExcludes: false
          }
        }
        stage('Test') {
            steps {
                sh '''
                npm test
                '''
            }
        }
    }
}
