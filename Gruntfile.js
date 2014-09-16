module.exports = function(grunt) {
	
	var path = require('path');
	
	var config = require('load-grunt-config')(grunt, {
		configPath: path.join(__dirname, 'tasks/options'),
		init: false
	});
	
	grunt.loadTasks('tasks');
	grunt.initConfig(config);
	
}