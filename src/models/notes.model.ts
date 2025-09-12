import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
	title: String,
	content: String,
	autor: String,
	created: { type: Date, default: Date.now },
	updated: { type: Date, default: Date.now },
});

const modelNote = mongoose.model("Note", noteSchema, "notes");
export default modelNote;