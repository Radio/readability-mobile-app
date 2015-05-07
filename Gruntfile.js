'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    // Project configuration.
    var taskConfig = {
        pkg: grunt.file.readJSON('package.json'),

        wwwDir: 'www',
        srcDir: 'src',
        vendorDir: 'bower_components',
        vendorFiles: [
            'angular/angular.min.js',
            'angular/angular.min.js.map',
            'angular-resource/angular-resource.min.js',
            'angular-resource/angular-resource.min.js.map',
            'angular-route/angular-route.min.js',
            'angular-route/angular-route.min.js.map',
            'angular-websql/angular-websql.min.js',
            'ngstorage/ngStorage.min.js',
            'jquery/dist/jquery.min.js',
            'jquery/dist/jquery.min.map',
            'materialize/dist/js/materialize.min.js',
            'materialize/dist/css/materialize.min.css',
            'materialize/dist/font/**/*',
            'jsSHA/src/sha1.js',
            'readability-js-api-client/readability.js'
        ],

        /**
         * Compile front and admin templates separately.
         */
        html2js: {
            app: {
                options: {
                    base: '<%= srcDir %>',
                    rename: function(moduleName) {
                        return 'js/' + moduleName;
                    }
                },
                src: ['<%= srcDir %>/readability/**/*.tpl.html'],
                dest: '<%= wwwDir %>/js/readability/readability.templates.js',
                module: 'readability-templates'
            }
        },

        less: {
            app: {
                options: {
//                    paths: ["<%= srcDir %>"]
                },
                files: {
                    "<%= wwwDir %>/css/readability.css": "<%= wwwDir %>/less/readability.less"
                }
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
            app: {
                files: [{
                    src: ['readability/**/*.js'],
                    dest: '<%= wwwDir %>/js',
                    cwd: '<%= srcDir %>',
                    expand: true
                }]
            },
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
                    src: ['js/readability/**/*.js'],
                    cwd: '<%= wwwDir %>',
                    dest: '<%= wwwDir %>',
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
                tasks: ['jshint:app', 'copy:app','ngAnnotate:app']
            },

            tpls: {
                files: ['<%= srcDir %>/readability/**/*.tpl.html'],
                tasks: ['html2js']
            },

            less: {
                files: [
                    '<%= wwwDir %>/less/**/*.less',
                    '<%= srcDir %>/readability/**/*.less'
                ],
                tasks: ['less:app']
            },

            vendor: {
                files: ['<%= vendorFiles %>'],
                tasks: ['copy:vendor']
            }
        }
    };

    grunt.initConfig(taskConfig);

    grunt.registerTask('build', [
        'jshint',
        'copy:app',
        'html2js:app',
        'ngAnnotate',
        'less',
        'copy:vendor'
    ]);

    // Default task(s).
    grunt.registerTask('default', ['build']);

};