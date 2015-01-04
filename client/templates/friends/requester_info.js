Template.requesterInfo.helpers({
  email: function(){
    if (Isers.findOne({_id: this.requesterId}) !== undefined){
      return Isers.findOne({_id: this.requesterId}).email;
    }
  },
  lastStatus: function(){
    if (Isers.findOne({_id: this.requesterId}) !== undefined){
      return Isers.findOne({_id: this.requesterId}).statusAt;
    }
  }
})

Template.requesterInfo.events({
  'click .fa-check': function(e){
    
      e.preventDefault();

      var requesterId = this.requesterId;
      var divId = "#" + requesterId;


    
      // DEFINE CURRENT ISER PROPERTIES
      var currentIser = (Isers.findOne({iserId: Meteor.userId()}));
      var currentIserId = currentIser._id
      var currentIserFriends = currentIser.friends

      // DEFINE REQUESTER PROPERTIES
      var requesterFriends = Isers.findOne({_id:requesterId}, {fields: {friends:1}}).friends;
      var requesterEmail = Isers.findOne({_id: requesterId}).email;



  // STEP 1:
      // VALIDATE CURRENT ISER IN REQUESTER'S FRIENDS LIST
      requesterFriends.forEach(function(v,i){
        if(v.friendId == currentIserId){
          v.validated = true;
        }
      });

      Isers.update({_id: requesterId}, {$set:{friends: requesterFriends}});

  // STEP 2:
      // REMOVE FRIEND REQUEST FROM CURRENT ISER'S REQUEST LIST
      Isers.update({_id: currentIserId}, {$pull: {friendRequests: {requesterId: requesterId}}});

  // STEP 3:
      // ADD REQUESTER TO CURRENT ISER'S FRIENDS LIST:
      var currentIserRequested;
      currentIserFriends.forEach(function(friend){
        if(friend.friendId === requesterId && friend.validated === false){
          friend.validated = true;
          currentIserRequested = true;
        }
      })

      // CHECK IF CURRENT ISER ALREADY MADE REQUEST BUT GOT DECLINED (REQUESTER IN FRIEND'S LIST BUT VALIDATION=FALSE)
      if (currentIserRequested){
        Isers.update({_id: currentIserId}, {$set:{friends: currentIserFriends}});
      }else{
        var friend = {
          friendId: requesterId,
          username: requesterEmail,
          validated: true
        }

        Isers.update({_id: currentIserId}, {$push: {friends: friend}});
      }
  },
  'click .fa-times': function(e){
    e.preventDefault();

    var requesterId = this.requesterId;
    var divId = "#" + requesterId;

    $(divId).animate({
      opacity:0
    },300, function(){
      var currentIserId = (Isers.findOne({iserId: Meteor.userId()}))._id;
     // REMOVES FRIEND REQUEST FROM CURRENT ISER'S REQUEST LIST
      Isers.update({_id: currentIserId}, {$pull: {friendRequests: {requesterId: requesterId}}});
    })


  }
});