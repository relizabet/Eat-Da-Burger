$(function () {
  $(".eat-button").on("click", function (e) {
    const id = $(this).data("id");

    $.ajax(`/api/burgers/${id}`, {
      type: "PUT",
      data: { devoured: 1 },
    }).then(function () {
      console.log("eaten");
      location.reload();
    });
  });

  $(".check").on("submit", function (e) {
    e.preventDefault();
    const createBurger = {
      burger_name: $(".burger_input").val().trim(),
      devoured: 0,
    };

    $.ajax("/api/burgers", {
      type: "POST",
      data: createBurger,
    }).then(function () {
      console.log("created");
      location.reload();
    });
  });

  $(".delete-button").on("click", function (e) {
    const id = $(this).data("id");

    $.ajax(`/api/burgers/${id}`, {
      type: "DELETE",
    }).then(function () {
      location.reload();
    });
  });
});
