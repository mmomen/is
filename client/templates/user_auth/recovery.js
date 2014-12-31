// Template.recovery.events({
//   'submit #recovery-form': function(e,t){
//     e.preventDefault();

//     var email = t.find('#recovery-email').value;
//     Accounts.forgotPassword({email:email}, function(error){
//       if (error){
//         alert("RECOVERY EMAIL ERROR");
//       }
//     })
//   }
// })

// Template.recovery.helpers({
//   'resetPassword': function(t){
//     if (Accounts._resetPasswordToken) {
//       Session.get('resetPassword', Accounts._resetPasswordToken);
//     }

//     return Session.get('resetPassword');
//   }
// })