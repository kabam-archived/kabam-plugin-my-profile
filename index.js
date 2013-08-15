var fs = require('fs');


exports.routes = function(mwc){
  mwc.app.get('/auth/myProfile',function(request,response){
    if(request.user){
        if (request.is('json')) {
          response.json(request.user)
        } else {
          response.render('my',{title:'Edit your profile'});
        }
    } else {
      response.send(400);
    }
  });

  mwc.app.post('/auth/myProfile',function(request,response){
    if(request.user){
      var makeResponse = function (err){
        if(request.is('json')){
          if(err){
            response.send(400);
          } else {
            response.send(201);
          }
        } else {
          if(err){
            request.flash('error',err.message);
          } else {
            request.flash('success','Profile is saved!');
          }
          response.redirect('back');
        }
      }
      var fields =['firstName', 'lastName', 'skype'];
      fields.map(function(p){
        if(request.body[p]){
          request.user[p]=request.body[p];
        }
      });

      if(request.body.password1 && request.body.password2 && (request.body.password1 === request.body.password2)){
        request.user.setPassword(request.body.password1, makeResponse);
      } else {
        request.user.save(makeResponse);
      }

    } else {
      response.send(400);
    }
  });
};