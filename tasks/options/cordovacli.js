module.exports = {
    options: {
        path: '.'
    },
    
    add_platforms: {
        options: {
            command: 'platform',
            action: 'add',
            platforms: ['ios']
        }
    },
    
    add_plugins: {
        options: {
            command: 'plugin',
            action: 'add',
            plugins: ['https://github.com/Wikitude/wikitude-phonegap']
        }
    },
    
    build: {
        options: {
            command: 'build',
            platforms: ['ios']
        }
    }
};