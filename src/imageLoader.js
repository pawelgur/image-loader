////////////////////////////////////////////////
//  
//  IMAGE LOADEDER
//
//  Various helpers for image preloading
//
//  Dependencies: jQuery, imagesloaded.pkgd.js
//


var ImageLoader = (function($)
{
	var that = {};
	
	///////// private
	
	var statusParentSelector = ".imlo_status-parent";
	
	var setStatus = function($el)
	{
		var $loadParent = $el.closest(statusParentSelector);
		
		$el.addClass("loaded");	
		$loadParent.addClass("loaded");
	};
	
	
	///////// public 
		
	that.setStatus = true; //"loaded" class will not be added if set to false (usable when only promise is needed)
		
	// Preloads images by urls.
	//  - returns promise object 
	//  - timeout can be set, use it with always() for guaranteed completion
	that.preloadImages = function(imageUrls, timeout)
	{
	    var deferred = $.Deferred();
	    var loadedCount = 0;
	    
	    var loadHandler = function(ev){
	        loadedCount++;
	        if(loadedCount === imageUrls.length)
	        {
	            deferred.resolve();
	        }
	    };
	    
	    for(var i = 0; i < imageUrls.length; i++)
	    {
	        var url = imageUrls[i];
	        var img = new Image();
	        img.src = url;        
	        imagesLoaded(img, loadHandler);
	    }
	        
	    if(timeout){
	        setTimeout(function() {
	            if(loadedCount !== imageUrls.length)
	            {
	                console.log("preloadImages: timeout exceeded. Loaded:", loadedCount, "/", imageUrls.length);    
	            }
	            deferred.reject();            
	        }, timeout);
	    }
	    
	    return deferred.promise();
	};
	
	// Sets "loaded" class on image when it is loaded
	//	- returns promise object for callback functionality 	
	//	- sets "loaded" on ancestor with "imlo_status-parent" class
	//	- method supports jquery array
	that.setLoadStatus = function($imgs)
	{
		var deferred = $.Deferred();
		var loadedCount = "0";
		
		var loadCallback = function($img, $loadParent)
		{
			return function()
			{
				setStatus($img);	
		    	loadedCount++;
		    	if(loadedCount === $imgs.length)
		        {
		            deferred.resolve();
		        }
	        };		
		}
		
		for(var i = 0; i < $imgs.length; i++)
		{
		 	var img = $imgs[i];
		 	var $img = $(img);
	    	imagesLoaded(img, loadCallback($img, $loadParent));
		}
		
		return deferred.promise()		
	};
	
	// Loads image specified in data-img attribute on wrapper element and appends it to element
	//	- returns promise object for callback functionality 	
	//	- sets "loaded" on $el and ancestor with "imlo_status-parent" class
	//	- method supports jquery array
	that.loadImage = function($els)
	{
		var deferred = $.Deferred();
		var loadedCount = "0";
		
		var loadCallback = function($el, img, $loadParent)
		{
			return function()
			{
				$el.append(img);				
				setStatus($(img));
		    	loadedCount++;
		    	if(loadedCount === $imgs.length)
		        {
		            deferred.resolve();
		        }
	        };		
		}
		
		for(var i = 0; i < $els.length; i++)
		{
			var $el = $($els[i]); 	
			var img = new Image();
			img.src = $el.data("img");			
			imagesLoaded(img, loadCallback($el, img, $loadParent));
		}
		
		return deferred.promise();
	};
	
	
	// Same as [loadImage()] but sets image as css background instead of appending it
	that.loadImageBg = function($els)
	{
		var deferred = $.Deferred();
		var loadedCount = "0";
		
		var loadCallback = function($el, src, $loadParent)
		{
			return function()
			{
				$el.css('background-image', 'url("' + src + '")');			
				setStatus($el);				
		    	loadedCount++;
		    	if(loadedCount === $imgs.length)
		        {
		            deferred.resolve();
		        }
	        };		
		}
		
		for(var i = 0; i < $els.length; i++)
		{
			var $el = $($els[i]); 
			var src = $el.data("img");
			var img = new Image();
			img.src = src;			
			imagesLoaded(img, loadCallback($el, src, $loadParent));
		}
		
		return deferred.promise();
	};
	
	///////// public helpers
	
	//imlo_loadstatus
	that.initLoadStatus = function($root)
	{
		$root = $root || $("body");
		var $els = $root.find(".imlo_loadstatus");
		that.setLoadStatus($els);
	};
	
	//imlo_load
	that.initLoadStatus = function($root)
	{
		$root = $root || $("body");
		var $els = $root.find(".imlo_load");
		that.loadImage($els);
	};
	
	//imlo_loadbg
	that.initLoadStatus = function($root)
	{
		$root = $root || $("body");
		var $els = $root.find(".imlo_loadbg");
		that.loadImageBg($els);
	};
	
	return that;
})(jQuery);