(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "9e08fa12e79745b8b243b4d89f2e0838"

},{}],2:[function(require,module,exports){
var apiKey = require('./../.env').apiKey;

function Doctors (){
  this.doctorArray = [];
}

arrayBuild = function(arr){
  var array = arr['data']
  $('#resultTxt').text(JSON.stringify(array))
  for(var i = 0; i < 20; i++) {
    var doctor = array[i]
    $('#result3Txt').append("<p>"+ JSON.stringify(doctor) + "</p>");
  };
}


Doctors.prototype.getDoctors = function(medicalIssue) {
  $.get('https://api.betterdoctor.com/2016-03-01/doctors?query='+ medicalIssue +'&location=45.5231%2C-122.6765%2C%205&user_location=45.5231%2C-122.6765&skip=0&limit=20&user_key=' + apiKey)
   .then(function(result) {
      arrayBuild(result);
    })
   .fail(function(error){
     console.log(error);
      console.log("fail");

    });
};

exports.getDoctors = Doctors;

},{"./../.env":1}],3:[function(require,module,exports){
var Search = require('./../js/getDoctors.js').getDoctors;


$(document).ready(function(){
  $('#searchForm').submit(function(e){
    e.preventDefault();
    var medicalIssue = $('#userTxt').val();
    var newSearch = new Search();
    newSearch.getDoctors(medicalIssue);
  });
})

},{"./../js/getDoctors.js":2}]},{},[3]);
