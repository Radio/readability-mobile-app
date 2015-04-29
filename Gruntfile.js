'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    // Project configuration.
    var taskConfig = {
        pkg: grunt.file.readJSON('package.json'),

        wwwDir: 'www',
        srcDir: '<%= wwwDir %>/js',
        vendorDir: 'bower_components',
        vendorFiles: [
            'angular/angular.min.js',
            'angular/angular.min.js.map',
            'angular-resource/angular-resource.min.js',
            'angular-resource/angular-resource.min.js.map',
            'angular-route/angular-route.min.js',
            'angular-route/angular-route.min.js.map',
            'jquery/dist/jquery.min.js',
            'jquery/dist/jquery.min.map',
            'materialize/dist/js/materialize.min.js',
            'materialize/dist/css/materialize.min.css',
            'materialize/dist/font/**/*'
        ],

        /**
         * Compile front and admin templates separately.
         */
        html2js: {
            app: {
                options: {
                    base: '<%= wwwDir %>/'
                },
                src: ['<%= srcDir %>/readability/**/*.tpl.html'],
                dest: '<%= srcDir %>/readability/readability.templates.js',
                module: 'readability-templates'
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                force: true, // Don't fail the task, just warn
                ignores: []
            },
            app: {
                files: {
                    src: ['<%= srcDir %>/readability/**/*.js']
                }
            },
            gruntfile: {
                files: {
                    src: ['Gruntfile.js']
                }
            }
        },

        copy: {
            vendor: {
                files: [{
                    src: ['<%= vendorFiles %>'],
                    dest: '<%= wwwDir %>/vendor',
                    cwd: '<%= vendorDir %>',
                    expand: true
                }]
            }
        },

        ngAnnotate: {
            app: {
                files: [{
                    src: ['readability/**/*.js'],
                    cwd: '<%= srcDir %>',
                    dest: '<%= srcDir %>',
                    expand: true
                }]
            }
        },

        watch: {
            gruntfile: {
                files: ['Gruntfile.js'],
                tasks: ['jshint:gruntfile']
            },

            app: {
                files: ['<%= srcDir %>/readability/**/*.js'],
                tasks: ['jshint:app'/*, 'ngAnnotate:app'*/]
            },

            tpls: {
                files: ['<%= srcDir %>/readability/**/*.tpl.html'],
                tasks: ['html2js']
            },

            vendor: {
                files: ['<%= vendorFiles %>'],
                tasks: ['copy:vendor']
            }
        }
    };

    grunt.initConfig(taskConfig);

    grunt.registerTask('build', [
        'html2js:app',
        'ngAnnotate',
        'jshint',
        'copy:vendor'
    ]);

    // Default task(s).
    grunt.registerTask('default', ['build']);

};