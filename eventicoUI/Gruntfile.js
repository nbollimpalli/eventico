module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      css: {
        files: [
          '**/*.sass',
          '**/*.scss'
        ],
        tasks: ['compass', 'copy']
      },
      js: {
        files: [
          'assets/js/*.js',
          'Gruntfile.js'
        ],
        tasks: ['jshint', 'copy']
      }
    },
    compass: {
      dist: {
        options: {
          sassDir: 'assets/sass',
          cssDir: 'assets/css',
          outputStyle: 'compressed'
        }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['Gruntfile.js', 'assets/js/*.js']
    },
    copy: {
      main: {
        files: [
          {expand: true, src: ['dist/*js'], dest: '../eventico/static/', filter: 'isFile', flatten: true},
          {expand: true, src: ['dist/*map'], dest: '../eventico/static/', filter: 'isFile', flatten: true},
          {expand: true, src: ['dist/*js'], dest: '../static/', filter: 'isFile', flatten: true},
          {expand: true, src: ['dist/*map'], dest: '../static/', filter: 'isFile', flatten: true},
        ],
      },
    }
  });

  // Load the Grunt plugins.
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  // Register the default tasks.
  grunt.registerTask('default', ['watch']);
};
