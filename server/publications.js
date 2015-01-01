Meteor.publish('isers', function(iserId) {
  if (!iserId){
    return this.ready();
  }else{
    return Isers.find({iserId: iserId});
  }
});