/*const user = {
  name: "Rakshit",
  age: 19,
  isloggedin: true,
  city: "Jaipur",
  greet: function () {
    console.log(`Hello, my name is ${this.name} `);
  }
};

console.log(user);  */

/*
const jsonData = '{"name": "John", "age": 30, "city": "New York"}';

const student = JSON.parse(jsonData);

console.log(student);
console.log(student.name); 
console.log(student.age);
consople.log(student.city); */

/* const student = {
  name: "Priya",
  age: 30,
  course: "JavaScript",
};

const jsonString = JSON.stringify(student);

console.log(jsonString);
console.log(typeof student);
console.log(typeof jsonString); */

async function getPosts() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts/1"
  );

  const data = await response.json();
  console.log(data);
}

getPosts();