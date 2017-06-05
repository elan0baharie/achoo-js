var Search = require('./../js/getDoctors.js').getDoctors;

var printList = function(docArray) {

  $('#result2Txt').text("");
  docArray.forEach(function(doc){
    console.log(doc);
    $('#result2Txt').append("<img class='border' src='" + doc.picture + "'></img>");
    $('#result2Txt').append("<h4>" + doc.firstName + " " + doc.lastName + "</h4>");
    $('#result2Txt').append("<h5>Address:</h5>");
    $('#result2Txt').append("<li class='address'>" + doc.address.street + ",<br>" + doc.address.city + ", " + doc.address.state + ", " + doc.address.zip +  "</li>");
    $('#result2Txt').append("<h5>Biography:</h5>");
    $('#result2Txt').append("<li class='bio'>" + doc.bio +  "</li><hr>");
  });
};

$(document).ready(function(){
  $('#searchForm').submit(function(event){
    event.preventDefault();
    var medicalIssue = $('#userTxt').val();
    var newSearch = new Search();
    newSearch.getDoctors(medicalIssue, printList);
  });
});
