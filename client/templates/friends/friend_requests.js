Template.friendRequests.helpers({
  requesters: function(){
    return Isers.findOne({iserId: Meteor.userId()}).friendRequests;
  }
})