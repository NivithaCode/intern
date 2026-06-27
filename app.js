const input = document.getElementById("myInput");
const output = document.getElementById("output");

input.addEventListener("input", function() {
  output.textContent = input.value;
});