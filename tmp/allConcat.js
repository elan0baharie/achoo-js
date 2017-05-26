var Search = require('./../js/user-search.js').searchModule;

$(document).ready(function(){
  $('#searchForm').submit(function(e){
    e.preventDefault();
    var userSearch= $('#userTxt').val();
    var newSearch = new Search(userSearch);
    newSearch.condition();
    console.log(newSearch['search']);
  });
})
