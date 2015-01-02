Template.searchIsers.helpers({
  showResults: function(){
    if (Search.find().count() > 0){
      return true;
    } else { 
      return false;
    }
  },
  searchedIser: function(){
    var email = Search.findOne().email;
    var iser = Isers.findOne({email:email});
    var selfEmail = Isers.findOne({iserId: Meteor.userId()}).email;

    if (iser && iser.email !== selfEmail)
      return [{email: iser.email, statusAt:iser.statusAt}];

    return false;
  }

})


Template.searchIsers.events({
  'submit #search-form': function(e){
    e.preventDefault();
    
    clearSearch();

    var $email= $(e.target).find('[name=search-field]').val()

    doSearch($email);
    
    $(e.target).find('[name=search-field]').val("")
  }
})
