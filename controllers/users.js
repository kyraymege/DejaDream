const User = require("../models/user");

// getUser
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    return res.status(200).json({user : user});
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

// Username exist
const usernameExist = async (req, res) => {
  try {
    const { username } = req.query;

    if (!username) {
      return res.status(400).json("Username is required");
    }

    const user = await User.findOne({ username: username });

    if (user) {
      return res.status(200).json({ exist: true });
    } else {
      return res.status(200).json({ exist: false });
    }
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

//Change User's emoji
const changeEmoji = async (req, res) => {
  try {
    const { emoji } = req.body;

    if (!emoji) {
      return res.status(400).json("Emoji is required");
    }

    // *Find the user
    const user = await User.findByIdAndUpdate(
      {
        _id: req.user._id,
      },
      {
        emoji: emoji,
      },
      {
        new: true,
      }
    );

    return res
      .status(200)
      .json({ message: "Emoji changed successfully", user: user });
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
  usernameExist,
  changeEmoji,
};
