//image preload test
var imageUrls = [
	"http://lorempixel.com/1500/1500/?1",
	"http://lorempixel.com/1500/1500/?2",
	"http://lorempixel.com/1500/1500/?3",
	"http://lorempixel.com/1500/1500/?4",
	"http://lorempixel.com/1500/1500/?5",
	"http://lorempixel.com/1500/1500/?6",
	"http://lorempixel.com/1500/1500/?7",
	"http://lorempixel.com/1500/1500/?8",
	"http://lorempixel.com/1500/1500/?9",
];

var imagesLoading = ImageLoader.preloadImages(imageUrls);

imagesLoading.done(function(){
	console.log("ImageLoader.preloadImages: all images loaded");
});
imagesLoading.fail(function(){
	console.log("ImageLoader.preloadImages: image load failed");
});
imagesLoading.always(function(){
	console.log("ImageLoader.preloadImages: always() handler executed");
});

//TODO: test other public methods



