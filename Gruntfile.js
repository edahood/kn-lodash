module.exports = function (grunt) {
    grunt.initConfig({
        'bower': {
            'install': {
                'options': {
                    'targetDir': './lib'
                }
            }
        },
        'jshint': {
            'src': [
                './*.js',
                './test/*.js'
            ],
            'options': {
                'jshintrc': '.jshintrc'
            }
        },
        'jscs': {
            'src': '<%= jshint.src %>'
        },
        'karma': {
            'options': {
                'configFile': 'karma.conf.js'
            },
            'test': {
                'reporters': ['progress']
            }
        },
        'lodash': {
            'target': {
                'dest': 'build/kn-lodash.js'
            },
            'options': {
                'modifier': 'modern',
                'exports': [
                    'amd',
                    'commonjs',
                    'node'
                ],
                'iife': 'angular.module(\'knLodash\', [])' +
                    '.constant(\'lodash\', null)' +
                    '.config(function ($provide) { ' +
                        '%output% ' +
                        '$provide.constant(\'lodash\', _);' +
                    '});'
            }
        },
        ngAnnotate:{
              options:{
              },
              dist:{
                files:[{
                  src: 'build/kn-lodash.js',
                  dest: 'build/kn-lodash.js'
                }]
              }
        },
        'uglify': {
            'dist': {
                'options': {
                    'compress': {
                        unused: false
                    },
                    'sourceMap': true,
                    'preserveComments': 'some'
                },
                'files': {
                    'build/kn-lodash.min.js': 'build/kn-lodash.js'
                }
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    // Registers a task to run Karma tests and installs any pre-requisites
    // needed.
    grunt.registerTask('test', [
        'jshint',
        'jscs',
        'bower:install',
        'karma:test'
    ]);

    // Registers a task to build the ngLodash module
    grunt.registerTask('build', [
        'lodash',
        'ngAnnotate:dist',
        'uglify'
    ]);

    // Registers a task to build and test ready for distribution
    grunt.registerTask('dist', [
        'build',
        'test'
    ]);

    grunt.registerTask('default', ['build']);
};
