(function() {
  'use strict';

  /**
   * Class represents an error message with appropirate HTTP response code
   */
  module.exports = class ErrorMessage {
    constructor(statusCode, message) {
      this._statusCode = statusCode;
      this._message = message;
    }

    get statusCode () {
      return this._statusCode;
    }
    set statusCode (value) {
      this._statusCode = value;
    }

    get message () {
      return this._message;
    }
    set message (value) {
      this._message = value;
    }    
  };
})();
