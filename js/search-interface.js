var Search = require('./../js/user-search.js').searchModule;
var apiKey = require('./../.env').apiKey;

$(document).ready(function(){
  $('#searchForm').submit(function(e){
    e.preventDefault();
    var medicalIssue = $('#userTxt').val();

      $.get('https://api.betterdoctor.com/2016-03-01/doctors?query='+ medicalIssue+'&location=45.5231%2C-122.6765%2C%205&user_location=45.5231%2C-122.6765&skip=0&limit=20&user_key=' + apiKey, function(result) {
        console.log(JSON.stringify(result));
      });





  });
})
