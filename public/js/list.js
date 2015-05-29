'use strict';

define(['bar'], function(Bar) {

  var List = {
    graph_container: null,

    initialize: function(graph_container, options) {
      var bar_list = new Array();
      self.graph_container = graph_container ? graph_container : self.graph_container;
      var list_size = options.length ? options.length : 10;
      var upper_bound = options.upper_bound ? options.upper_bound : 100;
      var lower_bound = options.lower_bound ? options.lower_bound : 1;

      var value_list = options.list ? options.list : this.generateList(list_size, lower_bound, upper_bound);
      bar_list = this.transformList(value_list, self.graph_container);
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

      }

      return bar_list;
    },

  };



  return {
    initialize: function(id, options) {
      return List.initialize(id, options);
    },
  };
});
