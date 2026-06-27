function printMessage(callback) {
  setTimeout(callback, 2000);
}
printMessage(() => console.log("Hello after 2 seconds!"));