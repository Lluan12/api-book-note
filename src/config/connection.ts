import mongoose from "mongoose";
import { MONGO_URI } from "./conf";

mongoose
	.connect(MONGO_URI)
	.then(() => {
		console.log("Connected");
	})
	.catch((err) => {
		console.log(err);
	});

export default mongoose;
