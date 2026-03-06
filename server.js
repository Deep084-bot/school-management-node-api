const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const schoolRoutes = require("./routes/schools");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/", schoolRoutes);

// app.listen(3000, () => {
//   console.log("Server running on port 3000");
// });
// As we need to deploy so we need to make the port such that it is accessible and commertial ready
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 
app.get("/", (req, res) => {
  res.send("School API is running");
});