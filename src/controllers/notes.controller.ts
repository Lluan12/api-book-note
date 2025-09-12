import { Request, Response } from "express";
import _notes from "../models/notes.model";

// Get all notes
async function getAllNotes(req: Request, res: Response) {
	try {
		const notes = await _notes.find();
		res.status(200).json(notes);
	} catch (error) {
		res.status(500).json(error);
	}
}

// Get notes by author
async function getNotesByAuthor(req: Request, res: Response) {
	const { autor } = req.params;
	try {
		const notes = await _notes.find({ autor });
		res.status(200).json(notes);
	} catch (error) {
		res.status(500).json(error);
	}
}

// Get a single note by ID
async function getNoteById(req: Request, res: Response) {
	const { id } = req.params;
	try {
		const note = await _notes.findById(id);
		if (!note) {
			return res.status(404).json({ message: "Nota no encontrada" });
		}
		res.status(200).json(note);
	} catch (error) {
		res.status(500).json(error);
	}
}

// Create a new note
async function createNote(req: Request, res: Response) {
	try {
		const note = await _notes.create(req.body);
		res.status(201).json(note);
	} catch (error) {
		res.status(500).json(error);
	}
}

// Update a note
async function updateNote(req: Request, res: Response) {
	const { id } = req.params;
	try {
		const note = await _notes.findByIdAndUpdate(
			id,
			{ ...req.body, updated: new Date() },
			{ new: true }
		);
		if (!note) {
			return res.status(404).json({ message: "Nota no encontrada" });
		}
		res.status(200).json(note);
	} catch (error) {
		res.status(500).json(error);
	}
}

// Delete a note
async function deleteNote(req: Request, res: Response) {
	const { id } = req.params;
	try {
		const note = await _notes.findByIdAndDelete(id);
		if (!note) {
			return res.status(404).json({ message: "Nota no encontrada" });
		}
		res.status(200).json({ message: "Nota eliminada correctamente" });
	} catch (error) {
		res.status(500).json(error);
	}
}

// Get recent notes (last 10)
async function getRecentNotes(req: Request, res: Response) {
	const { autor } = req.params;
	try {
		const notes = await _notes
			.find({ autor })
			.sort({ created: -1 })
			.limit(10);
		res.status(200).json(notes);
	} catch (error) {
		res.status(500).json(error);
	}
}

export {
	getAllNotes,
	getNotesByAuthor,
	getNoteById,
	createNote,
	updateNote,
	deleteNote,
	getRecentNotes,
};