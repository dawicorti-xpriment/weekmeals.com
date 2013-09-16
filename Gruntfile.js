module.exports = function(grunt) {


    grunt.initConfig({
        amdwrap: {
            usingDynamicExpansion: {
                expand: true,
                cwd: "lib/client",
                src: ["*.js", "**/*.js"],
                dest: "build/amd"
            }
        }
    });

    grunt.loadNpmTasks("grunt-amd-wrap");

    grunt.registerTask('default', ['amdwrap']);
};