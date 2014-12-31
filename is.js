// isers = is users

// Isers = new Mongo.Collection('isers');


// if (Meteor.isClient) {

//   Template.user.events({
//     'submit .status_input': function(e){
//       e.preventDefault();

//       var status_message = $(e.target).find('[name=currentStatus]');

//       Isers.insert({
//         user: Meteor.userId(),
//         status: status_message.val(),
//         createdAt: new Date()
//       })
    
//       status_message.val("")
//     }
//   })
  
//   Template.user.helpers({
//     status: function(){
//       return Isers.find({user: Meteor.userId()})
//     }
//   })
// }

