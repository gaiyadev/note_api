const UserController = require("../../controllers/userController");
const auth = require("../../middleware/auth");
var express = require("express");
var router = express.Router();

/*  @route     POST api/users/register
    @desc      Sign up a user
    @access    Public
 */

router.post("/register", UserController.sign_up);

/*  @route     POST api/users/login
    @desc      Sign In a user
    @access    Public
 */

router.post("/login", UserController.sign_in);

/*  @route     POST api/users/id
    @desc      Update user password
    @access    Private
 */

router.put("/changePassword", auth, UserController.change_user_password);
/*  @route     GET api/users/id
    @desc      Get a single user 
    @access    Private
 */

router.get("/:id", auth, UserController.get_user_by_id);

/*  @route     GET api/users/:email
    @desc      Checking if user email already exits
    @access    Public
 */

//  get user profile
router.get("/user/profile", auth, UserController.get_user_profile);

// update profile
router.put("/profile", auth, UserController.update_profile);

router.get("/all/posts", auth, UserController.total_post);

module.exports = router;
