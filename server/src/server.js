const express = require("express");
const { json } = require("express");
const cors = require('cors');
const webserversRoutes = require("./routes");

const app = express();
const port = 3030;
app.use(cors());
app.use(json());


app.use("/api/v1/webservers", webserversRoutes);
app.use("/api/v2/requestdb", webserversRoutes);
app.listen(port, () => console.log('app listening on port ' + port));
