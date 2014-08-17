"use strict"

exports = (grunt) ->

  require("load-grunt-tasks") grunt
  require("time-grunt") grunt

  grunt.registerTask "fm", [
    "concat:fm"
    "cssmin:fm"
    "closure-compiler:fm"
    "htmlmin:fm"
    "regex-replace:fm"
  ]

  grunt.registerTask "default", "fm"

  rev = require("md5").digest_s grunt.template.today "yyyymmddss"

  path = 
    tmp: "tmp/"
    jsdev: "scripts/"
    cssdev: "styles/"
    output: "./"

  grunt.initConfig

    concat:
      fm: 
        src: [
          "#{path.jsdev}bugoo.js"
          "#{path.jsdev}fm.js"
        ]
        dest: "#{path.tmp}concat.fm.js"

    cssmin:
      fm:
        src: "#{path.cssdev}fm.css"
        dest: "#{path.output}min.fm.#{rev}.css"

    htmlmin:                              
      fm:
        options:
          removeComments: yes
          collapseWhitespace: yes
   
        files:           
          "index.html": "index.dev.html"

    'regex-replace':
      fm:
        actions:[
          {
            search: "styles/fm"
            replace: "min.fm.#{rev}"
            flags: "g"
          }
          {
            search: "scripts/fm"
            replace: "min.fm.#{rev}"
            flags: "g"
          }
          {
            search: '<script type="text/javascript" src="scripts/bugoo.js">'
            replace: ""
            flags: "g"
          }
        ]
        src: [
          "index.html"
        ]
      
    'closure-compiler':
      fm:
        closurePath: 'bin'
        js: "<%= concat.fm.dest %>"
        jsOutputFile: "#{path.output}min.fm.#{rev}.js"
        maxBuffer: 500
        options: 
          compilation_level: 'ADVANCED_OPTIMIZATIONS'
          language_in: 'ECMASCRIPT5_STRICT'
          define: 'IS_USE_FLASH=false'
          output_wrapper: '(function(){%output%})()'



module.exports = exports