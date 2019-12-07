module.exports = function(grunt) {
    grunt.initConfig({
        browserify: {
            dist: {
                options: {
                    transform: [
                        ["babelify", {
                            loose: "all"
                        }]
                    ]
                },
                files: {
                    // if the source file has an extension of es6 then
                    // we change the name of the source file accordingly.
                    // The result file's extension is always .js
                    "./dist/bundle.js": ["./src/common/*.js","./src/module/*.js"]
                }
            }
        },
        less: {
            development: {
                options: {
                    compress: false,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    "dist/common.css": "less/common.less", // destination file and source file
                    "dist/index.css": "less/parts/index.less", // destination file and source file
                }
            }
        },
        watch: {
            scripts: {
                files: ["./src/*.js", "./src/**/*.js", "./lib/*.js"],
                tasks: ["browserify"]
            },
            styles: {
                files: ['./less/*.less'], // which files to watch
                tasks: ['less'],
                options: {
                    nospawn: true
                }
            }
        }

    });

    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks("grunt-contrib-watch");

    grunt.registerTask("default", ["browserify", "less", "watch"]);
    grunt.registerTask("lessc", ["less"]);
    grunt.registerTask("watch", ["watch"]);

};
