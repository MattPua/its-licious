const axios = require('axios');
const googleApiKey ='AIzaSyCZppcuiAk4bP42xVWMCLmaZ4Why51j3Oc';
const googleLookupUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
const googleTextSearchUrl = 'https://maps.googleapis.com/maps/api/place/textsearch/json?';
const googlePlaceDetailsUrl = 'https://maps.googleapis.com/maps/api/place/details/json?'



// TODO: future, maybe use Google Place photos to get pictures

function getGooglePlaceDetailsById(r) {
  const googleParams = {
    key: googleApiKey,
    placeid: r.googleData.googlePlaceId
  };

  return axios.get(googlePlaceDetailsUrl, {
    params: googleParams
  }).then((response) => {
    if (response.data) {
      const data = response.data.result;
      if (!r.googleData.reviews) r.googleData.reviews = [];
      r.googleData.url = data.url;
      r.googleData.rating = data.rating;
      if (data.reviews) {
        for(let review of data.reviews) {
          r.googleData.reviews.push({
            authorUrl: review.author_url,
            rating: review.rating,
            time: review.time,
            text: review.text
          });
        }
      }
    }
    else {
      console.error('failed to find google places information for restaurant: ' + r.lic_restName);
    }
    return r;
  }).catch((err) => {
    console.error('failed to retrieve google places information for restaurant: ' + r.lic_restName);
    return null;
  });
}


/**
 * Note this function is 10x more expensive in quota than regular nearby search
 * @param {} r
 */
 function getGooglePlaceIdByParamsViaTextSearch(r) {
  const googleParams = {
    key: googleApiKey,
    location: r.lic_lat + ',' + r.lic_lng,
    radius: 1000,
    query: r.lic_restName
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
      return getGooglePlaceDetailsById(r);
    }
    else {
      console.error('failed to find a text lookup for google places for restaurant: '  + r.lic_restName);
      return null;
    }
  }).catch((err) => {
    console.error('failed to do text lookup for google places for restaurant: '  + r.lic_restName);
    return null;
  });
}



module.exports.getGooglePlaceIdByParams = function(r) {
    if (r.googleData && r.googleData.googlePlaceId) {
      if (!r.googleData.rating) return getGooglePlaceDetailsById(r);
      else return;
    }
    const googleParams = {
      key: googleApiKey,
      location: r.lic_lat + ',' + r.lic_lng,
      radius: 1000,
      keyword: decodeURIComponent(r.lic_restName),
      name: decodeURIComponent(r.lic_restName)
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
        return getGooglePlaceDetailsById(r);
      }
      else {
        console.error('Couldnt find: '  + r.lic_restName + ' via regular nearby search. Trying text search');
        return getGooglePlaceIdByParamsViaTextSearch(r);
      }
    }).catch((err) => {
      console.error(err);
      console.error('failed to do lookup for google places for restaurant: '  + r.lic_restName);
      return null;
    });
}
