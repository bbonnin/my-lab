'use strict';

function setStatus(newStatus) {
  chrome.storage.sync.set({ keepCalmStatus: newStatus }, () => {
    console.log('keepCalmStatus : ' + newStatus);
  });
}

function updatePage() {
  chrome.storage.sync.get('keepCalmStatus', (data) => {

    let status = data.keepCalmStatus;
    
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      let imgName = status + '-16.png';
      let display = status === 'remove-ads' ? 'none': '';

      chrome.pageAction.setIcon({ tabId: tabs[0].id, path: 'images/' + imgName });

      chrome.tabs.executeScript(
        tabs[0].id, 
        { code: 'var display = "' + display + '";' }, 
        () => {
          chrome.tabs.executeScript(
            tabs[0].id, 
            { file: 'keepcalm.js' })
        });
      });

      setStatus(status === 'remove-ads' ? 'with-ads' : 'remove-ads');
  });
};

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

chrome.pageAction.onClicked.addListener(updatePage);
