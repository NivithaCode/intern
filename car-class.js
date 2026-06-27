class Car {
  constructor(brand, model) {
    this.brand = brand;
    this.model = model;
  }
  describe() {
    console.log(`Car: ${this.brand} ${this.model}`);
  }
}
const myCar = new Car("Toyota", "Corolla");
myCar.describe();