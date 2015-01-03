Meteor.publish('isers', function(iserId) {
  if (!iserId){
    return this.ready();
  }else{
    return Isers.find({iserId: iserId});
  }
});

Meteor.publish('requests', function(id) {
  if (!id){
    return this.ready();
  }else{
    return Isers.find({_id: id}, {fields: {email:true, statusAt: true, friends:true, friendRequests:true}});
  }
});


Meteor.publish('searchResult', function(iserId){
  if (!iserId){
    return this.ready();
  }else{
    return Isers.find({}, {fields: {email: true, statusAt: true, friendRequests:true}});
  }
});


// Meteor.publish('friendRequests', function(iserId){
//   if (!iserId){
//     return this.ready();
//   }else{
//     var requesterArray=[];
//     var iser = Isers.findOne({iserId: iserId});
//     var friendRequests = iser.friendRequests
//     friendRequests.forEach(function(request){
//       var id = request.requesterId;
//       requesterArray.push(Isers.find({_id: id}))
//     })

//     return requesterArray;
//   }
// })

// Meteor.publish('friendsList', function(iserId){
//   if (!iserId){
//     return this.ready();
//   }else{
//     var iser = iser.findOne({iserId: iserId});
    
//   }
// })
