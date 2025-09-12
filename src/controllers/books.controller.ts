import { Request, Response } from "express";
import _books from "../models/book.model";

async function getAllBooks(req: Request, res: Response) {
	const { autor } = req.params;
	try {
		const books = await _books.find({ autor });
		res.status(200).json(books);
	} catch (error) {
		res.status(404).json(error);
	}
}

async function createBook(req: Request, res: Response) {
	try {
		const exists = await _books.findOne({ title: req.body.title });
		if (exists) {
			res.status(400).json({ message: "Esta libreta ya existe" });
			return;
		}
		const book = await _books.create(req.body);
		res.status(201).json(book);
	} catch (error) {
		res.status(500).json(error);
	}
}

async function getFirst10Notes(req: Request, res: Response) {
	const { autor } = req.params;
	try {
		const notes = await _books.aggregate([
			{ $unwind: "$notes" },
			{ $sort: { "notes.created": -1 } },
			{ $match: { "notes.autor": autor } }, // filtra por autor
			{ $limit: 10 },
			{ $replaceRoot: { newRoot: "$notes" } },
		]);

		res.status(200).json(notes);
	} catch (error) {
		res.status(500).json(error);
	}
}

async function updateBook(req: Request, res: Response) {
	try {
		const book = await _books.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		res.status(200).json(book);
	} catch (error) {
		res.status(500).json(error);
	}
}

async function deleteBook(req: Request, res: Response) {
	try {
		await _books.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: "Libro eliminado correctamente" });
	} catch (error) {
		res.status(500).json(error);
	}
}

// Eliminar notas por su id del book especifico
async function deleteNotes(req: Request, res: Response) {
	try {
		await _books.findByIdAndUpdate(req.params.id, {
			$pull: { notes: { _id: req.params.noteId } },
		});
		res.status(200).json({ message: "Nota eliminada correctamente" });
	} catch (error) {
		res.status(500).json(error);
	}
}

async function updateNote(req: Request, res: Response) {
	try {
		await _books.findByIdAndUpdate(req.params.id, {
			$set: {
				"notes.$.title": req.body.title,
				"notes.$.content": req.body.content,
				"notes.$.updated": new Date(),
			},
		});
		res.status(200).json({ message: "Nota actualizada correctamente" });
	} catch (error) {
		res.status(500).json(error);
	}
}

async function createNote(req: Request, res: Response) {
	try {
		const book = await _books.findByIdAndUpdate(req.params.id, {
			$push: { notes: req.body },
		});
		res.status(200).json({ message: "Nota creada correctamente" });
	} catch (error) {
		res.status(500).json(error);
	}
}

async function createNoteDefault(req: Request, res: Response) {
	const { autor } = req.params;
	const newNote = {
		title: "",
		content: "",
		created: new Date(Date.now()),
		updated: new Date(Date.now()),
	};
	try {
		const book = await _books.findOneAndUpdate(
			{ title: "Primera Libreta", autor },
			{
				$push: { notes: newNote },
			},
			{ new: true }
		);

		if (!book) {
			return res.status(404).json({ message: "Book no encontrado" });
		}

		// La última nota es la recién creada
		const note = book.notes[book.notes.length - 1];
		res.status(200).json(note);
	} catch (error) {
		res.status(500).json(error);
	}
}

async function verifyFirstLibreta(req: Request, res: Response) {
	const { autor } = req.params;
	try {
		const book = await _books.findOne({ title: "Primera Libreta", autor });
		if (book) {
			res.sendStatus(200);
			return;
		}
		await _books.create({
			title: "Primera Libreta",
			autor,
			created: new Date(Date.now()),
			updated: new Date(Date.now()),
			notes: [],
		});
		res.status(201).json({ message: "Ok" });
	} catch (error) {
		res.status(500).json(error);
	}
}

export {
	getAllBooks,
	getFirst10Notes,
	createBook,
	updateBook,
	deleteBook,
	deleteNotes,
	updateNote,
	createNote,
	verifyFirstLibreta,
	createNoteDefault,
};
