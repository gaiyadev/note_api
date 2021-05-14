const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcrypt");
const Note = require("../models/note");
const c = require("config");

/*
 * *Sign in a new user
 * @param {*} req
 * @param {*} res
 */
exports.sign_in = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({
      error: "Email is required",
    });
  }
  if (!password) {
    return res.status(400).json({
      error: "Password is required",
    });
  }

  await User.findOne({ email: email }).then((user) => {
    if (!user)
      return res.status(400).json({ error: "email or password is invalid" });
    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (!isMatch) {
        return res.status(400).json({ error: "Email or Password is invalid" });
      } else {
        // success login ... Generating jwt for auth
        jwt.sign(
          { _id: user._id, email: user.email, username: user.username },
          config.get("MD_SECRET_KEY"),
          {
            expiresIn: 3600,
          },
          (err, token) => {
            if (err) throw err;
            return res.json({
              token,
              user: {
                _id: user._id,
                email: user.email,
                username: user.username,
              },
              message: "Sign in successfully",
            });
          }
        );
      }
    });
  });
};

/*
 * *Sign up a new user
 * @param {email} req
 * @param {password} req
 * @param {user} res
 *
 *
 */
exports.sign_up = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username) {
    return res.status(400).json({
      error: "Username is required",
    });
  }
  if (!email) {
    return res.status(400).json({
      error: "Email field is required",
    });
  }
  if (!password) {
    return res.status(400).json({
      error: "Password is required",
    });
  }
  if (password.length <= 4) {
    return res.status(400).json({
      error: "Please all fields muts be atleast more than 3 characters",
    });
  }
  await User.findOne({ email: email })
    .then((user) => {
      if (user) return res.status(400).json({ error: "User already exist" });
      const newUser = new User({
        username: username,
        email: email,
        password: password,
      });

      User.newUser(newUser, (err, user) => {
        if (err) return err;
        return res.json({
          message: "Account created successfully",
          user,
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * Change user password
 * @param {*} req
 * @param {*} res
 */
exports.change_user_password = async (req, res) => {
  const { _id } = req.user;
  const { password, newPassword, comfirmPassword } = req.body;

  if (!password) {
    return res.json({ error: "Current password is required" });
  }
  if (!newPassword) {
    return res.json({ error: "New password is required" });
  }
  if (!comfirmPassword) {
    return res.json({ error: "Password comfirm is required" });
  }

  try {
    const user = await User.findByIdAndUpdate(_id);
    if (!user) return res.status(403).json({ error: "User not found" });

    if (newPassword !== comfirmPassword) {
      return res.status(400).json({ error: "Password comfirmation fails" });
    }
    const currentPassword = user.password;
    console.log(currentPassword);

    const isMatch = await bcrypt.compare(password, currentPassword);
    if (!isMatch) {
      return res.status(400).json({
        error: "Current password is not correct",
      });
    }
    const isSame = await bcrypt.compare(newPassword, currentPassword);

    if (isSame) {
      return res.status(400).json({
        error: "Current password is cannot be same with new password",
      });
    }
    const hash = await bcrypt.hash(newPassword, 10);
    user.password = hash; //set hash password
    const savedPassword = await user.save();
    return res.json({ user: savedPassword });
  } catch (err) {
    throw err;
  }
};

/**
 * Get a single user
 * @param {*} req
 * @param {*} res
 */

exports.get_user_by_id = async (req, res) => {
  await User.findOne({ _id: req.params.id })
    .then((user) => {
      return res.json({
        user: user,
      });
    })
    .catch(() => {
      return res.status(404).json({
        error: "No user found",
      });
    });
};

// USER PROFILE
exports.get_user_profile = async (req, res) => {
  const { _id } = req.user;
  await User.findOne({ _id: _id })
    .then((user) => {
      return res.json({
        user: user,
      });
    })
    .catch(() => {
      return res.status(404).json({
        error: "No user found",
      });
    });
};

// updateb profile
exports.update_profile = async (req, res) => {
  const { username, email } = req.body;
  const { _id } = req.user;
  if (!email) {
    return res.status(400).json({
      error: "Email is required",
    });
  }
  if (!username) {
    return res.status(400).json({
      error: "Username is required",
    });
  }
  try {
    const user = await User.findByIdAndUpdate(_id);
    if (!user)
      return res.status(404).json({
        error: "User not found",
      });

    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(404).json({
        error: "Email already exist",
      });
    }

    user.username = username;
    user.email = email;
    const saved = await user.save();
    return res.json({ user: saved });
  } catch (err) {
    throw err;
  }
};

// all post count

exports.total_post = async (req, res) => {
  const { _id } = req.user;
  const posts = await Note.find({ _id: _id }).count().exec();

  return res.json({ totalPosts: posts });
};
