const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");
app.listen(3000, () => console.log("Server start"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "15MB" }));
app.use("/public", express.static(__dirname + "/public"));

app.post("/", (req, res) => {
  fs.writeFile("./public/"+`${req.body.name}`+".png", req.body.imgsource, "base64", (err) => { //req.body.name: Ma mon an, 
    if (err) throw err;
  });
  res.status(200);
  console.log("Post complete");
});
