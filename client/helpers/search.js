Search = new Mongo.Collection(null);

clearSearch = function(){
  Search.remove({});
}

doSearch = function(email){
  Search.insert({email:email});
}