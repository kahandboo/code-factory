const DEFAULT_ASCII_RAMP = "@#%*+=-:. ";

const ASCII_WIDTH = 80;
const ASCII_HEIGHT = 40;

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

function getResizedImageData(image) {
  canvas.width = ASCII_WIDTH;
  canvas.height = ASCII_HEIGHT;
  
  ctx.drawImage(image, 0, 0, ASCII_WIDTH, ASCII_HEIGHT);
  
  return ctx.getImageData(0, 0, ASCII_WIDTH, ASCII_HEIGHT);
}

function mapImageDataToAscii(imageData, ramp) {
  const { data, width, height } = imageData;
  let asciiArt = "";
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * 4;
      const r = data[index];
      const g = data[index + 1];
      const b = data[index + 2];
  
      const brightness = (r + g + b) / 3;
  
      const rampIndex = Math.floor((brightness / 255) * (ramp.length - 1));
      asciiArt += ramp[rampIndex];
    }
    asciiArt += "\n";
  }
  return asciiArt;
}

export function convertImageToAscii(image, options = {}) {
  const ramp = options.ramp || DEFAULT_ASCII_RAMP;
  
  const imageData = getResizedImageData(image);
  const asciiArt = mapImageDataToAscii(imageData, ramp);
  
  return asciiArt;
}