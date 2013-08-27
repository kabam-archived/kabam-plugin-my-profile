module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // Task configuration.
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: {
        src: ['Gruntfile.js', 'index.js']
      },
      ci: {
        options: {
          force: true,
          reporter: 'checkstyle',
          reporterOutput: 'results/jshint-result.xml'
        },
        src: '<%= jshint.all.src %>'
      }
    },
    clean: {
      docs: [ 'results/docs' ]
    },
    copy: {
      readme: {
        src: 'README.md',
        dest: 'results/index.ngdoc'
      }
    },
    ngdocs: {
      options: {
        dest: 'results/docs',
        title: 'src/<%= pkg.name %>.js',
        startPage: '/api'
      },
      api: {
        src: ['index.js'],
        title: '<%= pkg.name %>'
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-ngdocs');

  // Tasks
  grunt.registerTask('docs', ['clean:docs', 'copy:readme', 'ngdocs']);

  // Default task.
  grunt.registerTask('default', ['jshint', 'docs']);

};

