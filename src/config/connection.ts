import mongoose from "mongoose";
import { MONGO_URI, DB_NAME } from "./conf";

mongoose
	.connect(MONGO_URI, { dbName: DB_NAME })
	.then(() => {
		console.log("Connected");
	})
	.catch((err) => {
		console.log(err);
	});

export default mongoose;
