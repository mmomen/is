Meteor.publish('isers', function(iserId) {
  if (!iserId){
    return this.ready();
  }else{
    return Isers.find({iserId: iserId});
  }
});

Meteor.publish('searchResult', function(iserId){
  if (!iserId){
    return this.ready();
  }else{
    return Isers.find({}, {fields: {email: true, statusAt:true}});
  }
})  