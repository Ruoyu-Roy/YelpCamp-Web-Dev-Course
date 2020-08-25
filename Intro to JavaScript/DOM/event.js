let button = document.querySelector("button");
let body = document.querySelector("body");

button.addEventListener("click", function () {
  body.style.background = body.style.background === "white" ? "pink" : "white";
});
