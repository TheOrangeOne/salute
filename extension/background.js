// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var flippedOff = true;
var xhr = new XMLHttpRequest();

function updateIcon() {
  chrome.browserAction.setIcon({path:"icon" + (flippedOff ? 1 : 2) + ".png"});
  flippedOff = !flippedOff;
}

function flipOff() {
  if (!flippedOff) {
    chrome.tabs.query({
      'active': true, 
      'lastFocusedWindow': true, 
      'currentWindow': true
    }, function(tabs) {
      var url = tabs[0].url;
      xhr.open("POST", "http://localhost:7022/api/flip", true);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(JSON.stringify({ url: url }));
    })
  }
}

function reset() {
  if (flippedOff) {
    updateIcon();
  }
}

chrome.browserAction.onClicked.addListener(flipOff);
chrome.browserAction.onClicked.addListener(updateIcon);
chrome.tabs.onActivated.addListener(reset);
updateIcon();
