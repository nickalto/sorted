'use strict';

define(['snap', 'bar', 'mergesort'], function(Snap, Bar, Mergesort) {

  var Graph = {
    container: null,
    list: [],
    rawListValues: [],
    self: null,
    algorithm: null,
    clock_cycle: 0,

    initialize: function(id, options) {
      self = this;
      this.container = document.getElementById(id);
      this.list = this.initializeList(options);
      this.algorithm = options.algorithm ? options.algorithm : 'mergesort';
      this.clock_cycle = options.clock_cycle ? options.clock_cycle : 500;
      Mergesort.initialize({ raw: this.rawListValues, list: this.list, clock_cycle: this.clock_cycle, container: this.container });
      window.onresize = this.onResize;

    },

    initializeList: function(options) {
      var list_size = options.length ? options.length : 10;
      var upper_bound = options.upper_bound ? options.upper_bound : 100;
      var lower_bound = options.lower_bound ? options.lower_bound : 1;

      var value_list = options.list ? options.list : this.generateList(list_size, lower_bound, upper_bound);
      this.rawListValues = value_list;
      var bar_list = this.transformList(value_list, container);
      return bar_list;
    },

    generateList: function(list_size, lower_bound, upper_bound) {
      var list = [];

      while( list.length < list_size ) {

        var random_number = Math.round( Math.random() * (upper_bound - lower_bound) + lower_bound);

        if( list.indexOf(random_number) == -1 ) {
          list.push( random_number );
        }

      }

      return list;
    },

    transformList: function(list, container) {
      var bar_list = [];
      var max_height = Math.max.apply(null, list);
      var value = 0;
      var width = 0;

      for( var i = 0; i < list.length; i++ ) {
        value = list[i];
        width = ( 1 / list.length ) ;

        var bar = Bar.initialize({
          container: container,
          value: value,
          width:  width,
          height: ( value / max_height ),
          x: ( i * width ),
          y: 0
        });

        bar_list.push(bar);
        bar.draw();

      }

      return bar_list;
    },

    onResize: function() {
      for( var i = 0; i < self.list.length; i++ ) {
        self.list[i].onResize();
      }
    },

  };



  return {
    initialize: function(id, options) {
      Graph.initialize(id, options);
    },
  };
});
