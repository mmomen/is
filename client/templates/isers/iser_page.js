Template.iserPage.helpers({
  profile: function(field){
    return (Isers.findOne({iserId: Meteor.userId()}))[field];
  },
  showSearchField: function(){
    return !! Session.get('searchField');
  }
});

Template.iserPage.events({
  'click .fa-plus-square-o': function(){
    Session.set('searchField', "show");
  },
  'click .fa-minus-square-o': function(){
    clearSearch();
    Session.set('searchField', "");
  }
})
