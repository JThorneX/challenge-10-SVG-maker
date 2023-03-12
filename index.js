const inquirer = require("inquirer");
const fs = require("fs");
const { Circle, Triangle, Square } = require("./lib/shapes");

//questions array to present to user
const questions = [
  {
    type: "input",
    message: "Type 3 or less characters: ",
    name: "text",
    // validate: (input) => {
    //   input.length < 4
    //     ? true
    //     : console.log("You cannot enter more than 3 characters");
    // },
  },
  {
    type: "input",
    message: "Type a color by name or hexadecimal for the text: ",
    name: "textColor",
  },
  {
    type: "input",
    message: "Type a color by name or hexadecimal for the shape: ",
    name: "shapeColor",
  },
  {
    type: "list",
    message: "Select a shape:",
    name: "shapes",
    choices: ["Circle", "Square", "Triangle"],
  },
];

class SVG {
  constructor() {
    this.text = "";
    this.shapes = "";
  }
  setText(text, textColor) {
    if (text.length > 3) {
      console.log("Must be less than 3 characters");
    }
    this.text = `<text x="150" y="115" font-size="60" text-anchor="middle" fill="${textColor}">${text}</text>`;
  }
  setShape(shapes) {
    this.shapes = shapes.render();
  }
  render() {
    return `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">${this.shapes}${this.text}</svg>`;
  }
}

//questions prompt
function init() {
  inquirer.prompt(questions).then((response) => {
    console.log("response= ", response);
    fs.writeFile(`logo.svg`, generateSVG(response), (err) => {
      err ? false : console.log("Generated logo.svg");
    });
    // generateSVG(
    //   response.text,
    //   response.textColor,
    //   response.shapeColor,
    //   response.shapes
    // );
  });
}

//logo generator
// function generateSVG(text, textColor, shapeColor, shapes) {
//   let shape;
//   let genShape;
//   switch (shapes) {
//     case "Circle":
//       shape.setText(text);
//       shape.setText(textColor);
//       shape = new Circle();
//       shape.setColor(shapeColor);
//       genShape += shape.render();
//       break;
//     case "Square":
//       shape.setText(text, textColor);
//       shape = new Square();
//       shape.setColor(shapeColor);
//       genShape += shape.render();
//       break;
//     case "Triangle":
//       shape.setText(text, textColor);
//       shape = new Triangle();
//       shape.setColor(shapeColor);
//       genShape += shape.render();
//       break;
//   }

function generateSVG(response) {
  if (response.shapes === "Circle") {
    const shape = new SVG();
    shape.setText(response.text, response.textColor);
    const newCircle = new Circle();
    newCircle.setColor(response.shapeColor);
    shape.setShape(newCircle);
    return shape.render();
  } else if (response.shapes === "Square") {
    const shape = new SVG();
    shape.setText(response.text, response.textColor);
    const newSquare = new Square();
    newSquare.setColor(response.shapeColor);
    shape.setShape(newSquare);
    return shape.render();
  } else {
    const shape = new SVG();
    shape.setText(response.text, response.textColor);
    const newTriangle = new Triangle();
    newTriangle.setColor(response.shapeColor);
    shape.setShape(newTriangle);
    return shape.render();
  }
}

init();
