module.exports = function(grunt){

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify : {
			main : {
				src: 'src/*.js',
				dest: 'dist/imageLoader.min.js'
			},
			pkgd : {
				files : {
					'dist/imageLoader.pkgd.min.js' : ['src/imageLoader.js', 'bower_components/imagesloaded/imagesloaded.pkgd.js']
				}
			}	
		},
		copy : {
			main : {
				src: 'src/imageLoader.js',
				dest: 'dist/imageLoader.js'
			},
		},
		watch : {
			js : {
				files: 'src/*.js',
				tasks: ['uglify', 'copy']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');

};