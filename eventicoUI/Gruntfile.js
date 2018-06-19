module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      css: {
        files: [
          'src/app/**/*.css'
        ],
        options: {
          debounceDelay: 10000,
        },
        tasks: ['exec', 'clean', 'copy']
      },
      ts: {
        files: [
          'src/app/**/*.ts'
        ],
        options: {
          debounceDelay: 10000,
        },
        tasks: ['exec', 'clean', 'copy']
      },
      templates: {
        files: [
          'src/app/**/*.html'
        ],
        options: {
          debounceDelay: 10000,
        },
        tasks: ['exec', 'clean', 'copy']
      }
    },
    clean: {
      build: ['../eventico/static/js/*', '../eventico/static/css/*'],
      release: ['../eventico/static/js/*', '../eventico/static/js/*'],
      options: {
        'force': true
      }
    },
    copy: {
      main: {
        files: [

          {expand: true, src: ['dist/*js'], dest: '../eventico/static/js/', filter: 'isFile', flatten: true},
          {expand: true, src: ['dist/*js'], dest: '../static/js/', filter: 'isFile', flatten: true},
          {expand: true, src: ['dist/*css'], dest: '../eventico/static/css/', filter: 'isFile', flatten: true},
          {expand: true, src: ['dist/*css'], dest: '../static/css/', filter: 'isFile', flatten: true},
          {expand: true, src: ['dist/*ico'], dest: '../eventico/static/', filter: 'isFile', flatten: true},
          {expand: true, src: ['dist/*ico'], dest: '../static/', filter: 'isFile', flatten: true},
        ],
      },
    },
    exec: {
      //build: 'ng build',
      build: 'ng build --prod --configuration=production'
    },
  });

  // Load the Grunt plugins.
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  // Register the default tasks.
  grunt.registerTask('default', ['watch']);
};
