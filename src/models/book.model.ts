import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
	id: mongoose.Schema.Types.ObjectId,
	title: String,
	content: String,
	created: Date,
	updated: Date,
});

const bookSchema = new mongoose.Schema({
	title: String,
	created: Date,
	updated: Date,
	autor: String,
	notes: [noteSchema],
});

const modelBook = mongoose.model("Book", bookSchema, "books");
export default modelBook;
