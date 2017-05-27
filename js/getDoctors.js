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
