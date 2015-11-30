!function t(e,n,r){function o(i,s){if(!n[i]){if(!e[i]){var u="function"==typeof require&&require;if(!s&&u)return u(i,!0);if(a)return a(i,!0);throw new Error("Cannot find module '"+i+"'")}var d=n[i]={exports:{}};e[i][0].call(d.exports,function(t){var n=e[i][1][t];return o(n?n:t)},d,d.exports,t,e,n,r)}return n[i].exports}for(var a="function"==typeof require&&require,i=0;i<r.length;i++)o(r[i]);return o}({1:[function(t,e,n){"use strict";var r=t("./modules/getJson"),o=t("./modules/wordCloud");r.loadItem("scripts/data.json",function(t){var e=o.rearrangeObject(t.topics);o.cloudInit(e)})},{"./modules/getJson":2,"./modules/wordCloud":3}],2:[function(t,e,n){"use strict";e.exports={loadItem:function(t,e){var n;n=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP"),n.onreadystatechange=function(){if(n.readyState===XMLHttpRequest.DONE)if(200===n.status){var t=JSON.parse(n.responseText);e&&e(t)}else 400===n.status?console.log("There was a 400 error"):console.log("Something other than a 200 or 400 occurred")},n.open("GET",t,!0),n.send()}}},{}],3:[function(t,e,n){"use strict";e.exports={rearrangeObject:function(t){var e=t.sort(function(t,e){return e.sentimentScore-t.sentimentScore});return e},cloudInit:function(t){function e(t){for(var e=[45,35,25,20,16,14],n=Math.floor(t.length/e.length),r=0,o=0;o<t.length;o++)t[o].theFontSize=e[r],o%n===0&&r<e.length-1&&r++;return t}function n(t){function e(t){return t>=60?"green":40>=t?"red":"grey"}function n(t){var e={negative:0,neutral:0,positive:0};for(var n in t)e[n]=t[n];return e}this.word=t.label,this.score=t.sentimentScore,this.classAttr=e(t.sentimentScore),this.sentiment=n(t.sentiment),this.theFontSize=t.theFontSize}function r(t,e,n){document.addEventListener(t,function(t){var r=document.querySelectorAll(e);if(r){for(var o=t.target,a=-1;o&&-1===(a=Array.prototype.indexOf.call(r,o));)o=o.parentElement;a>-1&&n.call(o,t)}})}function o(t){for(var e="",n=0;n<t.length;n++)e+='<a class="'+t[n].classAttr+' link" data-negative="'+t[n].sentiment.negative+'" data-neutral="'+t[n].sentiment.neutral+'" data-positive="'+t[n].sentiment.positive+'" style="font-size: '+t[n].theFontSize+'px">'+t[n].word+'<span data-letters="'+t[n].word+'"></span><span data-letters="'+t[n].word+'"></span></a>';return e}function a(t){var e=document.getElementById("cloudArea");e.innerHTML=o(t)}function i(t){var e="<h2>Information on topic <span>"+t.innerHTML+'</span></h2><dl class="dl-horizontal">';e+="<dt>Total Mentions:</dt>",e+="<dd>"+(parseInt(t.getAttribute("data-positive"))+parseInt(t.getAttribute("data-neutral"))+parseInt(t.getAttribute("data-negative")))+"</dd>",e+="<dt>Positive Mentions:</dt>",e+='<dd class="green">'+t.getAttribute("data-positive")+"</dd>",e+="<dt>Neutral Mentions:</dt>",e+="<dd>"+t.getAttribute("data-neutral")+"</dd>",e+="<dt>Negative Mentions:</dt>",e+='<dd class="red">'+t.getAttribute("data-negative")+"</dd>",e+="</dl>",document.getElementById("infoArea").innerHTML=e}var s=[];e(t);for(var u=0;u<t.length;u++){var d=new n(t[u]);s.push(d)}return a(s),r("click","#cloudArea a",function(t){i(this)}),s}}},{}]},{},[1]);