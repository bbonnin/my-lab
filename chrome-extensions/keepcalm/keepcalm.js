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

[ 'd-deal-b', 'js_sr_persuation_msg' ].forEach(changeVisibility);

// For Trivago

[ 'item__worst-price', 'flag--deal-best' ].forEach(changeVisibility);

// For Hotels.com

[ 'special-deal', 'scarcity-message' ].forEach(changeVisibility);

document.querySelectorAll('#listings .price del').forEach(elt => {
  elt.style.display = display;
});

document.querySelectorAll('#listings .scarcity-message + a b').forEach(elt => {
  if (display != '') {
    elt.style.color = '#333';
  }

  // d32f2f
});