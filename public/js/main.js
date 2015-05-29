
'use strict';

require.config({
  'baseUrl': '/public/js/',
  'paths': {
    'snap'       : 'dependencies/snap.svg',
    'bar'        : 'bar',
    'button'     : 'button',
    'actionPanel': 'action-panel',
    'graphPanel' : 'graph-panel',
    'list'       : 'list',
    'graph'      : 'graph',
    'mergesort'  : 'mergesort'
  },
  'shim': {}
});


require(['graph'], function( Graph ) {

  Graph.initialize('mergesort-card', {length: 20, algorithm: 'Merge Sort', clock_cycle: 400 });

});
