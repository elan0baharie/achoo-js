(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "9e08fa12e79745b8b243b4d89f2e0838"

},{}],2:[function(require,module,exports){
var apiKey = require('./../.env').apiKey;

function Doctors (firstName, lastName, picture, bio, address){
  this.firstName = firstName;
  this.lastName = lastName;
  this.picture = picture;
  this.bio = bio;
  this.address = address;
}

arrayBuild = function(arr){
  console.log(arr.data.length);
  var doctorList = [];
  var doctorArray = arr.data;

  for(var i = 0; i < arr.data.length; i++) {
    var doctor = doctorArray[i];
    var address;
    console.log(JSON.stringify(doctor));
    var firstName = doctor.profile.first_name;
    var lastName = doctor.profile.last_name;
    var bio = doctor.profile.bio;
    var picture = doctor.profile.image_url;
    console.log(doctor.practices.length);
    if(doctor.practices.length > 0) {
      for(var j = 0; j < doctor.practices.length;  j++) {
        var street = doctor.practices[j].visit_address.street;
        var city = doctor.practices[j].visit_address.city;
        var state = doctor.practices[j].visit_address.state;
        var zip = doctor.practices[j].visit_address.zip;
        var addressHash = {
          street: street,
          city: city,
          state: state,
          zip: zip
        };
        address = addressHash;
      }
    }

    var newDoc = new Doctors(firstName, lastName, picture, bio, address);
    doctorList.push(newDoc);
  }
  return doctorList;
};


Doctors.prototype.getDoctors = function(medicalIssue, printList) {
  $.get('https://api.betterdoctor.com/2016-03-01/doctors?query='+ medicalIssue +'&location=45.5231%2C-122.6765%2C%205&user_location=45.5231%2C-122.6765&skip=0&limit=20&user_key=' + apiKey)
   .then(function(result) {
      var printArray = arrayBuild(result);
      printList(printArray);
    })
   .fail(function(error){
     console.log(error);
      console.log("fail");

    });
};

exports.getDoctors = Doctors;

},{"./../.env":1}],3:[function(require,module,exports){
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

},{"./../js/getDoctors.js":2}]},{},[3]);
