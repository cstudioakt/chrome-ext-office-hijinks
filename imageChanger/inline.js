// Generated by CoffeeScript 1.4.0
(function() {
  var config, fetchSetting, isWebsite, shouldClose, urlDomain;
  var imgAttempts = 0;

  config = {};

  isWebsite = function(test) {
	var url;
	url = urlDomain();
	return url.indexOf(test) !== -1;
  };

  urlDomain = function() {
	var a;
	a = document.createElement('a');
	a.href = location.href;
	return a.hostname;
  };

  shouldClose = function() {
	var rand;
	rand = Math.floor((Math.random() * 10) + 1);
	if (rand === 3) {
	  location.reload();
	  return console.log('reloading');
	} else {
	  console.log('You are lucky' + rand);
	  if (fetchSetting('reload_tabs')) {
		return setTimeout(shouldClose, 2000);
	  }
	}
  };

  getImage = function() {
	imgAttempts++;
	if( imgAttempts > 10 ) {
		return -1;
	}
	images = $('img');
	imgLength = images.length;
	rand = Math.floor(Math.random() * imgLength) + 1;
	console.log(images[rand]);
	if( images[rand] == undefined ) {
		return getImage();
	}

	imgWidth = images[rand].width;
	imgHeight = images[rand].height;
	// if(imgWidth > 513) {
	// 	return getImage();
	// }

	if(imgWidth < 100) {
		return getImage();
	}
	return {
		'img' : $(images[rand]),
		'imgWidth' : imgWidth,
		'imgHeight' : imgHeight
	};
  }

  chrome.runtime.sendMessage({
	greeting: 'can I have the config please :)'
  }, function(response) {
	  randomImg = Math.floor(Math.random() * 4) + 1;
	  setTimeout(function() {
		  img = getImage();
		  if(img == -1) {
			  return false;
		  }
		  if(img.img.parent().is('picture')) {
			  img.img.parent().find('source').remove();
		  }
		img.img.removeData();
		img.img.attr({
			//'src' : 'https://api.rethumb.com/v1/width/'+img.imgWidth+'/height/'+img.imgHeight+'/https://cdn1.edgedatg.com/aws/v2/abc/DesignatedSurvivor/showimages/5b71efcaa9c12d4a79afec551562cffc/1200x627-Q80_5b71efcaa9c12d4a79afec551562cffc.jpg',
			'src' : chrome.extension.getURL('images/img-'+randomImg+'.jpg'),
			'srcset' : ''
		});
		console.log(img.img);
	}, 0);
  });

}).call(this);
