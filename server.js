require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
app.use(express.static("public"));

app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

var burgerRoutes = require("./controllers/burgers_controller.js");

app.use('/burgers', burgerRoutes);

app.get('/*', (req, res) => {
  res.redirect('/burgers');
})

var syncOptions = {
  force: false
};

if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
