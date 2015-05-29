'use strict';

define(['button'], function(Button) {

  var ActionPanel = {
    self: null,
    card_container: null,
    button: null,
    title: null,

    initialize: function(card_container, title, callbacks) {
      self = this;
      self.title = title;
      self.callbacks = callbacks;

      self.card_container = card_container;
      self.initializeButtonContainer();
    },

    initializeButtonContainer: function () {

      self.button = Button.initialize(self.callbacks);

      self.button_container = document.createElement('div');
      self.button_container.className = 'button-container';
      self.button_container.appendChild(self.button.element);

      var title = document.createElement('h2');
      title.innerHTML = self.title;

      var footer = document.createElement('div');
      footer.className = 'footer';
      footer.appendChild(title);
      footer.appendChild(self.button_container);

      self.card_container.appendChild(footer);
    },

    reset: function() {
      self.button.reset();
    }
  };


  return {
    initialize: function(id, title, callbacks) {
      ActionPanel.initialize(id, title, callbacks);
    },
    reset: function() {
      ActionPanel.reset();
    }
  };
});
