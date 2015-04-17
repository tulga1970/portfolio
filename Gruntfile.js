module.exports = function(grunt) {
    grunt.initConfig({
        concat: {
            js: {
                src: ['public/app/app.js', 'public/app/**/*.js'],
                dest: 'public/build/js/main.js',
            }
        },
        watch: {
            js: {
                files: ['public/app/**/*.js', 'public/js/**/*.js'],
                tasks: ['concat:js'],
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['concat', 'watch']);
};