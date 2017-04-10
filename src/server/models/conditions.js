module.exports = class Conditions {
  constructor () {
    this.windDirSectors =
      ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW","N"];
  }

/**
 * condition (get/set)
 * describes weather conditions, like Cloudy, Clear, Raining, Snowing, etc
 */
  get condition() {
    return this.condition;
  }
  set condition (value) {
    this.condition = value;
  }

/**
 * degF (get/set)
 * describes the temperature in degrees Fahrenheit
 */
  get degF() {
    return this.degF;
  }
  set degF(value) {
    value = Number(value);
    if(!isNaN(value)) {
      this.degF = value;
      this.degC = ((value - 32) * 5 / 9);
    }
  }

/**
 * degC (get/set)
 * describes the temperature in degrees Celsius
 */
  get degC() {
    return this.degC;
  }
  set degC(value) {
    value = Number(value);
    if(!isNaN(value)) {
      this.degC = value;
      this.degF = ((9 / 5 * value) - 32);
    }
  }

/**
 * windMph (get/set)
 * describes the wind speed in miles per hour
 */
  get windMph() {
    return this.windMph;
  }
  set windMph(value) {
    value = Number(value);
    if(!isNaN(value)) {
      this.windMph = value;
      this.windKm = (value * 1.609344);
    }
  }

/**
 * windKm (get/set)
 * describes the wind speed in kilometers per hour
 */
  get windKm() {
    return this.windMph;
  }
  set windKm(value) {
    value = Number(value);
    if(!isNaN(value)) {
      this.windKm = value;
      this.windMph = (value / 1.609344);
    }
  }

/**
 * windDir (get/set)
 * describes the wind direction in cardinal directions
 */
  get windDir() {
    return this.windDir;
  }
  set windDir(value) {
    let val = Number(value);
    if(!isNaN(val)) {
      let index = Math.round(((val % 360) / 22.5));
      this.windDir = windDirSectors[index];
    }
    else {
      this.windDir = value;
    }
  }

/**
 * pressureMb (get/set)
 * describes the barometric pressure in millibars
 */
  get pressureMb() {
    return this.pressureMb;
  }
  set pressureMb(value) {
    value = Number(value);
    if (!isNaN(value)) {
      this.pressureMb = value;
      this.pressureInHg = Math.floor(value / 33.863636);
    }
  }

/**
 * pressureInHg (get/set)
 * describes the barometric pressure in inches of mercury
 */
  get pressureInHg() {
    return this.pressureInHg;
  }
  set pressureInHg(value) {
    value = Number(value);
    if(!isNaN(value)) {
      this.pressureInHg = value;
      this.pressureMb = Math.floor(value * 33.863636);
    }
  }

/**
 * pressureTrend (get/set)
 * describes the barometric pressure trend]
 */
  get pressureTrend() {
  return this.pressureTrend;
}
  set pressureTrend(value) {
  this.pressureTrend = value;
}

/**
 * dewpointF (get/set)
 * describes the temperature in degrees Fahrenheit at which the air must be cooled for water vapor to condense
 */
  get dewpointF() {
    return this.degF;
  }
  set dewpointF(value) {
    value = Number(value);
    if(!isNaN(value)) {
      this.dewpointF = value;
      this.dewpointC = ((value - 32) * 5 / 9);
    }
  }

/**
 * dewpointC (get/set)
 * describes the temperature in degrees Celsius at which the air must be cooled for water vapor to condense
 */
  get dewpointC() {
    return this.dewpointC;
  }
  set dewpointC(value) {
    value = Number(value);
    if(!isNaN(value)) {
      this.dewpointC = value;
      this.dewpointF = ((9 / 5 * value) - 32);
    }
  }

/**
 * visibilityMi (get/set)
 * describes the greatest distance toward the horizon at which prominent objects can be identified in miles
 */
  get visibilityMi() {
    return this.visibilityMi;
  }
  set visibilityMi(value) {
    value = Number(value);
    if(!isNaN(value)) {
      this.visibilityMi = value;
      this.visibilityKm = value * 1.609344;
    }
  }

/**
 * visibilityKm (get/set)
 * describes the greatest distance toward the horizon at which prominent objects can be identified in kilometers
 */
  get visibilityKm() {
    return this.visibilityKm;
  }
  set visibilityKm(value) {
    value = Number(value);
    if(!isNaN(value)) {
      this.visibilityKm = value;
      this.visibilityMi = value / 1.609344;
    }
  }

/**
 * precipitationIn (get/set)
 * describes total precipitation today in inches
 */
  get precipitationIn () {
    return this.precipitationIn;
  }
  set precipitationIn (value) {
    value = Number(value);
    if(!isNaN(value)) {
      this.precipitationIn = value;
      this.precipitationMetric = value * 25.4;
    }
  }

/**
 * precipitationMetric (get/set)
 * describes total precipitation today in millimeters
 */
  get precipitationMetric () {
    return this.precipitationMetric;
  }
  set precipitationMetric (value) {
    value = Number(value);
    if(!isNaN(value)) {
      this.precipitationMetric = value;
      this.precipitationIn = value / 25.4;
    }
  }

  fromWunderground(resObject) {
    condition = ('weather' in resObject) ? resObject.weather : null;
    degF = ('temp_f' in resObject) ? resObject.temp_f : null;
    windMph = ('wind_mph' in resObject) ? resObject.wind_mph : null;
    windDir = ('wind_dir' in resObject) ? resObject.wind_dir : null;
    pressureMb = ('pressure_mb' in resObject) ? resObject.pressure_mb : null;
    pressureTrend = ('pressure_trend' in resObject) ? resObject.pressure_trend : null;
    dewpointF = ('dewpoint_f' in resObject) ? resObject.dewpoint_f : null;
    visibilityMi = ('visibility_mi' in resObject) ? resObject.visibility_mi : null;
    precipitationIn = ('precip_today_in' in resObject) ? resObject.precip_today_in : null;
  }
};
