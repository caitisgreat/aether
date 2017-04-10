/**
 * Class represents an error message with appropirate HTTP response code
 */
module.exports = class ErrorMessage {
  constructor(statusCode, message){
    this.statusCode = statusCode;
    this.message= message;
  }
};
