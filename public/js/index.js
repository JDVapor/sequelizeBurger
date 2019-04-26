var $burgerText = $("#burger-text");
var $submitBtn = $("#submit");
var $burgerList = $("#burger-list");
var $devourBtn = $("#devour");

var API = {
  saveBurger: function(burger) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/burgers",
      data: JSON.stringify(burger)
    });
  },
  getBurgers: function() {
    return $.ajax({
      url: "api/burgers",
      type: "GET"
    });
  }
};

var refreshBurgers = function() {
  API.getBurgers().then(function(data) {
    var $burgers = data.map(function(burger) {
      var $a = $("<a>")
        .text(burger.text)
        .attr("href", "/burgers/" + burger.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": burger.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger")
        .text("Devour");

      $li.append($button);

      return $li;
    });

    $burgerList.empty();
    $burgerList.append($burgers);
  });
};

var handleFormSubmit = function(event) {
  event.preventDefault();

  var burger = {
    burger_name: $burgerText.val().trim(),
  };

  if (!burger.text) {
    alert("You forgot to make a burger, dude!");
    return;
  }

  API.saveBurger(burger).then(function() {
    refreshBurgers();
  });

  $burgerText.val("");
};

function devourBurger() {
  var id = $("#id").attr("value");
  console.log("devouring");
  $.ajax({
    method: "PUT",
    url: "/" + id
  }).done(function() {
    window.location.href = "/";
  });
};

$submitBtn.on("click", handleFormSubmit);
$devourBtn.on("click", devourBurger());
