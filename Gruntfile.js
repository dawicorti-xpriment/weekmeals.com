module.exports = function(grunt) {


    grunt.initConfig({
        clean: ['build', 'public/weekmeals.js'],
        bower: {install: {}},
        amdwrap: {
            usingDynamicExpansion: {
                expand: true,
                cwd: 'lib/client',
                src: ['*.js', '**/*.js'],
                dest: 'build/amd'
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: './',
                    paths: {
                        jquery: 'bower_components/jquery/jquery',
                        underscore: 'bower_components/underscore/underscore',
                        backbone: 'bower_components/backbone/backbone',
                    },
                    shim: {
                        jquery: {exports: '$'},
                        underscore: {exports: '_'},
                        backbone: {exports: 'Backbone', deps: ['jquery', 'underscore']}
                    },
                    optimize: 'none',
                    name: './build/amd/index.js',
                    out: 'public/weekmeals.js',
                    deps: ['bower_components/requirejs/require']
                }
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-amd-wrap');
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    grunt.registerTask('default', ['bower', 'amdwrap', 'requirejs']);
};