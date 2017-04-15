(function() {
  'use strict';
  module.exports = class Conditions {

    /**
     * Condition (get/set)
     * describes weather conditions, like Cloudy, Clear, Raining, Snowing, etc
     */
    get Condition() {
      return this.condition;
    }
    set Condition(value) {
      this.condition = value;
    }

    /**
     * DegreesFahrenheit (get/set)
     * describes the temperature in degrees Fahrenheit
     */
    get DegreesFahrenheit() {
      return this.degF;
    }
    set DegreesFahrenheit(value) {
      value = Number(value);
      if (!isNaN(value)) {
        this.degF = this.round(value, this.precision);
        this.degC = this.round(((value - 32) * 5 / 9), this.precision);
      }
    }

    /**
     * DegreesCelsius (get/set)
     * describes the temperature in degrees Celsius
     */
    get DegreesCelsius() {
      return this.degC;
    }
    set DegreesCelsius(value) {
      value = Number(value);
      if (!isNaN(value)) {
        this.degC = this.round(value, this.precision);
        this.degF = this.round(((9 / 5 * value) - 32), this.precision);
      }
    }

    /**
     * WindSpeedMph (get/set)
     * describes the wind speed in miles per hour
     */
    get WindSpeedMph() {
      return this.windMph;
    }
    set WindSpeedMph(value) {
      value = Number(value);
      if (!isNaN(value)) {
        this.windMph = this.round(value, this.precision);
        this.windKm = this.round(value * 1.609344, this.precision);
      }
    }

    /**
     * WindSpeedKMH (get/set)
     * describes the wind speed in kilometers per hour
     */
    get WindSpeedKmh() {
      return this.windMph;
    }
    set WindSpeedKmh(value) {
      value = Number(value);
      if (!isNaN(value)) {
        this.windKm = this.round(value, this.precision);
        this.windMph = this.round(value / 1.609344, this.precision);
      }
    }

    /**
     * WindDirSectors
     * An array of directions wind can blow from
     */
    get WindDirSectors() {
      return ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"];
    }

    /**
     * WindDirection (get/set)
     * describes the wind direction in cardinal directions
     */
    get WindDirection() {
      return this.windDir;
    }
    set WindDirection(value) {
      let val = Number(value);
      if (!isNaN(val)) {
        let index = Math.round(((val % 360) / 22.5));
        this.windDir = this.WindDirSectors[index];
      } else {
        this.windDir = value;
      }
    }

    /**
     * PressureMb (get/set)
     * describes the barometric pressure in millibars
     */
    get PressureMb() {
      return this.pressureMb;
    }
    set PressureMb(value) {
      value = Number(value);
      if (!isNaN(value)) {
        this.pressureMb = this.round(value, this.precision);
        this.pressureInHg = this.round(value / 33.863636, this.precision);
      }
    }

    /**
     * PressureInHg (get/set)
     * describes the barometric pressure in inches of mercury
     */
    get PressureInHg() {
      return this.pressureInHg;
    }
    set PressureInHg(value) {
      value = Number(value);
      if (!isNaN(value)) {
        this.pressureInHg = this.round(value, this.precision);
        this.pressureMb = this.round(value * 33.863636, this.precision);
      }
    }

    /**
     * PressureTrend (get/set)
     * describes the barometric pressure trend]
     */
    get PressureTrend() {
      return this.pressureTrend;
    }
    set PressureTrend(value) {
      if (value === "+")
        this.pressureTrend = "Rising";
      else if (value === "0")
        this.pressureTrend = "Steady";
      else if (value === "-")
        this.pressureTrend = "Falling";
      else
        this.pressureTrend = value;
    }

    /**
     * dewpointF (get/set)
     * describes the temperature in degrees Fahrenheit at which the air must be cooled for water vapor to condense
     */
    get DewpointFahrenheit() {
      return this.degF;
    }
    set DewpointFahrenheit(value) {
      value = Number(value);
      if (!isNaN(value)) {
        this.dewpointF = this.round(value, this.precision);
        this.dewpointC = this.round(((value - 32) * 5 / 9), this.precision);
      }
    }

    /**
     * dewpointC (get/set)
     * describes the temperature in degrees Celsius at which the air must be cooled for water vapor to condense
     */
    get DewpointCelsius() {
      return this.dewpointC;
    }
    set DewpointCelsius(value) {
      value = Number(value);
      if (!isNaN(value)) {
        this.dewpointC = this.round(value, this.precision);
        this.dewpointF = this.round(((9 / 5 * value) - 32), this.precision);
      }
    }

    /**
     * visibilityMi (get/set)
     * describes the greatest distance toward the horizon at which prominent objects can be identified in miles
     */
    get VisibilityMi() {
      return this.visibilityMi;
    }
    set VisibilityMi(value) {
      value = Number(value);
      if (!isNaN(value)) {
        this.visibilityMi = this.round(value, this.precision);
        this.visibilityKm = this.round(value * 1.609344, this.precision);
      }
    }

    /**
     * visibilityKm (get/set)
     * describes the greatest distance toward the horizon at which prominent objects can be identified in kilometers
     */
    get VisibilityKm() {
      return this.visibilityKm;
    }
    set VisibilityKm(value) {
      value = Number(value);
      if (!isNaN(value)) {
        this.visibilityKm = this.round(value, this.precision);
        this.visibilityMi = this.round(value / 1.609344, this.precision);
      }
    }

    /**
     * PrecipitationIn (get/set)
     * describes total precipitation today in inches
     */
    get PrecipitationIn() {
      return this.precipitationIn;
    }
    set PrecipitationIn(value) {
      value = Number(value);
      if (!isNaN(value)) {
        this.precipitationIn = this.round(value, this.precision);
        this.precipitationMetric = this.round(value * 25.4, this.precision);
      }
    }

    /**
     * PrecipitationMetric (get/set)
     * describes total precipitation today in millimeters
     */
    get PrecipitationMetric() {
      return this.precipitationMetric;
    }
    set PrecipitationMetric(value) {
      value = Number(value);
      if (!isNaN(value)) {
        this.precipitationMetric = this.round(value, this.precision);
        this.precipitationIn = this.round(value / 25.4, this.precision);
      }
    }

    /**
     * RelativeHumidity (get/set)
     * describes current relative humidity as a percentage
     */
    get RelativeHumidity() {
      return this.relativeHumidity;
    }
    set RelativeHumidity(value) {
      this.relativeHumidity = value;
    }

    /**
     * HeatIndexFahrenheit (get/set)
     * describes the heat index temperature in degrees Fahrenheit
     */
    get HeatIndexFahrenheit() {
      return this.heatIndexF;
    }
    set HeatIndexFahrenheit(value) {
      value = Number(value);
      if (!isNaN(value)) {
        this.heatIndexF = this.round(value, this.precision);
        this.heatIndexC = this.round(((value - 32) * 5 / 9), this.precision);
      }
    }

    /**
     * HeatIndexCelsius (get/set)
     * describes the heat index temperature in degrees Celsius
     */
    get HeatIndexCelsius() {
      return this.heatIndexC;
    }
    set HeatIndexCelsius(value) {
      value = Number(value);
      if (!isNaN(value)) {
        this.heatIndexC = this.round(value, this.precision);
        this.heatIndexF = this.round(((9 / 5 * value) - 32), this.precision);
      }
    }

    /**
     * Precision for rounding function
     */
    get precision() {
      return 3;
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
      this.Condition = resObject.current_observation.weather;
      this.DegreesFahrenheit = resObject.current_observation.temp_f;
      this.WindSpeedMph = resObject.current_observation.wind_mph;
      this.WindDirection = resObject.current_observation.wind_degrees;
      this.PressureMb = resObject.current_observation.pressure_mb;
      this.PressureTrend = resObject.current_observation.pressure_trend;
      this.DewpointFahrenheit = resObject.current_observation.dewpoint_f;
      this.VisibilityMi = resObject.current_observation.visibility_mi;
      this.PrecipitationIn = resObject.current_observation.precip_today_in;
      this.RelativeHumidity = resObject.current_observation.relative_humidity;
      this.HeatIndexFahrenheit = resObject.current_observation.heat_index_f;
      return this;

    }
  };
})();
