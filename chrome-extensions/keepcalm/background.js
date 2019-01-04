'use strict';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ keepCalmStatus: false }, () => {
    console.log('keepCalmStatus intialized to false');
  });

  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {

    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [ 
        new chrome.declarativeContent.PageStateMatcher({ pageUrl: { hostEquals: 'www.booking.com' }}),
        new chrome.declarativeContent.PageStateMatcher({ pageUrl: { hostSuffix: '.hotels.com' }}),
        new chrome.declarativeContent.PageStateMatcher({ pageUrl: { hostPrefix: 'www.trivago.' }})
      ],
      actions: [ new chrome.declarativeContent.ShowPageAction() ]
    }]);
  
  });
});