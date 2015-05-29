'use strict';

define([], function() {

  var GraphPanel = {

    initialize: function(card_container) {

      var graph_container = document.createElement('div');
      graph_container.className = 'sorted-container';
      card_container.appendChild(graph_container);
      return graph_container;
    }
  };

  return {
    initialize: function(card_container) {
      return GraphPanel.initialize(card_container);
    },
  };
});
