(function() {
  'use strict';

  /**
   * Models
   */

  const ErrorMessage = require('../models/errorMessage.js');

  /**
   * Validation Class
   */

  module.exports = class Validator {
    /* example ruleSet
    [
      {
        rules: ['required', 'pattern(/^\d{5}$/)'],
        name: 'Zip Code'
        value: <value>
      }, ...
    ]
     */

    /**
     * Initialize Validator Class
     * defines rules used in validation
     */
    constructor() {
      this.rules = {
        required: {
          ok: function(value, params) {
            return (typeof value !== 'undefined' && value !== null);
          },
          message: function(name) {
            return `${name} is required.`;
          }
        },
        pattern: {
          ok: function(value, params) {
            if (!Array.isArray(params))
              return false;

            let pattern = new RegExp(params[0]);
            return pattern.test(value);
          },
          message: function(name) {
            return `${name} is invalid.`;
          }
        },
        pass: {
          ok: function(value, params) {
            return true;
          },
          message: function(name) {
            return `${name} can't possibly fail validation, but it did.`;
          }
        }
      };
    }

    /**
     * validator (get)
     * @param  {String} rule    the validation rule to match
     * @return {Object}         the matching validation rule
     */
    validator(rule) {
      if (typeof(rule) === 'string' && rule in this.rules) {
        return this.rules[rule];
      }

      return this.rules.pass;
    }

    /**
     * interpret
     * interprets a set of rules into validation objects
     * @param  {Object} ruleSet={}    the ruleSet provided by the validation source
     * @return {Array}                validation object set
     */
    interpret(ruleSet = []) {
      let validations = [];
      for (let item of ruleSet) {
        // simplify rule checks
        var rules = Array.isArray(item.rules) ? item.rules : [item.rules];
        for (let rule of rules) {
          // capture rule parameters
          let parameters = "";
          if (/\((.*)\)/.test(rule)) {
            parameters = rule.match(/\((.*)\)/)[1].split(',');
            rule = rule.split('(')[0];
          }

          // collect data to validate
          validations.push({
            name: item.name,
            value: item.value ? item.value : null,
            check: this.validator(rule),
            ruleName: rule,
            ruleParams: parameters
          });
        }
      }
      return validations;
    }

    /**
     * validate
     * validates a given set of rules using Promises
     * @param  {Array} ruleSet   the ruleSet provided by the validation source
     * @return {Promise}         [description]
     */
    validate(ruleSet) {
      // interpret ruleSet
      ruleSet = this.interpret(ruleSet);

      // use promises to handle validation rules
      let rulePromises = ruleSet.map(function(item) {
        let result = item.check.ok(item.value, item.ruleParams);
        let message = item.check.message(item.name);

        // validation rules can be promises
        // therefore check for .then() method as defined by promises spec
        // otherwise generate new promise on the fly from result value
        if (result.then) {
          return result;
        } else {
          return new Promise((resolve, reject) => {
            if (result) {
              resolve();
            } else {
              reject(new ErrorMessage(400, message));
            }
          });
        }
      });
      return Promise.all(rulePromises);
    }
  };
})();
