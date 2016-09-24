"use strict";function loadSound(e,n){var o=new XMLHttpRequest;o.open("GET",e,!0),o.responseType="arraybuffer",o.onload=function(){context.decodeAudioData(o.response,n,onError)},o.send()}function playSound(e,n,o){var t=context.createBufferSource();t.buffer=e,t.connect(o),t.playbackRate.setValueAtTime(n,0),t.start(0)}function onError(e){console.log("error loading sound",e)}var context=new AudioContext,pingBuffer=null,pongBuffer=null,postPingBuffer=null,postPongBuffer=null,failBuffer=null,threeBuffer=null,leftPanner=context.createStereoPanner(),rightPanner=context.createStereoPanner();leftPanner.pan.value=-1,rightPanner.pan.value=1,leftPanner.connect(context.destination),rightPanner.connect(context.destination),loadSound("audio/pop.mp3",function(e){pingBuffer=e}),loadSound("audio/pop2.mp3",function(e){pongBuffer=e}),loadSound("audio/post1.mp3",function(e){postPingBuffer=e}),loadSound("audio/post2.mp3",function(e){postPongBuffer=e}),loadSound("audio/gnatattack_bombhit.mp3",function(e){failBuffer=e}),loadSound("audio/eraserloop.mp3",function(e){failBuffer=e}),chrome.runtime.onInstalled.addListener(function(e){console.log("previousVersion",e.previousVersion)}),chrome.tabs.onUpdated.addListener(function(e){chrome.pageAction.show(e)}),chrome.webRequest.onBeforeSendHeaders.addListener(function(e){"POST"===e.method&&postPingBuffer?playSound(postPingBuffer,1,leftPanner):pingBuffer&&playSound(pingBuffer,2,leftPanner)},{urls:["<all_urls>"]}),chrome.webRequest.onHeadersReceived.addListener(function(e){console.log(e.statusCode)},{urls:["<all_urls>"]}),chrome.webRequest.onCompleted.addListener(function(e){e.statusCode>=400?playSound(failBuffer,1,context.destination):e.statusCode>=300?playSound(threeBuffer,1,context.destination):"POST"===e.method&&postPongBuffer?playSound(postPongBuffer,1,rightPanner):pongBuffer&&playSound(pongBuffer,.3,rightPanner)},{urls:["<all_urls>"]});
//# sourceMappingURL=background.js.map
