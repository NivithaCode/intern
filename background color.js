const button = document.getElementById("btn");

const colors = ["lightblue", "lightgreen", "pink", "yellow", "orange"];

button.addEventListener("click", function() {
  const random = Math.floor(Math.random() * colors.length);
  document.body.style.backgroundColor = colors[random];
});