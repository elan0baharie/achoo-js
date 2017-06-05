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
