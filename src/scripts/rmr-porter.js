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
    'class': 'rmr-ported'
  };

  // being viewed on a touch device?
  // TOUCH = RMR.Browser.isTouch();

  /**

     @param options {Object} - selectors and callbacks to invoke when the elements corresponding to those selectors
   */
  const Porter = function(options) {

    for (const i in options) {
      if (RMR.Object.has(options, i)) {

        const n = RMR.Node.get(i);
        if (!n) {
          console.error('Invalid porter node', i);
          continue;
        }

        // element has entered the viewport for the first time, invoke callback
        if (! n.classList.contains('rmr-ported')) {
          options[i](n);
          n.classList.add('rmr-ported');
        }

      }
    }
  };

  module.exports = Porter;

})();
