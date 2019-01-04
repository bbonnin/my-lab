'use strict';

// -----------------------------------------------
// Update the visibility of some parts of the page
// -----------------------------------------------

function changeVisibility(className) {
  var persuasionMsg = document.getElementsByClassName(className);

  [].forEach.call(persuasionMsg, (msg) => {
    msg.style.display = display;
  });
}

// For Booking.com

[ 'd-deal-b', 'js_sr_persuation_msg', 'strike-it-red_anim', 'crossedout-price-icon' ].forEach(changeVisibility);

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