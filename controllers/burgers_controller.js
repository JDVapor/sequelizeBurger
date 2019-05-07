var express = require("express");
var router = express.Router();

let db = require("../models");

router.get("/", function(req, res) {
  db.Burger.findAll({}).then(function(burgers) {
      res.render("index", { burger: burgers });
    });
});

router.post("/", function(req, res) {

  db.Burger.create({
    burger_name: req.body.burger_name
  })
    .then(function() {
      return res.redirect("/");
  });

});

router.put("/", function(req, res) {
  db.Burger.update(
    {
     devoured: true
    },
    {
     where: {
       id: req.body.id
     }
    }).then(function() {
      return res.redirect('/');
    });
  });



module.exports = router;
