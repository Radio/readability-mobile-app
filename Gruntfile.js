'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    // Project configuration.
    var taskConfig = {
        pkg: grunt.file.readJSON('package.json'),

        srcDir: 'www/js',

        /**
         * Compile front and admin templates separately.
         */
        html2js: {
            readability: {
                options: {
                    base: 'www/'
                },
                src: ['<%= srcDir %>/readability/**/*.tpl.html'],
                dest: '<%= srcDir %>/readability/readability.templates.js',
                module: 'readability-templates'
            }
        }
    };

    grunt.initConfig(taskConfig);


    grunt.registerTask('build', [
//        'clean:build',
//        'html2js',
//        'jshint',
//        'copy:js',
//        'copy:vendor',
//        'ngAnnotate',
//        // assets
//        'less',
//        'copy:img',
//        'copy:web',
//        'symlink:backend'
    ]);

    // Default task(s).
    grunt.registerTask('default', ['build']);

};