const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true })); //falseuthorId

app.use(express.json());  // body parser data json

// app.set('view engine', 'ejs');

app.use(require("./routes")); 

app.listen(port, () => {
  console.log(`Server can be accessed in   http://localhost:${port}`)
})