import { Router } from "express";
import { getFirst10Notes, getAllBooks, createBook, updateBook, deleteBook, deleteNotes, updateNote, createNote, verifyFirstLibreta, createNoteDefault } from "../controllers/books.controller";
import bookValidator from "../validators/book-validator";
import { checkSchema } from "express-validator";
import validate from "../middlewares/validate";

const router = Router();


router.get("/verify/FirstLibreta", verifyFirstLibreta)

router.get("/notes/top10", getFirst10Notes);

// Crear nota en book por defecto
router.post("/notes", createNoteDefault)
// Crear nota por su id del book especifico
router.post("/books/:id/notes", createNote);
// Eliminar notas por su id del book especifico
router.delete("/books/:id/notes/:noteId", deleteNotes);
// Actualizar notas por su id del book especifico
router.put("/books/:id/notes/:noteId", updateNote);


router.get("/books", getAllBooks);
router.post("/books", checkSchema(bookValidator), validate,  createBook);
router.put("/books/:id", checkSchema(bookValidator), validate, updateBook);
router.delete("/books/:id", deleteBook);

export default router;

