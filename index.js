var fs = require('fs');
/*
todo - on first run - create templates for profile...
 */

exports.routes = function(mwc){
  mwc.app.get('/auth/myProfile',function(request,response){
    if(request.user){
        if (request.is('json')) {
          response.json(request.user)
        } else {
          var parameters = {
            'title': 'Edit your profile',
            'useGoogle': true,
            'useGithub': (mwc.config.passport && mwc.config.passport.GITHUB_CLIENT_ID && mwc.config.passport.GITHUB_CLIENT_SECRET),
            'useTwitter': (mwc.config.passport && mwc.config.passport.TWITTER_CONSUMER_KEY && mwc.config.passport.TWITTER_CONSUMER_SECRET),
            'useFacebook': (mwc.config.passport && mwc.config.passport.FACEBOOK_APP_ID && mwc.config.passport.FACEBOOK_APP_SECRET)
          };
          response.render('my',parameters);
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