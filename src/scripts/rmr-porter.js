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

  // being viewed on a touch device?
  TOUCH = RMR.Browser.isTouch();

  /**

     @param options {Object} - 
 
   */
  const Porter = function(options) {

    for (const i in options) {
      if (RMR.Object.has(options, i)) {

        const n = RMR.Node.get(i);
        if (!n) {
          console.error('Invalid node in porter', i);
          continue;
        }
        options[i](n);
      }
    }
  };

  module.exports = Porter;

})();
