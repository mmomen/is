Template.statusField.events({
  'submit #status-form': function(e){
    e.preventDefault();

    var _id = Isers.findOne({iserId: Meteor.userId()})._id;
  
    var status =  $(e.target).find('[name=status]');

    var statusLength = status.val().length;

    if (statusLength>10){
      throwError("You have exceeded 200 characters!")
    }else{
      Meteor.call('updateStatus', _id, status.val());
    
      status.val("");
    }

    // if (statusLength > 88){
    //   $('#status-input').css('font-size', '2.2em');
    // } else if(statusLength > 180){
    //   $('#status-input').css('font-size', '1.0em');
    // }
    // // // } else if(statusLength>200){
    // // //   $status.val("You have gone over the 200 word limit")
    // // // }

  }
});
