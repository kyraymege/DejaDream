const Diary = require("../models/diary");
const CryptoJS = require("crypto-js");

// Get all diaries
const getAllDiaries = async (req, res) => {
  const { limit, page } = req.query;
  console.log(limit, page)
  try {
    const diaries = await Diary.find({ author: req.user._id })
      .limit(parseInt(limit))
      .skip(parseInt(page) * parseInt(limit))
      .sort({ createdAt: -1 });
      console.log(diaries)
    res.status(200).json({diaries : diaries});
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a single diary by ID
const getDiaryById = async (req, res) => {
  try {
    const diary = await Diary.findById(req.params.diaryId);
    if (!diary) {
      return res.status(404).json({ error: "Diary not found" });
    }
    diary.content = decrypt(diary.content);
    res.status(200).json(diary);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new diary
const createDiary = async (req, res) => {
  try {
    console.log(req.user._id)
    const { title, content } = req.body;
    const encryptedContent = encrypt(content);
    const encryptedTitle = encrypt(title);
    const diary = new Diary({
      title: encryptedTitle,
      content: encryptedContent,
      author: req.user._id,
    });
    console.log(diary)
    await diary.save();
    res.status(201).json(diary);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// ! Should not be used ???
// // Update an existing diary
// const updateDiary = async (req, res) => {
//   try {
//     const { title, content } = req.body;
//     const diary = await Diary.findByIdAndUpdate(
//       req.params.id,
//       { title, content },
//       { new: true }
//     );
//     if (!diary) {
//       return res.status(404).json({ error: "Diary not found" });
//     }
//     res.json(diary);
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// Delete a diary
const deleteDiary = async (req, res) => {
  try {
    const diary = await Diary.findByIdAndDelete(req.params.diaryId);
    if (!diary) {
      return res.status(404).json({ error: "Diary not found" });
    }
    res.json({ message: "Diary deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Reset a user'd diary
const resetUserDiaries = async (req, res) => {
  try {
    // delete all diaries associated with the user
    await Diary.deleteMany({ author: req.user._id });

    res.status(200).json({ message: "Diaries reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

function encrypt(text) {
  const ciphertext = CryptoJS.AES.encrypt(text, process.env.CRYPTO_SECRETKEY);
  return ciphertext.toString();
}

function decrypt(encryptedText) {
  const bytes = CryptoJS.AES.decrypt(
    encryptedText,
    process.env.CRYPTO_SECRETKEY
  );
  return bytes.toString(CryptoJS.enc.Utf8);
}

module.exports = {
  getAllDiaries,
  getDiaryById,
  createDiary,
  deleteDiary,
  resetUserDiaries,
};
