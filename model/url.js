const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    redirectUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
      unique: true,
    },
    visitHistory: [{ timestamp: { type: Date } }],
  },
  { timestamp: true }
);

module.exports = mongoose.model("Url", urlSchema);
