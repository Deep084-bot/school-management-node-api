const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const schoolRoutes = require("./routes/schools");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/", schoolRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
app.get("/", (req, res) => {
  res.send("School API is running");
});