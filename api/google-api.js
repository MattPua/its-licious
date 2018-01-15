const axios = require('axios');
const googleApiKey ='AIzaSyCZppcuiAk4bP42xVWMCLmaZ4Why51j3Oc';
const googleLookupUrl = 'https://maps.googleapis.com/maps/api/place/textsearch/json?';



module.exports.getGooglePlaceIdByParams = function(r) {
  const googleParams = {
    key: googleApiKey,
    location: r.lic_lat + ',' + r.lic_lng,
    radius: 10000,
    query: r.lic_restName,
    name: r.lic_restName,
  }
  return axios.get(googleLookupUrl, {
    params: googleParams
  })
  .then(function(response) {
    const data = response.data;
    if (data.results.length) {
      // Assume that the first result matches is correct
      r.googleData = {
        googlePlaceId: data.results[0].place_id
      }
      return r;
    }
    else {
      console.error('could not find google Place ID for restaurant: ' + r.lic_restName);
      return null;
    }
  });
}
