'use strict';

// -------------------------------------------------------------------------------
// Popup with items for activating or not the visibility of some parts of the page
// -------------------------------------------------------------------------------

let keepCalm = document.getElementById('keepcalm');

chrome.storage.sync.get('keepCalmStatus', function (data) {
  keepCalm.checked = data.keepCalmStatus;
});

keepCalm.onclick = (element) => {
  chrome.storage.sync.set({ keepCalmStatus: keepCalm.checked }, function (data) {
    console.log('keepCalmStatus = ', keepCalm.checked);
  });

  let display = keepCalm.checked ? 'none': '';

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    
    chrome.tabs.executeScript(
      tabs[0].id, 
      { code: 'var display = "' + display + '";' }, 
      () => {
        chrome.tabs.executeScript(
          tabs[0].id, 
          { file: 'keepcalm.js' })
      });
  });
}