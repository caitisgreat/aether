(function() {
  'use strict';

  /**
   * Class represents an error message with appropirate HTTP response code
   */
  module.exports = class ErrorMessage {
    constructor(code, msg) {
      this.statusCode = code;
      this.message = msg;
    }

    get StatusCode () {
      return this.statusCode;
    }
    set StatusCode (value) {
      this.statusCode = value;
    }

    get Message () {
      return this.message;
    }
    set Message (value) {
      this.message = value;
    }
  };
})();
