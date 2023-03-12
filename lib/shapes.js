class Shape {
  constructor() {
    this.shapeColor = "";
  }
  setColor(shapeColor) {
    this.shapeColor = `fill="${shapeColor}"/>`;
  }
}

class Circle extends Shape {
  render() {
    return `<circle cx="150" cy="100" r="80" ${this.shapeColor}`;
  }
}

class Square extends Shape {
  render() {
    return `<rect width="120" height="120" x="90" y="40" ${this.shapeColor}`;
  }
}

class Triangle extends Shape {
  render() {
    return `<polygon points="150, 18 244, 182 56, 182" ${this.shapeColor}`;
  }
}

module.exports = { Circle, Square, Triangle };
