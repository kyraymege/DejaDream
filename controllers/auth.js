const User = require("../models/user");
const jwt = require("jsonwebtoken");

//TODO: Change user modal
//Apple Login
const appleLogin = async (req, res) => {
  try {
    const { email, appleId } = req.body;

    if (!appleId) {
      return res.status(400).json("AppleId not found!");
    }

    if (req.appleUser.sub !== appleId) {
      return res.status(400).json("Invalid Apple Id");
    }

    // Check if the user already exists
    const user = await User.findOne({ appleId: appleId });

    if (!user) {
      const emailSplit = email.split("@");
      const nameOfUser = emailSplit[0];
      const usernameOfUser = emailSplit[0];
      // *Create a new user
      const newUser = new User({
        name: nameOfUser,
        username: usernameOfUser,
        email: email,
        appleId: appleId,
      });

      // *Create a new user
      const savedUser = await newUser.save().catch((err) => {
        console.log(err);
        return res.status(500).json("Internal server error");
      });

      // *Create a new access token and refresh token
      const accessToken = jwt.sign(
        { appleId: appleId, _id: savedUser._id },
        process.env.ACCESS_SECRET,
        { expiresIn: "15m" }
      );

      const refreshToken = jwt.sign(
        { appleId: appleId, _id: savedUser._id },
        process.env.REFRESH_SECRET,
        { expiresIn: "15d" }
      );

      return res
        .status(200)
        .json({ accessToken: accessToken, refreshToken: refreshToken });
    } else {
      // *Create a new access token and refresh token
      const accessToken = jwt.sign(
        { appleId: appleId, _id: user._id },
        process.env.ACCESS_SECRET,
        { expiresIn: "15m" }
      );

      const refreshToken = jwt.sign(
        { appleId: appleId, _id: user._id },
        process.env.REFRESH_SECRET,
        { expiresIn: "15d" }
      );

      return res
        .status(200)
        .json({ accessToken: accessToken, refreshToken: refreshToken });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal server error");
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json("Refresh token is required");
    }

    // *Verify the refresh token
    jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json("Invalid refresh token");
      }

      // *Create a new access token
      const accessToken = jwt.sign(
        { appleId: user.appleId, _id: user._id},
        process.env.ACCESS_SECRET,
        { expiresIn: "15m" }
      );

      // *Create a new refresh token
      const refreshToken = jwt.sign(
        { appleId: user.appleId, _id: user._id},
        process.env.REFRESH_SECRET,
        { expiresIn: "15d" }
      );

      return res
        .status(200)
        .json({ accessToken: accessToken, refreshToken: refreshToken });

      // *Send the new access token and refresh token to the client
    });
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal server error");
  }
};

// // REGISTER
// const register = async (req, res) => {
//   //Get user input
//   const { authProvider, user } = req.body;
//   console.log(user);

//   try {
//     //Chech authProvider
//     if (authProvider === "email") {
//       //If user exist, throw error
//       const existingUser = await User.findOne({ email: user.email });
//       if (existingUser) {
//         return res.status(400).json({ message: "User already exists" });
//       }

//       //Create user

//       ////Hash password
//       const hashedPassword = await bcrypt.hash(user.password, 12);

//       ////Save new user
//       const newUser = new User({
//         ...user,
//         password: hashedPassword,
//       });
//       await newUser.save();

//       //Create verification code
//       const verificationToken = uuidv4();
//       console.log(verificationToken);

//       const newVerification = new UserVerification({
//         userId: newUser._id,
//         verificationCode: verificationToken,
//         expiredAt: Date.now() + 300 * 1000,
//       });

//       await newVerification.save();

//       return res.status(200).json({ message: "User created" });
//     }
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//     console.log(error);
//   }
// };

// const verifyUserMail = async (req, res) => {
//   const { code } = req.query;
//   console.log(code);

//   if (!code) {
//     return res.status(400).json({ message: "Code is missing." });
//   }

//   try {
//     // Find a user with the given verification token
//     const user = await UserVerification.findOne({ verificationCode: code });

//     if (!user) {
//       return res.status(404).json({ message: "Invalid verification token." });
//     }

//     // Check if the verification token has expired
//     if (user.expiredAt < new Date()) {
//       return res.status(400).json({ message: "Verification token expired." });
//     } else {
//       user.isVerified = true;
//       user.verificationCode = undefined;
//       await user.save();
//     }

//     // You can also redirect the user to a success page or display a success message.
//     res.status(200).json({ message: "Email verified successfully." });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//     console.log(error);
//   }
// };

// const createNewVerificationCode = async (req, res) => {
//   const { userId } = req.body;

//   if (!userId) {
//     return res.status(400).json({ message: "User is missing." });
//   }

//   try {
//     // Find a user with the given email
//     const user = await User.findOne({ _id: userId });

//     if (!user) {
//       return res.status(404).json({ message: "User not found." });
//     }

//     const userVerification = await UserVerification.findOne({ userId: userId });

//     if (userVerification.isVerified) {
//       return res.status(400).json({ message: "User is already verified." });
//     }

//     // Create a new verification code
//     const verificationToken = uuidv4();

//     // Save the new verification code
//     await UserVerification.findOneAndUpdate(
//       { userId: userId },
//       {
//         verificationCode: verificationToken,
//         expiredAt: Date.now() + 300 * 1000,
//       }
//     );

//     return res.status(200).json({ message: "New verification code created." });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//     console.log(error);
//   }
// };

module.exports = { appleLogin, refreshToken };
