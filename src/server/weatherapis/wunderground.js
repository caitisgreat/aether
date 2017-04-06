var http = require('http');
var bl = require('bl');
var config  

module.exports.getConditions = (zipcode) => {
  return new Promise((resolve, reject) => {
    debugger;
    if(!/^\d{5}$/.test(zipcode)){
      reject("Invalid zipcode");
    }
    else{
      const url = `http://api.wunderground.com/api/b63c518dd881ef89/conditions/q/${zipcode}.json`;
      http.get(url,(res) => {
        res.pipe(bl((err, data) => {
          try{
            let parsedData = JSON.parse(data);
            if(parsedData.response.error){
              let errorMessage = parsedData.response.error.description;
              reject(errorMessage) 
            }
            else{
              resolve(parsedData);
            }
          } catch(e){
            reject(e);
          }
        }));
      });
    }
  });
}
