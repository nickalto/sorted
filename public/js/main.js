
'use strict';

require.config({
  'baseUrl': '/public/js/',
  'paths': {
    'snap'       : 'dependencies/snap.svg',
    'bar'        : 'bar',
    'graph'      : 'graph',
    'mergesort'  : 'mergesort'
  },
  'shim': {}
});


require(['graph'], function( Graph ) {

  Graph.initialize('container', {length: 27, algorithm: 'mergesort', clock_cycle: 400 });

});
