//Require modules:
const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

//Set up express app:
const app = express();

//Set up express app:
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Define the static files folder
app.use(express.static(__dirname + "/public"));

// Creating Transporter to send e-mail:
let transporter = nodemailer.createTransport({
  service: "Hotmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

// Get requests:
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

// POST request from the form:
app.post("/post", function (req, res) {
  console.log(req.body);

  const dataDeHoje = new Date().toDateString();
  const message = {
    from: process.env.EMAIL,
    to: process.env.EMAILTO,
    subject: `E-Mail do Site - Portfolio - ${dataDeHoje}`,
    text: ` -- Informações: --
  
        Nome: ${req.body.name}
        E-mail: ${req.body.email}
        Mensagem: ${req.body.message}`,
  };

  transporter.sendMail(message, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  res.redirect("/");
});

// Server port requests:
let port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log("Listening...");
});
