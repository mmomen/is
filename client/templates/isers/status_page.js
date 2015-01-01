Template.statusPage.helpers({

})

Template.statusPage.events({
  'submit #status-form': function(e){
    e.preventDefault();

    var status = $(e.target).find('[name=status]').val();
    
  }
})