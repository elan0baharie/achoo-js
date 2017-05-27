var Search = require('./../js/getDoctors.js').getDoctors;


$(document).ready(function(){
  $('#searchForm').submit(function(e){
    e.preventDefault();
    var medicalIssue = $('#userTxt').val();
    var newSearch = new Search();
    newSearch.getDoctors(medicalIssue);
  });
})
