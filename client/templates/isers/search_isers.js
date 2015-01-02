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

    // ASKS FOR DATA FROM THE DATABASE
    Meteor.subscribe('searchResult', Meteor.userId());

    var iser = Isers.findOne({email:email});
    var selfEmail = Isers.findOne({iserId: Meteor.userId()}).email;

    if (iser && iser.email !== selfEmail)
      return [{email: iser.email, statusAt:iser.statusAt, _id: iser._id, status: iser.status}];

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
