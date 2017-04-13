(function() {
  'use strict';
  module.exports = class Conditions {
    constructor() {
      this._precision = 3;
      this._windDirSectors = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"];
    }

    /**
     * condition (get/set)
     * describes weather conditions, like Cloudy, Clear, Raining, Snowing, etc
     */
    get condition() {
      return this._condition;
    }
    set condition(value) {
      this._condition = value;
    }

    /**
     * degF (get/set)
     * describes the temperature in degrees Fahrenheit
     */
    get degF() {
      return this._degF;
    }
    set degF(value) {
      value = Number(value);
      if (!isNaN(value)) {
        this._degF = this.round(value, this._precision);
        this._degC = this.round(((value - 32) * 5 / 9), this._precision);
      }
    }

    /**
     * degC (get/set)
     * describes the temperature in degrees Celsius
     */
    get degC() {
      return this._degC;
    }
    set degC(value) {
      value = Number(value);
      if (!isNaN(value)) {
        this._degC = this.round(value, this._precision);
        this._degF = this.round(((9 / 5 * value) - 32), this._precision);
      }
    }

    /**
     * windMph (get/set)
     * describes the wind speed in miles per hour
     */
    get windMph() {
      return this._windMph;
    }
    set windMph(value) {
      value = Number(value);
      if (!isNaN(value)) {
        this._windMph = this.round(value, this._precision);
        this._windKm = this.round(value * 1.609344, this._precision);
      }
    }

    /**
     * windKm (get/set)
     * describes the wind speed in kilometers per hour
     */
    get windKm() {
      return this._windMph;
    }
    set windKm(value) {
      value = Number(value);
      if (!isNaN(value)) {
        this._windKm = this.round(value, this._precision);
        this._windMph = this.round(value / 1.609344, this._precision);
      }
    }

    /**
     * windDir (get/set)
     * describes the wind direction in cardinal directions
     */
    get windDir() {
      return this._windDir;
    }
    set windDir(value) {
      let val = Number(value);
      if (!isNaN(val)) {
        let index = Math.round(((val % 360) / 22.5));
        this._windDir = this._windDirSectors[index];
      } else {
        this._windDir = value;
      }
    }

    /**
     * pressureMb (get/set)
     * describes the barometric pressure in millibars
     */
    get pressureMb() {
      return this._pressureMb;
    }
    set pressureMb(value) {
      value = Number(value);
      if (!isNaN(value)) {
        this._pressureMb = this.round(value, this._precision);
        this._pressureInHg = this.round(value / 33.863636, this._precision);
      }
    }

    /**
     * pressureInHg (get/set)
     * describes the barometric pressure in inches of mercury
     */
    get pressureInHg() {
      return this._pressureInHg;
    }
    set pressureInHg(value) {
      value = Number(value);
      if (!isNaN(value)) {
        this._pressureInHg = this.round(value, this._precision);
        this._pressureMb = this.round(value * 33.863636, this._precision);
      }
    }

    /**
     * pressureTrend (get/set)
     * describes the barometric pressure trend]
     */
    get pressureTrend() {
      return this._pressureTrend;
    }
    set pressureTrend(value) {
      this._pressureTrend = value;
    }

    /**
     * dewpointF (get/set)
     * describes the temperature in degrees Fahrenheit at which the air must be cooled for water vapor to condense
     */
    get dewpointF() {
      return this._degF;
    }
    set dewpointF(value) {
      value = Number(value);
      if (!isNaN(value)) {
        this._dewpointF = this.round(value, this._precision);
        this._dewpointC = this.round(((value - 32) * 5 / 9), this._precision);
      }
    }

    /**
     * dewpointC (get/set)
     * describes the temperature in degrees Celsius at which the air must be cooled for water vapor to condense
     */
    get dewpointC() {
      return this._dewpointC;
    }
    set dewpointC(value) {
      value = Number(value);
      if (!isNaN(value)) {
        this._dewpointC = this.round(value, this._precision);
        this._dewpointF = this.round(((9 / 5 * value) - 32), this._precision);
      }
    }

    /**
     * visibilityMi (get/set)
     * describes the greatest distance toward the horizon at which prominent objects can be identified in miles
     */
    get visibilityMi() {
      return this._visibilityMi;
    }
    set visibilityMi(value) {
      value = Number(value);
      if (!isNaN(value)) {
        this._visibilityMi = this.round(value, this._precision);
        this._visibilityKm = this.round(value * 1.609344, this._precision);
      }
    }

    /**
     * visibilityKm (get/set)
     * describes the greatest distance toward the horizon at which prominent objects can be identified in kilometers
     */
    get visibilityKm() {
      return this._visibilityKm;
    }
    set visibilityKm(value) {
      value = Number(value);
      if (!isNaN(value)) {
        this._visibilityKm = this.round(value, this._precision);
        this._visibilityMi = this.round(value / 1.609344, this._precision);
      }
    }

    /**
     * precipitationIn (get/set)
     * describes total precipitation today in inches
     */
    get precipitationIn() {
      return this._precipitationIn;
    }
    set precipitationIn(value) {
      value = Number(value);
      if (!isNaN(value)) {
        this._precipitationIn = this.round(value, this._precision);
        this._precipitationMetric = this.round(value * 25.4, this._precision);
      }
    }

    /**
     * precipitationMetric (get/set)
     * describes total precipitation today in millimeters
     */
    get precipitationMetric() {
      return this._precipitationMetric;
    }
    set precipitationMetric(value) {
      value = Number(value);
      if (!isNaN(value)) {
        this._precipitationMetric = this.round(value, this._precision);
        this._precipitationIn = this.round(value / 25.4, this._precision);
      }
    }

    /**
     * round
     * rounds numeric values to a specified precision
     * @param  {Number} value     the number to be rounded
     * @param  {Number} precision the precision to round to
     * @return {Number}           the number rounded to the desired precision
     * @throws {CannotDivideByZero}           precision cannot be zero
     * @throws {ValueInvalidNumber}           value is not a number
     * @throws {PrecisionInvalidNumber}       precision is not a number
     */
    round(value, precision) {
      try {
        if (precision === 0)
          throw "precision cannot be zero";

        value = Number(value);
        if (isNaN(value))
          throw "value is not a number";

        precision = Number(precision);
        if (isNaN(precision))
          throw "precision is not a number";

        let f = Math.pow(10, precision);
        return Math.round(value * f) / f;
      } catch (e) {
        console.error(e.message);
      }
    }

    fromWunderground(resObject) {
      this.condition = resObject.current_observation.weather;
      this.degF = resObject.current_observation.temp_f;
      this.windMph = resObject.current_observation.wind_mph;
      this.windDir = resObject.current_observation.wind_degrees;
      this.pressureMb = resObject.current_observation.pressure_mb;
      this.pressureTrend = resObject.current_observation.pressure_trend;
      this.dewpointF = resObject.current_observation.dewpoint_f;
      this.visibilityMi = resObject.current_observation.visibility_mi;
      this.precipitationIn = resObject.current_observation.precip_today_in;
    }
  };
})();
