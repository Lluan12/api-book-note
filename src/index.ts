import app from "./app";
import { PORT } from "./config/conf";

import "./config/connection";

app.listen(PORT, () => {
    console.log("Listening in the port: " + PORT);
})