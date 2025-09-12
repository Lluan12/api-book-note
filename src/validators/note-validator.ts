import { Schema } from "express-validator";

const noteValidator: Schema = {
	title: {
		trim: true,
		escape: true,
		isString: {
			errorMessage: "El título debe ser una cadena de texto",
		},
	},
	content: {
		isString: {
			errorMessage: "El contenido debe ser una cadena de texto",
		},
	},
	autor: {
		notEmpty: {
			errorMessage: "El autor es requerido",
		},
		trim: true,
		escape: true,
		isString: {
			errorMessage: "El autor debe ser una cadena de texto",
		},
	},
};

export default noteValidator;
