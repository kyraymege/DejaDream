const mongoose = require("mongoose");

const creditSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    expireAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

creditSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("Credit", creditSchema);