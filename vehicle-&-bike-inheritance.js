class Vehicle {
  constructor(type, speed) {
    this.type = type;
    this.speed = speed;
  }
  move() {
    console.log(`${this.type} moves at ${this.speed} km/h`);
  }
}

class Bike extends Vehicle {
  constructor(speed, brand) {
    super("Bike", speed);
    this.brand = brand;
  }
  describe() {
    console.log(`${this.brand} bike going ${this.speed} km/h`);
  }
}
const myBike = new Bike(30, "Trek");
myBike.move();
myBike.describe();