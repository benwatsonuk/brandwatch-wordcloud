'use strict';
module.exports = {
	loadItem: function (theUrl, callback) {
		var xmlhttp;
		xmlhttp = new XMLHttpRequest();

		xmlhttp.onreadystatechange = function () {
			if (xmlhttp.readyState === XMLHttpRequest.DONE) {
				if (xmlhttp.status === 200) {
					var data = JSON.parse(xmlhttp.responseText);
					if (callback) {
						callback(data);
					}
				} else if (xmlhttp.status === 400) {
					console.log('There was a 400 error');
				} else {
					console.log('Something other than a 200 or 400 occurred');
				}
			}
		};

		xmlhttp.open('GET', theUrl, true);
		xmlhttp.send();

	}
};
