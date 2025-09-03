let x;
let video;
let vScale = 16;
let message = ['MY SELF PORTRAIT'];

function setup() {
  createCanvas(1240, 1754); // A4 at 150 DPI
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width / vScale, height / vScale);

  x = width;
}

function draw() {
  background('black');
  video.loadPixels();

  for (let y = 0; y < video.height; y++) {
    for (let xPixel = 0; xPixel < video.width; xPixel++) {
      let index = ((video.width - xPixel - 1) + y * video.width) * 4;
      let r = video.pixels[index + 0];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];
      let bright = (r + g + b) / 3;
      let wRect = map(bright, 0, 255, 0, vScale);

      stroke('white');
      strokeWeight(1);
      fill('rgba(255, 0, 0, 1)');
      square(xPixel * vScale, y * vScale, wRect);
      fill('white');
      circle(xPixel * vScale, y * vScale, wRect);
    }
  }

  // Top black bar
  noStroke();
  fill('black');
  rect(0, 0, width, 100);

  // Scrolling text
  textSize(65);
  fill('white');
  text(message, x, 100 / 2 + 15);
  x -= 3.5;

  let textWidthVal = textWidth(message);
  if (x < -textWidthVal) {
    x = width;
  }
}

