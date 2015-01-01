Template.iserPage.helpers({
  status: function(){
    return Isers.find({iserId: Meteor.userId()});
  }
});