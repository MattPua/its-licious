const axios = require('axios');


const yelpLookupUrl = 'https://api.yelp.com/v3/businesses/matches/lookup?';
const yelpBearerToken = 'Bearer 0lD2D12X6OhLJC-qHYC6EA3_kId5eJMAsDowjFFpKt6OzNaqPjhY2tGDomf1K84UYi1dubCiVCmczQSd-AS4x3DGOx-WhUSZST3s6zBSD2wNoV0twrWO-c2b0cNbWnYx';

const yelpBusinessUrl = 'https://api.yelp.com/v3/businesses/';



function getBusinessReviewsById(r) {
  if (r.yelpData.reviews && r.yelpData.reviews.length > 0) return r;
  return axios.get(yelpBusinessUrl + encodeURIComponent(r.yelpData.yelpId) + '/reviews', {
    headers: {
      Authorization: yelpBearerToken
    }
  }).then(function(response) {
    if (response.data) {
      if (!r.yelpData.reviews) r.yelpData.reviews = [];
      for (let review of response.data.reviews) {
        r.yelpData.reviews.push({
          id: review.id,
          text: review.text,
          url: review.url,
          rating: review.rating,
          timeCreated: review.time_created
        });
      }
    }
    else {
      console.error('could not find yelp review data for restaurant: '  + r.lic_name);
    }
    return r;
  }).catch((err) => {
    console.error('failed when retrieving yelp review data for : ' + r.lic_restName);
    return null;
  });
}

function lookupBusinessByYelpId(r) {
  if (r.yelpData.imageUrl && r.yelpData.imageUrl.length > 0) {
    return r;
  }

  return axios.get(yelpBusinessUrl + encodeURIComponent(r.yelpData.yelpId), {
    params: {
      locale: 'en_US'
    },
    headers: {
      Authorization: yelpBearerToken
    }
  }).then(function(response) {
    if (response.data) {
      const data = response.data;
      r.yelpData.imageUrl = data.image_url;
      r.yelpData.photos = data.photos;
      r.yelpData.rating = data.rating;
      r.yelpData.reviewCount = data.review_count;
      r.yelpData.yelpUrl = data.url;
    }
    else {
      console.error('could not find yelp business data for restaurant: '  + r.lic_restName);
    }

    return getBusinessReviewsById(r);
  })
  .catch((err) => {
    console.error(err.data.response);
    console.error('failed when retrieving yelp business information for restaurant: ' + r.lic_restName);
    return null;
  });
}

module.exports.lookupYelpIdByParams =  function(r){
  const yelpParams = {
    name: r.lic_restName,
    city: 'toronto',
    state: 'ON',
    country: 'CA',
    address1: r.lic_address,
    phone: r.lic_phone,
    latitude: r.lic_lat,
    longitude: r.lic_lng,
    postal_code: r.lic_postal,
    locale: 'en_US'
  };

  // if (r.yelpData && r.yelpData.yelpId) return r;

  return axios.get(yelpLookupUrl, {
    params: yelpParams,
    headers: {
      Authorization: yelpBearerToken
    }
  })
  .then(function(response) {
    const data = response.data;
    r.yelpData = {};
    if (data.businesses.length) {
      // Assume the first one is the right one
      // TODO: maybe check against the phone number
      r.yelpData = {
        yelpId: data.businesses[0].id
      }
      // TODO: maybe promises.all here
      return lookupBusinessByYelpId(r);
    }
    else {
      console.error('could not find Yelp ID for restaurant: ' + r.lic_restName);
      return null;
    }
  })
  .catch((err) => {
    console.error(err.message);
    console.error('failed when doing lookup on yelp data for : ' + r.lic_restName);
    return null;
  });
}
