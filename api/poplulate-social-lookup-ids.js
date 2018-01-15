const sourceData = require('./../src/assets/data/winterlicious.json');
const fs = require('fs');
const axios = require('axios');

const yelp = require('./yelp-api');
const google = require('./google-api');
const fileNameToWrite = './../src/assets/data/winterlicious.json';
try {

  let promisesArray = [];
  for (let r of sourceData.restaurants) {
      // promisesArray.push(yelp.lookupYelpIdByParams(r));
      promisesArray.push(google.getGooglePlaceIdByParams(r));
  }
  Promise.all(promisesArray).then(() => {

    writeToFile(sourceData);

    // writeToFile(sourceData);
  }).catch(function(err) {
    console.error(err);
  });

}
catch(ex) {
  console.error(ex);
}

function writeToFile(r) {
  fs.writeFile(fileNameToWrite, JSON.stringify(r), function(err) {
    if (err) console.error(err);
  });
}
