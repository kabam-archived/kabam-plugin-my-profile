kabam-plugin-my-profile
========================

[Kabam-kernel](https://github.com/mykabam/kabam-kernel) plugin to edit user profile

Add 2 routes

GET /auth/myProfile
======================
Get basic HTML page with form to edit this current user profile

POST /auth/myProfile
======================
Edits the current user profile.
For now works with this parameters, extracted from body of POST request

- `firstName`
- `lastName`
- `skype`
- `password1` - new password
- `password2` - password confirmation




Responsibility guidelines
================
Every kabam plugin and package has the responsible developer. His duties are

- Maintain the package - fix and found bugs from upgrading modules included or nodejs version change
- React on bug reports
- Accept/deny pull request.

The `Push` and `npm publish` privilege is the right of the `Responsible developer`, but the `fork` - is for everybody.

Responsible developer for this package is  [Anatolij Ostroumov](https://github.com/vodolaz095)