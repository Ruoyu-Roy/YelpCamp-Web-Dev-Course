// Check off Specific Todos By Clicking
$("ul").on("click", "li", function () {
  // if li is checked
  $(this).toggleClass("completed");
});

// Click on X to delete Todo
$("ul").on("click", "span", function (event) {
  $(this)
    .parent()
    .fadeOut(500, function () {
      $(this).remove();
    });
  event.stopPropagation();
});

$("input[type='text']").on("keypress", function (event) {
  if (event.which === 13) {
    // grabbing new todo text from input
    let todoText = $(this).val();
    $(this).val("");
    // create a new li and add to ul
    $("ul").append(
      "<li><span><i class='fas fa-trash'></i></span> " + todoText + "</li>"
    );
  }
});

$(".fa-plus-square").on("click", function () {
  $("input[type='text']").fadeToggle();
});
