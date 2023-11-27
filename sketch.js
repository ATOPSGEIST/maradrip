let img;
let droplets = [];

function preload() {
  img = loadImage('Marasmiling2.jpg'); // Replace with the path to your image
}

function setup() {
  createCanvas(400, 300); // Adjust the canvas size as needed
  img.resize(width, height); // Resize the image to match the canvas
  for (let i = 0; i < 10; i++) { // Adjust the number of droplets as needed
    droplets.push(new Droplet(random(width), random(height)));
  }
}

function draw() {
  background(100,100,50);
  img.loadPixels();

  for (let droplet of droplets) {
    droplet.update();
    droplet.applyDistortion();
  }

  img.updatePixels();
  image(img, 0, 0, width, height);
}

class Droplet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = random(5, 20);
    this.speedY = random(1, 5);
  }

  update() {
    this.y += this.speedY;
    if (this.y > height) {
      this.y = random(-100, -10);
    }
  }

  applyDistortion() {
    for (let i = -this.radius; i <= this.radius; i++) {
      for (let j = -this.radius; j <= this.radius; j++) {
        let xIndex = int(this.x + i);
        let yIndex = int(this.y + j);
        if (xIndex >= 0 && xIndex < width && yIndex >= 0 && yIndex < height) {
          let d = dist(i, j, 0, 0);
          if (d <= this.radius) {
            let xOffset = int(map(i, -this.radius, this.radius, -5, 5));
            let yOffset = int(map(j, -this.radius, this.radius, -5, 5));
            let sourceX = constrain(xIndex + xOffset, 0, width - 1);
            let sourceY = constrain(yIndex + yOffset, 0, height - 1);
            let sourceIndex = (sourceY * width + sourceX) * 4;
            let targetIndex = (yIndex * width + xIndex) * 4;

            img.pixels[targetIndex] = img.pixels[sourceIndex];
            img.pixels[targetIndex + 1] = img.pixels[sourceIndex + 1];
            img.pixels[targetIndex + 2] = img.pixels[sourceIndex + 2];
          }
        }
      }
    }
  }
}
