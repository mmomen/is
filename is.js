isUsers = new Mongo.Collection('isusers');


if (Meteor.isClient) {

  // counter starts at 0
  Template.statusInput.events({
    'submit .status': function(e){
      e.preventDefault();

      var status_message = $(e.target).find('[name=currentStatus]');

      isUsers.insert({
        user: Meteor.userId(),
        status: status_message.val(),
        createdAt: new Date()
      })

      status_message.val("")
    }
  })

  
  Template.userStatus.helpers({
    status: function(){
      return isUsers.find({user: Meteor.userId()})
    }
  })
}
