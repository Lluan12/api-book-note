import { Router } from "express";
import { 
	getAllNotes, 
	getNotesByAuthor, 
	getNoteById, 
	createNote, 
	updateNote, 
	deleteNote, 
	getRecentNotes 
} from "../controllers/notes.controller";
import noteValidator from "../validators/note-validator";
import { checkSchema } from "express-validator";
import validate from "../middlewares/validate";

const router = Router();

// Get all notes
router.get("/", getAllNotes);

// Get recent notes by author (last 10)
router.get("/recent/:autor", getRecentNotes);

// Get notes by author
router.get("/:autor", getNotesByAuthor);

// Get a single note by ID
router.get("/note/:id", getNoteById);

// Create a new note
router.post("/", checkSchema(noteValidator), validate, createNote);

// Update a note
router.put("/:id", checkSchema(noteValidator), validate, updateNote);

// Delete a note
router.delete("/:id", deleteNote);

export default router;