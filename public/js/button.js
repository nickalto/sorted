'use strict';

define([], function() {

  var Button = {

    /**************************************************************
    * initialize
    *
    * Create new button, icons and hook up callbacks for button
    * triggers.
    **************************************************************/

    initialize: function(callbacks) {
      var button = new Object();

      button.callbacks = callbacks;
      button.icons = {
        play: 'icon-play',
        pause: 'icon-pause',
      };

      button.icon = document.createElement('i');
      button.icon.className = button.icons.play;
      button.element = document.createElement('a');
      button.element.href = "#";
      button.element.appendChild(button.icon);

      button.element.onclick = function() {
        if( button.icon.className === button.icons.pause ) {
          button.icon.className = button.icons.play;
          button.callbacks.pause();
        } else {
          button.icon.className = button.icons.pause;
          button.callbacks.resume();
        }
      };

      button.reset = function() {
        button.icon.className = button.icons.play;
      };

      return button;

    }

  };

  return {
    initialize: function(callbacks) {
      return Button.initialize(callbacks);
    },
  };
});
