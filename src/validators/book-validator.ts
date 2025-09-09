import { Schema } from "express-validator";

const bookValidator:Schema = ({
	title: {
		notEmpty: {
			errorMessage: "El titulo es requerido",
		},
		trim: true,
		escape: true,
		isString: {
			errorMessage: "El titulo debe ser una cadena de texto",
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
});

export default bookValidator;