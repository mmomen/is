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
  
    // DEFINE CURRENT ISER PROPERTIES
    var currentIser = (Isers.findOne({iserId: Meteor.userId()}));
    var currentIserId = currentIser._id;
    var currentIserFriends = currentIser.friends;

    var current = {
      iser: currentIser,
      iserId: currentIserId,
      friends: currentIserFriends
    }

    // DEFINE REQUESTER PROPERTIES
    var requesterId = this.requesterId;
    var requesterFriends = Isers.findOne({_id:requesterId}, {fields: {friends:1}}).friends;
    var requesterEmail = Isers.findOne({_id: requesterId}).email;

    var requester ={
      id: requesterId,
      friends: requesterFriends,
      email: requesterEmail
    };

    Meteor.call('updateAcceptedFriends', current, requester);
  },
  'click .fa-times': function(e){
    e.preventDefault();

    var requesterId = this.requesterId;
    var currentIserId = (Isers.findOne({iserId: Meteor.userId()}))._id;

  // REMOVES FRIEND REQUEST FROM CURRENT ISER'S REQUEST LIST
    Meteor.call('updateDeclinedFriends', requesterId, currentIserId);
  }
});