Template.statusField.events({
  'submit #status-form': function(e){
    e.preventDefault();

    var _id = Isers.findOne({iserId: Meteor.userId()})._id;
  
    var properties = {
      status: $(e.target).find('[name=status]').val(),
      statusAt: new Date()
    };
    
    Isers.update(_id, {$set: properties})
  
    $(e.target).find('[name=status]').val("")
  }
});
