////////   image preload test

var imageUrls = [
	"img/1.jpg",
	"img/2.jpg",
	"img/3.jpg",
	"img/4.jpg",
	"img/5.jpg",
	"http://lorempixel.com/1500/1500/?60",
	"http://lorempixel.com/1500/1500/?70",
	"http://lorempixel.com/1500/1500/?80",
	"http://lorempixel.com/1500/1500/?90",
];

var imagesLoading1 = ImageLoader.preloadImages(imageUrls);

imagesLoading1.done(function(){
	console.log("ImageLoader.preloadImages: all images loaded");
	$(".preload h2").text("Preloaded " + imageUrls.length + " images");
});
imagesLoading1.fail(function(){
	console.log("ImageLoader.preloadImages: image load failed/timed out");
});
imagesLoading1.always(function(){
	console.log("ImageLoader.preloadImages: always() handler executed");
});


//////// load status (standard <img> loaded status)

var $images = $(".load-status img");

var imagesLoading2 = ImageLoader.setLoadStatus($images);

imagesLoading2.done(function(){
	console.log("ImageLoader.setLoadStatus: all images loaded");
});


//////// load image

var $els = $(".load-image div");

var imagesLoading3 = ImageLoader.loadImage($els);

imagesLoading3.done(function(){
	console.log("ImageLoader.loadImage: all images loaded");
});

//////// load background

$els = $(".load-bg div");

var imagesLoading3 = ImageLoader.loadImageBg($els);

imagesLoading3.done(function(){
	console.log("ImageLoader.loadImageBg: all images loaded");
});


//////// css class helpers

var statuses = ImageLoader.initAllLoading();


// do something when all images are loaded

$.when(imagesLoading1, imagesLoading2, imagesLoading3, 
		statuses[0], statuses[1], statuses[2]
		).done(function()
{
	$(".status").text("NICE! ALL IMAGES LOADED");	
});


