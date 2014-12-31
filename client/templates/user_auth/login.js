Template.loginForm.event({
  'submit #login-form': function(e,t){
    e.preventDefault();

    var username = t.find('#login-username').value;
    var passwor = t.find('#login-password').value;

    Meteor.loginWithPassword(username, password, function(error){
      if (error){
        alert("WRONG CREDENTIALS");
      }
    })
  }
})


Template.logoutForm.event({
  'submit #logout-form':function(e,t){
    e.preventDefault();

    // Log Out but if there is an error, alert the user
    Meteor.logout(function(error){
      if (error){
        alert("LOG OUT ERROR: PLEASE TRY AGAIN")
      } 
    })
  }
})