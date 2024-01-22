const express = require("express");
const http = require("http");
require("dotenv").config();
const connectDB = require("./db.js");
const path = require("path");
var bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 8080;

const server = http.createServer(app);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


app.get('/',(req,res)=>{
  return res.sendFile(path.join(__dirname,'public','index.html'))
})

app.use('/register',require('./routes/registrationHandler.js'))

async function startServer() {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log(`Listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}
startServer()