var apiKey = require('./../.env').apiKey;

exports.getDoctors = function(medicalIssue) {
  $.get('https://api.betterdoctor.com/2016-03-01/doctors?query='+ medicalIssue+'&location=45.5231%2C-122.6765%2C%205&user_location=45.5231%2C-122.6765&skip=0&limit=20&user_key=' + apiKey)
   .then(function(result) {
      console.log(JSON.stringify(result['data']));
      $('#resultTxt').text(JSON.stringify(result['data']));
    })
   .fail(function(error){
      $('#errorTxt').text(error.responseJSON.message);
    });
};
