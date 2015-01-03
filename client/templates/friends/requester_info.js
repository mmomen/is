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
    $(divId).animate({
      opacity:0
    },300, function(){
      var currentIserId = (Isers.findOne({iserId: Meteor.userId()}))._id;

      // updates current user's friend request and removes the request
      Isers.update({_id: currentIserId}, {$pull: {friendRequests: {requesterId: requesterId}}});

      var requesterEmail = Isers.findOne({_id: requesterId}).email; 
      var friendsArr = Isers.findOne({_id:requesterId}, {fields: {friends:1}}).friends;

      friendsArr.forEach(function(v,i){
        if(v.friendId == currentIserId){
          v.validated = true;
        }
      });

      // updates requester's friends status to true
      Isers.update({_id: requesterId}, {$set:{friends: friendsArr}});

      var friend = {
        friendId: requesterId,
        username: requesterEmail,
        validated: true
      }

      // adds requestser to current user's friends list
      Isers.update({_id: currentIserId}, {$push: {friends: friend}});

    })
  },
  'click .fa-times': function(e){
    e.preventDefault();


    var requesterId = this.requesterId;
    var divId = "#" + requesterId;
    $(divId).animate({
      opacity:0
    },300, function(){
      var currentIserId = (Isers.findOne({iserId: Meteor.userId()}))._id;
     // updates current user's friend request and removes the request
      Isers.update({_id: currentIserId}, {$pull: {friendRequests: {requesterId: requesterId}}});
    })


  }
});