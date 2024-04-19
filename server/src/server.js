const express = require("express");
const { json } = require("express");
const webserversRoutes = require("./routes");

const app = express();
const port = 3000;
app.use(json());

app.use("/api/v1/webservers", webserversRoutes);
app.use("/api/v2/requestdb", webserversRoutes);
app.listen(port, () => console.log('app listening on port ' + port));
