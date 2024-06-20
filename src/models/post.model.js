const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Esquema para los comentarios
const CommentSchema = new Schema({
  coachId: { type: Schema.Types.ObjectId, ref: "Coach", required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Esquema para los posts
const PostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  pymeId: { type: Schema.Types.ObjectId, ref: "Pyme", required: true },
  createdAt: { type: Date, default: Date.now },
  comments: [CommentSchema],
});

module.exports = mongoose.model("Post", PostSchema);
