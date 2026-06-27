const button = document.getElementById("btn");
let count = 0;

button.addEventListener("click", function() {
  count++;
  document.getElementById("counter").textContent = count;
});