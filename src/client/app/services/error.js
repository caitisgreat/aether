const angular = require('angular');
(function() {
  'use strict';

  /**
   * @class ErrorMessage
   * Represents an error message.
   */
  const ErrorMessage = class ErrorMessage {
    /**
     * @constructor
     * @param  {Object} err   the error code
     * @param  {String} msg   the message
     */
    constructor(err, msg) {
      this.error = err;
      this.message = msg;
    }

    /**
     * returns the error message
     */
    get Message() {
      return this.message;
    }

    /**
     * returns the error code
     */
    get Error() {
      return this.error;
    }
  };

  angular.module('aether.services.error', [])
    .factory("ErrorMessageFactory", function() {
      return {
        make: function (err, msg) {
          return new ErrorMessage(err, msg);
        }
      };
    });
})();
