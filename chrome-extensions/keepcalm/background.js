'use strict';

// --------------------------
// Manage the KeepCalm status
// --------------------------

function setStatus(newStatus, callback) {
  chrome.storage.sync.set({ keepCalmStatus: newStatus }, () => {
    if (callback)  {
      callback();
    }
    else {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, newStatus);
      });
    }
  });
}

function switchStatus() {
  chrome.storage.sync.get('keepCalmStatus', (data) => {
    let newStatus = data.keepCalmStatus === 'remove-ads' ? 'with-ads' : 'remove-ads';
    setStatus(newStatus, updatePage);
  });
}

function sendStatus() {
  chrome.storage.sync.get('keepCalmStatus', (data) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, data.keepCalmStatus);
    });
  });
}

function updatePage() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.storage.sync.get('keepCalmStatus', (data) => {
      let status = data.keepCalmStatus;
      let imgName = status + '-16.png';
      let display = status === 'remove-ads' ? 'none': '';

      chrome.pageAction.setIcon({ tabId: tabs[0].id, path: 'images/' + imgName });
      chrome.tabs.sendMessage(tabs[0].id, data.keepCalmStatus);
    });
  });
}

chrome.runtime.onInstalled.addListener(() => {
  setStatus('with-ads');

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

chrome.pageAction.onClicked.addListener(switchStatus);
