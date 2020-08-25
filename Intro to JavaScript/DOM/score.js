let playerOne = document.querySelector("#p1");
let p1score = 0;
let playerTwo = document.querySelector("#p2");
let p2score = 0;
let reset = document.querySelector("#reset");
let p1d = document.querySelector("#p1d");
let p2d = document.querySelector("#p2d");
let input = document.querySelector("input");
let limit = 5;
let limitd = document.querySelector("#limit");
let gameOver = false;

playerOne.addEventListener("click", function () {
  if (!gameOver) {
    p1score++;
    p1d.textContent = p1score;
    if (p1score === limit) {
      p1d.style.color = "green";
      gameOver = true;
    }
  }
});

playerTwo.addEventListener("click", function () {
  if (!gameOver) {
    p2score++;
    p2d.textContent = p2score;
    if (p2score === limit) {
      p2d.style.color = "green";
      gameOver = true;
    }
  }
});

function resett() {
  gameOver = false;
  p1score = 0;
  p1d.textContent = 0;
  p1d.style.color = "black";
  p2score = 0;
  p2d.textContent = 0;
  p2d.style.color = "black";
}

input.addEventListener("change", function () {
  limit = Number(this.value);
  limitd.textContent = limit;
  resett();
});

reset.addEventListener("click", function () {
  resett();
});
