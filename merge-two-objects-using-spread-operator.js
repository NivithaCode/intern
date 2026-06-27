let student = {
  name: 'Nivi',
  age: 19,
  marks: 100
};

const extra = {
  city: 'Chennai',
  grade: 'A',
  passed: true
};

const merged = { ...student, ...extra };

console.log("Merged Object:", merged);