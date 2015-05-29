'use strict';

define(['snap', 'bar'], function(Snap, Bar) {

  var mergesort = {
    container: null,
    list: [],
    pause: true,
    executing: false,
    clock_cycle: 0,

    initialize: function(options) {
      var self = this;
      this.list = options.list;
      this.finished = options.finished;
      this.executing = true;

      var sorted = this.sort(this.list, function(l) {
        self.executing = false;
        self.highlightSelected(l, Bar.colors.finished);
        self.pauseExecution();
        self.finished();
      });
    },

    pauseExecution: function() {
      this.pause = true;
    },

    resumeExecution: function() {
      this.pause = false;
    },

    isExecuting: function() {
      return this.executing;
    },

    findSwapItem: function(list, item, index) {
      var swap_item = null;

      for(var i = 0; i < list.length; i++) {
        var bar = list[i];
        var swap_item_index = Math.round(bar.relative_positions.x / item.relative_positions.width);

        if( swap_item_index === index) {
          swap_item = bar;
          break;
        }
      }

      return swap_item;
    },

    swap: function(list, item, index) {

      var swap_item = this.findSwapItem(list, item, index);

      if( swap_item ) {

        var item_updated_x = swap_item.relative_positions.x;
        var swap_item_updated_x = item.relative_positions.x;

        swap_item.swapUpdate(swap_item_updated_x);
        item.swapUpdate(item_updated_x);

      }

    },

    highlightSelected: function(list, color) {
      for(var i = 0; i < list.length; i++ ){
        list[i].svg.animate({ fill: color }, 100);
      }
    },

    merge: function(left, right, callback){
      var self = this;
        var result = [];

        var timeout = 300 / (left.length + right.length);

        var interval_id = setInterval(function() {
          if(left.length > 0 && right.length > 0) {

            if (left[0].value < right[0].value){
              result.push(left.shift());
            } else {
              result.push(right.shift());
            }

          } else {
            result = result.concat(left).concat(right);

            //make sure remaining arrays are empty
            left.splice(0, left.length);
            right.splice(0, right.length);
            clearInterval(interval_id);
            callback(result);
          }
        }, timeout);
    },

    sort: function(list, callback){
        var self = this;

        if (list.length < 2) {
            return list;
        }

        var result = [], len = list.length, lim = len, j = 0, k = 0, lock = false, list_offset = 0;

        for (var i = 0; i < len; i++){
            result.push([ list[i] ]);
        }

        result.push([]);

        var interval_id = setInterval(function() {

          if( !lock && !self.pause ) {

            if( lim > 1 && k < lim ) {

              lock = true;
              var left = result[k];
              var right = result[k+1];

              self.highlightSelected(left.concat(right), Bar.colors.active);

              self.merge(left, right, function(merged_list) {
                list_offset = ( !list_offset ) ? merged_list.length : list_offset;

                var offset_index = j * list_offset;

                for( var i = 0; i < merged_list.length; i++ ) {
                  self.swap(merged_list, merged_list[i], offset_index + i );
                }

                self.highlightSelected(merged_list, Bar.colors.sorted);

                result[j] = merged_list;
                lock = false;
                j++;
                k += 2;
              });


            } else if( lim > 1 ){

              self.highlightSelected(self.list, Bar.colors.normal);

              lim = Math.floor( ( lim + 1 ) / 2 );
              j = 0;
              k = 0;
              list_offset = 0;

            } else {

              clearInterval(interval_id);
              callback(result[0]);
            }
          }
        }, 800);
    }
  };

  return {
    initialize: function(options) {
      mergesort.initialize(options);
    },

    pause: function() {
      mergesort.pauseExecution();
    },

    resume: function() {
      mergesort.resumeExecution();
    },

    isExecuting: function() {
      return mergesort.isExecuting();
    }
  };
});
