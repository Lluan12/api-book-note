import mongoose from "mongoose";

mongoose
	.connect("")
	.then(() => {
		console.log("Connected");
	})
	.catch((err) => {
		console.log(err);
	});

export default mongoose;
