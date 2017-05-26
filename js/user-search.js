function Search(userSearch){
  this.search = userSearch
}

Search.prototype.condition = function(){
  this.search = "Searched"
};

exports.searchModule = Search
