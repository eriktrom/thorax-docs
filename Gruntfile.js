/*global module:false*/
module.exports = function(grunt) {
  grunt.option('stack', true);

  // Project configuration.
  grunt.initConfig({
    copy: {
      images: {
        src: ["**"],
        dest: "./public/img/",
        cwd: "./src/img/",
        expand: true
      },

      fonts: {
        src: ["**"],
        dest: "./public/fonts/",
        cwd: "./src/fonts/",
        expand: true
      },

      js: {
        src: ["**"],
        dest: "./public/js/",
        cwd: "./src/js/",
        expand: true
      }
    },

    meta: {
      version: '0.1.0',
      banner: '/*! Thorax - v<%= meta.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
        'Thorax; Licensed MIT */'
    },

    static: {
      docs: {
        require: 'helpers.js',
        build: (function() {
          var staticBuild = {
            'public/index.html': 'src/index.hbs.html',
            'public/api.html': [
              'src/includes/api-header.hbs.html',
              'src/content/api.md',
              'src/includes/api-footer.html'
            ],
            'public/error-codes.html': [
              {
                file: 'src/includes/start-header.hbs.html',
                context: {
                  title: "Thorax Error Codes"
                }
              },
              'src/content/errors.md',
              'src/includes/start-footer.html'
            ],
            'public/start.html': 'src/start.hbs.html'
          };
          return staticBuild;
        })()
      }
    },

    watch: {
      options: {
        livereload: true
      },

      stylus: {
        files: 'src/stylus/*.styl',
        tasks: 'stylus',
        events: true
      },

      css: {
        files: 'public/css/*.css',
        tasks: 'cssmin'
      },

      content: {
        files: ['src/*.hbs.html', 'src/includes/*'],
        tasks: 'static:docs'
      },

      js: {
        files: 'src/js/*.js',
        tasks: ['copy:js', 'uglify']
      }
    },

    stylus: {
      build: {
        options: {
          urlfunc: 'embedurl'
        },

        files: {
          'public/css/main.css': 'src/stylus/main.styl'
        }
      }
    },

    cssmin: {
      minify: {
        files: {
          'public/css/main.css': 'public/css/main.css'
        }
      }
    },

    uglify: {
      build: {
        options: {
          sourceMap: 'public/js/sourcemap.js',
          sourceMappingURL: '/js/sourcemap.js',
          sourceMapPrefix: '2'
        },
        files: {
          'public/js/site.min.js': [
            'src/js/vendor/jquery-1.10.2.min.js',
            'src/js/vendor/modernizr-2.6.2.min.js',
            'src/js/plugins.js',
            'src/js/main.js',
            'src/js/api.js'
          ]
        }
      },
      ie: {
        files: {
          'public/js/ie.min.js': [
            'src/js/ie/ie.js'
          ]
        }
      }
    },

    connect: {
      dev: {
        options: {
          port: 8000,
          hostname: '*',
          base: 'public'
        }
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['build', 'connect', 'watch']);
  grunt.registerTask('start', ['build', 'connect', 'open-browser', 'watch']);
  grunt.registerTask('build', ['process-readme', 'copy', 'static:docs', 'stylus', 'cssmin', 'uglify']);
  grunt.registerTask('release', ['build', 'release-docs']);

  grunt.registerTask('open-browser', function() {
    var open = require('open');
    open( 'http://localhost:8000' );
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('static');

  // Extra Tasks

  grunt.loadTasks('grunt');
};
