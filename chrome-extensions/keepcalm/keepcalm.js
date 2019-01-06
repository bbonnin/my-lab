'use strict';

// -----------------------------------------------
// Update the visibility of some parts of the page
// -----------------------------------------------

var display = '';

function changeVisibility(className) {
  var persuasionMsg = document.getElementsByClassName(className);

  [].forEach.call(persuasionMsg, (msg) => {
    msg.style.display = display;
  });
}

function updateContent() {

  // For Booking.com

  [ 
    'd-deal-b', 
    'js_sr_persuation_msg', 
    'strike-it-red_anim', 
    'crossedout-price-icon', 
    'sr--soldout-content',
    'sr_hotel_expectation__wrapper' ].forEach(changeVisibility);

  document.querySelectorAll('strong.scarcity_color b').forEach(elt => {
    if (display !== '') {
      elt.style.color = '#0ab21b';
    }
    else {
      elt.style.color = '#ff0202';
    }
  });

  // For Trivago

  [ 'item__worst-price', 'flag--deal-best' ].forEach(changeVisibility);

  // For Hotels.com

  [ 'special-deal', 'scarcity-message', 'hotel-badge' ].forEach(changeVisibility);

  document.querySelectorAll('#listings .price del').forEach(elt => {
    elt.style.display = display;
  });

  document.querySelectorAll('#listings .scarcity-message + a b').forEach(elt => {
    if (display !== '') {
      elt.style.color = '#333';
    }
    else {
      elt.style.color = '#d32f2f'; 
    }
  });
}

// Update the content when there is an update of the status

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    display = message === 'remove-ads' ? 'none': '';
    updateContent();
});


// Observe any modifications to update the content

var observer = new MutationObserver(mutations => {
  mutations.forEach(() => {   
    updateContent();
  });
});

var observeOptions = {
  attributes: true,
  characterData: true,
  childList: true,
  subtree: true,
  attributeOldValue: true,
  characterDataOldValue: true
};

var bookingCom = document.getElementById('search_results_table');
if (bookingCom) observer.observe(bookingCom, observeOptions);

var hotelsCom = document.getElementById('listings');
if (hotelsCom) observer.observe(hotelsCom, observeOptions);

var trivago = document.getElementById('js_item_list_container');
if (trivago) observer.observe(trivago, observeOptions);
