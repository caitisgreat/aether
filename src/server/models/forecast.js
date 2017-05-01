(function() {
  'use strict';
  module.exports = class Forecast {
    /**
     * Period
     * describes the current forecast period
     */
    get Period() {
      return this.period;
    }
    set Period(value) {
      this.period = value;
    }

    /**
     * HighFahrenheit (get/set)
     * describes temperature ceiling in degrees Fahrenheit
     */
    get HighFahrenheit() {
      return this.highF;
    }
    set HighFahrenheit(value) {
      value = Number(value);
      if (!isNaN(value)) {
        this.highF = this.round(value, this.precision);
        this.highC = this.round(((value - 32) * 5 / 9), this.precision);
      }
    }

    /**
     * LowFahrenheit (get/set)
     * describes temperature floor in degrees Fahrenheit
     */
    get LowFahrenheit() {
      return this.lowF;
    }
    set LowFahrenheit(value) {
      value = Number(value);
      if (!isNaN(value)) {
        this.lowF = this.round(value, this.precision);
        this.lowC = this.round(((value - 32) * 5 / 9), this.precision);
      }
    }

    /**
     * HighCelsius (get/set)
     * describes temperature ceiling in degrees Celsius
     */
    get HighCelsius() {
      return this.highF;
    }
    set HighCelsius(value) {
      value = Number(value);
      if (!isNaN(value)) {
        this.highC = this.round(value, this.precision);
        this.highF = this.round(((9 / 5 * value) - 32), this.precision);
      }
    }

    /**
     * LowCelsius (get/set)
     * describes temperature floor in degrees Celsius
     */
    get LowCelsius() {
      return this.lowC;
    }
    set LowCelsius(value) {
      value = Number(value);
      if (!isNaN(value)) {
        this.lowC = this.round(value, this.precision);
        this.lowF = this.round(((9 / 5 * value) - 32), this.precision);
      }
    }

    /**
     * Condition (get/set)
     * describes forecasted weather condition, like Cloudy, Clear, Raining, Snowing, etc
     */
    get Condition() {
      return this.condition;
    }
    set Condition(value) {
      this.condition = value;
    }

    /**
     * AvrWindSpeedMph (get/set)
     * describes the forecasted average wind speed in miles per hour
     */
    get AvrWindSpeedMph() {
      return this.avrWindMph;
    }
    set AvrWindSpeedMph(value) {
      value = Number(value);
      if (!isNaN(value)) {
        this.avrWindMph = this.round(value, this.precision);
        this.avrWindKm = this.round(value * 1.609344, this.precision);
      }
    }

    /**
     * AvrWindSpeedKMH (get/set)
     * describes the forecasted average wind speed in kilometers per hour
     */
    get AvrWindSpeedKmh() {
      return this.avrWindKm;
    }
    set AvrWindSpeedKmh(value) {
      value = Number(value);
      if (!isNaN(value)) {
        this.avrWindKm = this.round(value, this.precision);
        this.avrWindMph = this.round(value / 1.609344, this.precision);
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
     * AvrWindDirection (get/set)
     * describes the forecasted average wind direction in cardinal directions
     */
    get AvrWindDirection() {
      return this.avrWindDir;
    }
    set AvrWindDirection(value) {
      let val = Number(value);
      if (!isNaN(val)) {
        let index = Math.round(((val % 360) / 22.5));
        this.avrWindDir = this.WindDirSectors[index];
      } else {
        this.avrWindDir = value;
      }
    }

    /**
     * ProbabilityOfPrecipitation
     * describes the forecasted chance for precipitation as a percentage
     */
    get ProbabilityOfPrecipitation() {
      return this.probOfPrecipitation;
    }
    set ProbabilityOfPrecipitation(value) {
      value = Number(value);
      if (!isNaN(value)) {
        this.probOfPrecipitation = value;
      }
    }

    /**
     * PrecipitationForecastIn
     * describes the quantitative total precipitation forecast in inches
     */
    get PrecipitationForecastIn() {
      return this.precipitationIn;
    }
    set PrecipitationForecastIn(value) {
      value = Number(value);
      if (!isNaN(value)) {
        this.precipitationIn = this.round(value, this.precision);
        this.precipitationMetric = this.round(value * 25.4, this.precision);
      }
    }

    /**
     * PrecipitationForecastMetric
     * describes the quantitative total precipitation forecast  in millimeters
     */
    get PrecipitationForecastMetric() {
      return this.precipitationMetric;
    }
    set PrecipitationForecastMetric(value) {
      value = Number(value);
      if (!isNaN(value)) {
        this.precipitationMetric = this.round(value, this.precision);
        this.precipitationIn = this.round(value / 25.4, this.precision);
      }
    }

    /**
     * SnowForecastIn
     * describes the forecasted snow accumulation in inches
     */
    get SnowForecastIn() {
      return this.snowIn;
    }
    set SnowForecastIn(value) {
      value = Number(value);
      if (!isNaN(value)) {
        this.snowIn = this.round(value, this.precision);
        this.snowMetric = this.round(value * 25.4, this.precision);
      }
    }

    /**
     * SnowForecastMetric
     * describes the forecasted snow accumulation in millimeters
     */
    get SnowForecastMetric() {
      return this.snowMetric;
    }
    set SnowForecastMetric(value) {
      value = Number(value);
      if (!isNaN(value)) {
        this.snowMetric = this.round(value, this.precision);
        this.snowIn = this.round(value / 25.4, this.precision);
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

    // { forecast: { simpleforecast: { forecastday: [{<resObject>}] } } }
    fromWunderground(resObject) {
      this.Period = resObject.period;
      this.HighFahrenheit = resObject.high.fahrenheit;
      this.LowFahrenheit = resObject.low.fahrenheit;
      this.Condition = resObject.conditions;
      this.AvrWindSpeedMph = resObject.avewind.mph;
      this.AvrWindDirection = resObject.avewind.degrees;
      this.ProbabilityOfPrecipitation = resObject.pop;
      this.PrecipitationForecastIn = resObject.qpf_allday.in;
      this.SnowForecastIn = resObject.snow_allday.in;
      return this;
    }
  };
})();
