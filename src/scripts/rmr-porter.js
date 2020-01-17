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
    attr: 'data-rmr-ported'
  };

  // being viewed on a touch device?
  // TOUCH = RMR.Browser.isTouch();

  /**

     @param options {Object} - selector/callback pairs to invoke when the elements corresponding to the selectors enter the viewport
   */
  const Porter = function(options) {

    for (const i in options) {
      if (RMR.Object.has(options, i)) {

        const nodes = RMR.Node.getAll(i);
        if (! nodes.length) {
          console.error('Invalid porter selector', i);
          continue;
        }

        nodes.map((n) => {

          // element has entered the viewport for the first time, invoke callback
          if (! n.getAttribute(ATTRS.attr)) {
            options[i](n);
            n.setAttribute(ATTRS.attr, true);
          }
        });
      }
    }
  };

  module.exports = Porter;

})();
