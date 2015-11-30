'use strict';
var getJson = require('./modules/getJson');
var wordCloud = require('./modules/wordCloud');
//Maybe add settings here

getJson.loadItem('scripts/data.json', function(data){
	var arrangedData = wordCloud.rearrangeObject(data.topics);
	wordCloud.cloudInit(arrangedData);
});
