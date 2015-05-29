'use strict';

define(['snap'], function(Snap) {

  var Bar = {
    colors: {
      normal: '#E0E0E0',
      sorted: '#9E9E9E',
      active: '#3f51b5',
      finished: '#3f51b5',
    },

    initialize: function(options) {

      var bar = new Object();

      // Map attributes from options onto bar object.
      // Keep in mind width / height are relative to container width / height.
      bar.container = options.container;
      bar.selected = false;
      bar.highlighted = false;
      bar.relative_positions = {
        x: options.x !== undefined ? options.x : 0,
        y: options.y !== undefined ? options.y : 0,
        width: options.width !== undefined ? options.width : 0,
        height: options.height !== undefined ? options.height : 0,
      };
      bar.value = options.value !== undefined ? options.value : -1;
      bar.width = bar.relative_positions.width * bar.container.clientWidth;
      bar.height = bar.relative_positions.height * bar.container.clientHeight;
      bar.x = bar.relative_positions.x * bar.container.clientWidth;
      bar.y = bar.relative_positions.y;
      bar.padding = bar.width / 10;
      bar.radius = 0;

      // create svg element for snap to draw into for each bar element,
      // style each element and append them to parent container element,
      // then initialize snap on the svg element

      bar.element = document.createElementNS ("http://www.w3.org/2000/svg", "svg");
      bar.element.setAttributeNS(null, "width", '100%');
      bar.element.setAttributeNS(null, "height", '100%');
      bar.element.style.position = 'absolute';
      bar.element.style.overflow = 'visible';

      bar.container.appendChild(bar.element);
      bar.snap = Snap(bar.element);

      /**************************************************************
      * onResize
      *
      * on resize of browser window update bar positions with new
      * clientWidth / clientHeight of container.
      **************************************************************/

      bar.onResize = function() {
        var position = bar.updatePosition();
        this.padding = this.width / 10;

        bar.svg.animate({
          x: position.x,
          y: position.y,
          width: position.width,
          height: position.height
        }, 300);
      };

      bar.swapUpdate = function(updated_x_position) {
        bar.relative_positions.x = updated_x_position;
        var position = bar.updatePosition();
        bar.svg.animate({
          x: position.x,
        }, 300);
      }

      /**************************************************************
      * updatePosition
      *
      * called to update width/height/x/y based off of current
      * clientWidth and clientHeight.
      *
      * To find the relative positions that are used to calculate
      * width / height checkout bar.relative_positions.
      **************************************************************/

      bar.updatePosition = function() {
        bar.width = bar.relative_positions.width * bar.container.clientWidth;
        bar.height = bar.relative_positions.height * bar.container.clientHeight;
        bar.x = bar.relative_positions.x * bar.container.clientWidth;
        bar.y = bar.relative_positions.y;
        return bar._getPosition();
      };


      /**************************************************************
      * _getPosition
      *
      * internal function called to return x, y, width, height taking
      * into account the padding we set around each bar column.
      **************************************************************/

      bar._getPosition = function() {
        return {
          x: this.x + this.padding,
          y: this.y,
          width: this.width - ( this.padding * 2 ),
          height: this.height,
          radius: this.radius
        };
      };


      /**************************************************************
      * Initialization of svg.
      *
      * initialize bar.svg and on the first draw animate the opacity
      * and the width of the bar graph.
      **************************************************************/
      var position = bar._getPosition();

      bar.svg = bar.snap.rect(position.x, position.y, position.width, position.height, position.radius, position.radius);
      bar.svg.attr({
        fill: Bar.colors.normal,
        opacity: 0,
        width: 0,
      });

      bar.svg.animate({ opacity: 1, width: position.width }, 1000);

      return bar;
    }

  };


  return {
    initialize: Bar.initialize,
    colors: Bar.colors
  };
});
