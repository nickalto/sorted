'use strict';

define(['list', 'actionPanel', 'graphPanel', 'mergesort'], function(List, ActionPanel, GraphPanel, Mergesort) {

  var Graph = {
    options: null,
    list: [],
    self: null,

    initialize: function(id, options) {
      self = Graph;
      self.options = options;
      self.card_container = document.getElementById(id);
      self.algorithm = options.algorithm ? options.algorithm : 'Merge Sort';
      self.clock_cycle = options.clock_cycle ? options.clock_cycle : 500;

      var graph_container = GraphPanel.initialize(self.card_container);
      self.graph_container = graph_container;

      var list = List.initialize( self.graph_container, self.options);
      self.list = list;
      ActionPanel.initialize(self.card_container, self.algorithm, { pause: self.pause, resume: self.resume });

      Mergesort.initialize({ list: list, clock_cycle: self.clock_cycle, container: self.graph_container, finished: Graph.finished });
      window.onresize = this.onResize;

    },

    pause: function() {
      Mergesort.pause();
    },

    resume: function() {
      var self = Graph;

      if( !Mergesort.isExecuting() ) {
        self.restart();
      } else {
        Mergesort.resume();
      }
    },

    finished: function() {
      ActionPanel.reset();
    },

    restart: function() {
      var self = Graph;
      for( var i = 0; i < self.list.length; i++ ) {
        self.graph_container.removeChild(self.list[i].element);
      }

      var list = List.initialize(self.graph_container, self.options);
      self.list = list;
      Mergesort.initialize({ list: list, clock_cycle: self.clock_cycle, container: self.graph_container, finished: Graph.finished });
      Mergesort.resume();
    },

    onResize: function() {
      var self = Graph;
      for( var i = 0; i < self.list.length; i++ ) {
        var bar = self.list[i];
        bar.onResize();
      }
    },

  };



  return {
    initialize: function(id, options) {
      Graph.initialize(id, options);
    },
  };
});
