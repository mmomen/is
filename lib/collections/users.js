Meteor.methods({
  uploadFile: function(downloadUrl){
    Meteor.users.update(Meteor.userId(), {$push: {"profile.files": downloadUrl}});
  }
})