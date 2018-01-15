const sourceData = require('./../src/assets/data/test.json');
const fs = require('fs');
const axios = require('axios');

const yelp = require('./yelp-api');
const google = require('./google-api');
const fileNameToWrite = 'restaurants_with_social_ids.json';
try {

  let promisesArray = [];
  for (let r of sourceData.restaurants) {
    if (!r.yelpData || !r.yelpData.yelpId)
      promisesArray.push(yelp.lookupYelpIdByParams(r));
    // if (!r.googleData || r.googleData.googlePlaceId)
      // promisesArray.push(google.getGooglePlaceIdByParams(r));
  }
  Promise.all(promisesArray).then(() => {

    writeToFile(sourceData);

    // writeToFile(sourceData);
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
