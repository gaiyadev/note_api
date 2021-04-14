const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcrypt");

/*
 * *Sign in a new user
 * @param {*} req
 * @param {*} res
 */
exports.sign_in = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({
      error: "Please all fields are required",
    });
  }
  if (!password) {
    return res.status(400).json({
      error: "Please all fields are required",
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
          { _id: user._id, email: user.email, name: user.name },
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
                username: user.name,
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
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({
      error: "Please all fields are required",
    });
  }
  if (!password) {
    return res.status(400).json({
      error: "Please all fields are required",
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
  const newPassword = req.body.password;
  await User.findOne({ _id: req.params.id })
    .then((user) => {
      if (!user) {
        return res.status(422).json({
          error: "User doesn't exist",
        });
      }
      bcrypt.hash(newPassword, 10).then((hashPassword) => {
        user.password = hashPassword;
        user.save().then((saveUser) => {
          return res.json({
            message: "Password changed successfully",
            saveUser,
          });
        });
      });
    })
    .catch((err) => console.log(err));
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
        message: "No user found",
      });
    });
};
