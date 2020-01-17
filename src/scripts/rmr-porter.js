/* global  */


/*
 * rmr-porter
 * © 2020 David Miller
 * https://readmeansrun.com
 */

(() => {

  'use strict';

  const
  RMR = require('rmr-util'),
  ATTRS = {
    heightOffset: 200,
    attr: 'data-rmr-ported'
  },
  inView = function(elem) {

    const rect = elem.getBoundingClientRect();

    // true if any of the following conditions are met:
    return(
      // top is in view: the top is more than 0 and less than the window height (the top of the element is in view)
      ( (rect.top + ATTRS.heightOffset) >= 0 && (rect.top + ATTRS.heightOffset) <= window.innerHeight ) || 
      // bottom is in view: bottom position is greater than 0 and greater than the window height
      ( (rect.bottom + ATTRS.heightOffset) >= 0 && (rect.bottom + ATTRS.heightOffset) <= window.innerHeight ) ||
      // top is above the viewport and the bottom is below the viewport
      ( (rect.top + ATTRS.heightOffset) < 0 && (rect.bottom + ATTRS.heightOffset) > window.innerHeight )
    );
  };

  /**

     @param options {Object} - selector/callback pairs to invoke when the elements corresponding to the selectors enter the viewport
   */
  const Porter = function(args) {

    const
      elements = args,
      self = this;
    let nodes = [];

    const viewChange = function() {

      for (const i in elements) {
        if (! RMR.Object.has(elements, i)) {
          continue;
        }

        nodes = RMR.Node.getAll(i);
        if (! nodes.length) {
          delete elements[i];
          console.error('Invalid porter selector', i);
          continue;
        }

        nodes.map((n) => {
          if (! n.getAttribute(ATTRS.attr)) {
            // element has entered the viewport for the first time, invoke callback
            if (inView(n)) {
              elements[i](n);
              n.setAttribute(ATTRS.attr, true);
            }
          }
        });
      }
    };

    addEventListener('scroll', viewChange, false); 
    addEventListener('resize', viewChange, false);

    for (const i in elements) {
      if (! RMR.Object.has(elements, i)) {
        continue;
      }

      nodes = RMR.Node.getAll(i);
      if (! nodes.length) {
        delete elements[i];
        console.error('Invalid porter selector', i);
        continue;
      }

      nodes.map((n) => {

        addEventListener('load', (function(key, node) {

          if (inView(node)) {
            elements[key](node);
            node.setAttribute(ATTRS.attr, true);
          }
        })(i,n), false );

      });
    }
  };

  Porter.prototype.toString = function() {
    return '🧲 Porter';
  };

  module.exports = Porter;

})();
