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
    heightOffset: 0,
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
  const Porter = function(args, options) {

    const
    elements = args,
    viewChange = function() {

      // number of elements that still need to be 
      let unportedCount = 0;
      for (const i in elements) {
        if (! RMR.Object.has(elements, i)) {
          continue;
        }

        const nodes = RMR.Node.getAll(i);
        if (! nodes.length) {
          delete elements[i];
          console.error('Invalid porter selector', i);
          continue;
        }

        nodes.map((n) => {
          if (! n.getAttribute(ATTRS.attr)) {
            // element has entered the viewport for the first time, invoke callback & set data attribute
            if (inView(n)) {
              elements[i](n);
              n.setAttribute(ATTRS.attr, true);

            // if it's not in view then make note 
            } else {
              unportedCount++;
            }
          }
        });
      }

      // if all elements of interest have been ported then remove listeners
      if (unportedCount == 0) {
        if (RMR.Object.has(options, 'ancestor') && options.ancestor) {
          RMR.Node.get(options.ancestor).removeEventListener('scroll', viewChange, false); 
        }
        window.removeEventListener('scroll', viewChange, false);
        window.removeEventListener('resize', viewChange, false);
      } 
    };

    if (RMR.Object.has(options, 'ancestor') && options.ancestor) {
      const ancestor = RMR.Node.get(options.ancestor);
      if (! ancestor) {
        console.warn('Invalid ancestor provided for `rmr-porter`: `' + options.ancestor + '`');
      }
      ancestor.addEventListener('scroll', viewChange, false); 
    }
    window.addEventListener('scroll', viewChange, false); 
    window.addEventListener('resize', viewChange, false);

    for (const i in elements) {
      if (! RMR.Object.has(elements, i)) {
        continue;
      }

      const nodes = RMR.Node.getAll(i);
      if (! nodes.length) {
        delete elements[i];
        console.error('Invalid porter selector', i);
        continue;
      }

      nodes.map((n) => {

        if (document.body.classList.contains('rmr-load')) {
          if (inView(n)) {
            elements[i](n);
            n.setAttribute(ATTRS.attr, true);
          }
        } else {
          window.addEventListener('load', (function(key, node) {
            if (inView(node)) {
              elements[key](node);
              node.setAttribute(ATTRS.attr, true);
            }
          })(i,n), false );
        }

      });
    }
  };

  Porter.prototype.toString = function() {
    return '🧲 Porter';
  };

  module.exports = Porter;

})();
