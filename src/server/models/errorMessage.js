'use strict';

/**
 * Class represents an error message with appropirate HTTP response code
 */
module.exports = class errorMessage {
  constructor(statusCode, message){
    this.statusCode = statusCode;
    this.message= message;
  }
};
