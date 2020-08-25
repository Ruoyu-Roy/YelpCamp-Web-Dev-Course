let game = {};
game.init = function () {
  setUpModeBtns();
  setUpResetBtn();
  setUpSquares();
  newGame(6);
};

let colors = [];
let pickedColor;
// mode: easy = 3, hard = 6
let modeSize = 6;

let squares = document.querySelectorAll(".square");
let colorDisplay = document.getElementById("colorDisplay");
let messageDisplay = document.querySelector("#message");
let h1 = document.querySelector("h1");
let resetButton = document.querySelector("#reset");
let modeBtns = document.querySelectorAll(".mode");

game.init();

function setUpResetBtn() {
  resetButton.addEventListener("click", function () {
    newGame(modeSize);
  });
}

function setUpSquares() {
  for (let i = 0; i < squares.length; i++) {
    // add initial colors to squares
    squares[i].style.backgroundColor = colors[i];

    // add click listener to squares
    squares[i].addEventListener("click", function () {
      clickedColor = this.style.backgroundColor;
      if (clickedColor === pickedColor) {
        messageDisplay.textContent = "Correct!";
        changeColors(clickedColor);
        h1.style.backgroundColor = pickedColor;
        resetButton.textContent = "Play Again?";
      } else {
        this.style.backgroundColor = "#232323";
        messageDisplay.textContent = "Try Again";
      }
    });
  }
}

function setUpModeBtns() {
  for (let i = 0; i < modeBtns.length; i++) {
    modeBtns[i].addEventListener("click", function () {
      for (let j = 0; j < modeBtns.length; j++) {
        modeBtns[j].classList.remove("selected");
      }
      this.classList.add("selected");
      this.textContent === "Easy" ? (modeSize = 3) : (modeSize = 6);
      newGame(modeSize);
    });
  }
}

function newGame(numOfColors) {
  // reset h1's background color
  h1.style.backgroundColor = "steelblue";
  // reset the message text
  messageDisplay.textContent = "";
  // reset the button's text
  resetButton.textContent = "New Colors";
  // generate all new colors
  colors = generateRandomColors(numOfColors);
  // pick a new random color from array
  pickedColor = pickColor();
  // change colorDisplay to macth picked color
  colorDisplay.textContent = pickedColor;
  // change colors of squares
  resetSquaresColor();
}

function resetSquaresColor() {
  for (let i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.backgroundColor = colors[i];
      squares[i].style.display = "block";
    } else {
      squares[i].style.display = "none";
    }
  }
}

function changeColors(color) {
  for (let i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = color;
  }
}

function pickColor() {
  let random = Math.floor(Math.random() * colors.length);

  return colors[random];
}

function generateRandomColors(numOfColors) {
  // make an array
  let arr = [];
  // add num random colors to array
  for (let i = 0; i < numOfColors; i++) {
    // get random colors and push into arr
    arr.push(randomColor());
  }
  // return that array
  return arr;
}

function randomColor() {
  // pick a 'red' from 0 - 255
  let r = Math.floor(Math.random() * 256);
  // pick a 'green' from 0 - 255
  let g = Math.floor(Math.random() * 256);
  // pick a 'blue' from 0 - 255
  let b = Math.floor(Math.random() * 256);

  return "rgb(" + r + ", " + g + ", " + b + ")";
}
