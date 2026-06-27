let student = {
  name: 'Nivi',
  age: 19,
  marks: {
    math: 100,
    science: 97,
    english: 95,
    history: 85
  }
};

const studentCopy = { ...student };

console.log("Original:", studentCopy);
console.log("Name:", studentCopy.name);
console.log("Age:", studentCopy.age);
console.log("Math:", studentCopy.marks.math);
console.log("Science:", studentCopy.marks.science);
console.log("English:", studentCopy.marks.english);
console.log("History:", studentCopy.marks.history);