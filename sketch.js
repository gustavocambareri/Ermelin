let canvas;
let mousecoordinate;
let syntfont;
let colorA;
let colorB;
let currentColor;
let sound;

let dots = [];

function preload() {
  syntfont = loadFont;

  sound = loadSound("pazzo.wav");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  sound.play();

  for (let i = 0; i < 3; i++) {
    dots[i] = new Dot();
  }

  canvas.position(0, 0);
  canvas.style("z-index", "-1");

  colorA = color(255, 0, 0);
  colorB = color(0, 255, 0);
  currentColor = colorA;
}

function draw() {
  background(255);
  stroke(currentColor);
  let delta = (millis() / 1000) % 20;
  if (delta < 10) {
    currentColor = lerpColor(colorA, colorB, delta / 10);
  } else {
    currentColor = lerpColor(colorB, colorA, (delta - 10) / 10);
  }

  push();
  fill(currentColor);
  circle(mouseX, mouseY, 40);
  mousecoordinate = mouseX;
  pop();

  textSize(30);
  text(nfc(mousecoordinate, 0), mouseX, mouseY);

  for (let i = 0; i < dots.length; i++) {
    dots[i].update();
    dots[i].display();
    line(dots[i].x, dots[i].y, mouseX, mouseY);
  }
}

class Dot {
  constructor() {
    this.x = random(width);
    this.y = random(height);
  }

  update() {}

  display() {
    ellipse(this.x, this.y, 5, 5);
  }
}
