Template.iserPage.helpers({
  profile: function(field){
    return (Isers.findOne({iserId: Meteor.userId()}))[field];
  }
});