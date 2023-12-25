const User = require("../models/user");

// getUser
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json("Internal server error");
  }
};

// Change username
const changeUsername = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json("Username is required");
    }

    // *Find the user
    const user = await User.findByIdAndUpdate(
      {
        _id: req.user._id,
      },
      {
        username: username,
      },
      {
        new: true,
      }
    );

    return res
      .status(200)
      .json({ message: "Username changed successfully", user: user });
  } catch (err) {
    console.error(err);
    return res.status(500).json("Internal server error");
  }
};

// Change name
const changeName = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json("Name is required");
    }

    // *Find the user
    const user = await User.findByIdAndUpdate(
      {
        _id: req.user._id,
      },
      {
        name: name,
      },
      {
        new: true,
      }
    );

    return res
      .status(200)
      .json({ message: "Name changed successfully", user: user });
  } catch (err) {
    console.error(err);
    return res.status(500).json("Internal server error");
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(err);
    return res.status(500).json("Internal server error");
  }
};

module.exports = {
  getUser,
  changeUsername,
  changeName,
  deleteUser,
};
