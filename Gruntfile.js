module.exports = function(grunt) {


    grunt.initConfig({
        clean: ['build', 'public/weekmeals.js'],
        bower: {
            install: {
                options: {
                    targetDir: './build/lib'
                }
            }
        },
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
                        jquery: 'build/lib/jquery/jquery',
                        underscore: 'build/lib/underscore/underscore',
                        backbone: 'build/lib/backbone/backbone',
                    },
                    shim: {
                        jquery: {exports: '$'},
                        underscore: {exports: '_'},
                        backbone: {exports: 'Backbone', deps: ['jquery', 'underscore']}
                    },
                    optimize: 'none',
                    name: './build/amd/index.js',
                    out: 'public/weekmeals.js',
                    deps: ['build/lib/requirejs/require']
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
