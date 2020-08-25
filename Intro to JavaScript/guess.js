let target = 55;

while ((guess = Number(prompt("Give a guess!")) !== target)) {
  if (guess < target) {
    alert("your guess is low");
  } else if (guess > target) {
    alert("your guess is high");
  }
}

alert("you got it right!");
