'use strict';
module.exports = {
	rearrangeObject: function (theData) {
		var sortByKey = theData.sort(function(a, b){
			return b.sentimentScore - a.sentimentScore;
		});
		return sortByKey;
	},
	cloudInit: function (theData) {
		var items = [];

		function addTheFontSizes(data){
			var fontSettings = [45, 35, 25, 20, 16, 14],
				switchEvery = Math.floor(data.length / fontSettings.length),
				switchIndex = 0;
				for (var i = 0; i < data.length; i++) {
					data[i].theFontSize = fontSettings[switchIndex];
					if (i % switchEvery === 0 && (switchIndex) < fontSettings.length - 1) {
						switchIndex++;
					}
				}
				return data;
		}

		function CloudItem(data) {

			function addTheClass(sentimentScore) {
				if (sentimentScore >= 60) {
					return 'green';
				} else if (sentimentScore <= 40) {
					return 'red';
				} else {
					return 'grey';
				}
			}

			function addSentimentData(sentiment) {
				var sentimentData = {negative: 0, neutral: 0, positive: 0};
				for (var x in sentiment) {
					sentimentData[x] = sentiment[x];
				}
				return sentimentData;
			}

			this.word = data.label;
			this.score = data.sentimentScore;
			this.classAttr = addTheClass(data.sentimentScore);
			this.sentiment = addSentimentData(data.sentiment);
			this.theFontSize = data.theFontSize;
		}

		function live(eventType, elementQuerySelector, cb) {
			document.addEventListener(eventType, function (event) {

				var qs = document.querySelectorAll(elementQuerySelector);

				if (qs) {
					var el = event.target, index = -1;
					while (el && ((index = Array.prototype.indexOf.call(qs, el)) === -1)) {
						el = el.parentElement;
					}

					if (index > -1) {
						cb.call(el, event);
					}
				}
			});
		}

		function createDomString(theItems) {
			var domString = '';
			for (var i = 0; i < theItems.length; i++) {
				domString += '<a class="' + theItems[i].classAttr + ' link" data-negative="' + theItems[i].sentiment.negative + '" data-neutral="' + theItems[i].sentiment.neutral + '" data-positive="' + theItems[i].sentiment.positive + '" style="font-size: ' + theItems[i].theFontSize + 'px">' + theItems[i].word + '<span data-letters="' + theItems[i].word + '"></span><span data-letters="' + theItems[i].word + '"></span></a>';
			}
			return domString;
		}

		function addToDom(theItems) {
			var theTarget = document.getElementById('cloudArea');
			theTarget.innerHTML = createDomString(theItems);
		}

		addTheFontSizes(theData);

		for (var j = 0; j < theData.length; j++) {
			var item = 	new CloudItem(theData[j]);
			items.push(item);
		}

		function updateInfo(info){
			var theNewHTML 	= '<h2>Information on topic <span>' + info.innerHTML + '</span></h2><dl class="dl-horizontal">';
				theNewHTML	+= '<dt>Total Mentions:</dt>';
				theNewHTML	+= '<dd>' + (parseInt(info.getAttribute('data-positive')) + parseInt(info.getAttribute('data-neutral')) + parseInt(info.getAttribute('data-negative')) ) + '</dd>';
				theNewHTML	+= '<dt>Positive Mentions:</dt>';
				theNewHTML	+= '<dd class="green">' + info.getAttribute('data-positive') + '</dd>';
				theNewHTML	+= '<dt>Neutral Mentions:</dt>';
				theNewHTML	+= '<dd>' + info.getAttribute('data-neutral') + '</dd>';
				theNewHTML	+= '<dt>Negative Mentions:</dt>';
				theNewHTML	+= '<dd class="red">' + info.getAttribute('data-negative') + '</dd>';
				theNewHTML	+= '</dl>';
			document.getElementById('infoArea').innerHTML = theNewHTML;
		}

		addToDom(items);
		live('click', '#cloudArea a', function() {
			updateInfo(this);
		});

		return items;
	}
};
