console.log("app is loading");
const express = require("express");
const app = express();
// used for json inside body
app.use(express.json());

const routeHelper = require("./routeHelper");

app.post("/users/register", (req, res) => {
  routeHelper.register(req, res);
});


app.post("/users/login", (req, res) => {
  routeHelper.login(req, res);
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
