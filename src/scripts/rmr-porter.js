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
    console.log(options);
  };

  module.exports = Porter;

})();
