# Note API Documentation
Is an api for desktop app built with electronjs to consume

## Base URL 
   https://note-expressjs-api.herokuapp.com
   
(Prefix)
+ /api/users for users
+ /api/notes for notes 

## Users endpoints
/register for user registrastion [POST]
/login for user login [POST]
/changePassword for user change password [PUT] protected
/user/profile for getting user info [GET] protected
/profile to update user info [PUT] protected
/all/posts to get all users related posts [GET] protected

Example
       https://note-expressjs-api.herokuapp.com/api/user/login  thats how to call the apis

## Notes endpoints (protected)
api/notes/add to add new post [POST] 
api/notes/id to update [PUT]
api/notes/id to DELETE  [DELETE]
api/notes/ to get all post [GET]
api/notes/posts to  get all users post [GET]

