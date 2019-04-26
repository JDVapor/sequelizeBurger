var db = require("../models");

module.exports = function(app) {

  app.post("/api/burgers", function(req, res) {
    db.Burger.create({
      burger_name: req.body.burger_name
    }).then(function(newBurger) {
      res.json(newBurger);
    }).catch(function(err) {
      res.json(err);
    });
  });

  app.put("/api/burgers/:id", function(req, res) {
    db.Burger.update({
      devoured: true
    }, {
      where: {
        id: req.params.id
      }
    }).then(function(results) {
      res.json(results);
    }).catch(function(err) {
      res.json(err);
    });
  });

};
