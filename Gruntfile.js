module.exports = function(grunt){

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify : {
			main : {
				src: 'imageLoader.js',
				dest: 'imageLoader.min.js'
			},
			pkgd : {
				files : {
					'imageLoader.pkgd.min.js' : ['imageLoader.js', 'bower_components/imagesloaded/imagesloaded.pkgd.js']
				}
			}	
		},
		watch : {
			js : {
				files: 'imageLoader.js',
				tasks: ['uglify']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');

};