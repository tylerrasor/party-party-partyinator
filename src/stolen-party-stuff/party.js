import getPixels from 'get-pixels'
import gifEncoder from 'gif-encoder'
import { toGreyscale } from './greyscale'

// The party palette. Party on, Sirocco!
export const partyColours = [
  [255, 141, 139],
  [254, 214, 137],
  [136, 255, 137],
  [135, 255, 255],
  [139, 181, 254],
  [215, 140, 255],
  [255, 140, 255],
  [255, 104, 247],
  [254, 108, 183],
  [255, 105, 104]
];

export const noPartyColours = [
  [128, 128, 128],
  [158, 158, 158],
  [187, 187, 187],
  [200, 200, 200],
  [187, 187, 187],
  [158, 158, 158],
  [128, 128, 128],
  [158, 158, 158],
  [187, 187, 187],
  [200, 200, 200],
];

/**
 * Writes a party version of the given input image to the specified output stream.
 * @param {string} inputFile the thing to be partyified
 * @param {stream.Writable} outputStream The stream where the partified image is to be written
 */
export async function createPartyImage(inputFile, outputStream, shouldIParty = true, speed = 100) {

  function processImage(err, pixels) {
    if (err) {
      console.log("Invalid image path..");
      console.log(err);
      return;
    }

    const {shape} = pixels;
    const greyscale = toGreyscale(pixels);
    const isGif = shape.length > 3
    const shapeWidth = shape[isGif ? 1 : 0]
    const shapeHeight = shape[isGif ? 2 : 1]
    const howManyFrames = isGif ? shape[0] : 1

    // Get pixels returns a 4d array for gifs
    const gif = new gifEncoder(shapeWidth, shapeHeight);

    gif.pipe(outputStream);

    gif.setDelay(speed);
    gif.setRepeat(0);
    gif.setTransparent("0x00FF00");
    gif.writeHeader();
    gif.on("readable", function () {
      gif.read();
    });

    function getPixelValue(arr, x, y, frameIndex) {
      if (x < 0 || x >= (frameIndex + 1) * shapeWidth || y < 0 || y >= (frameIndex + 1) * shapeHeight) {
        return -1;
      }

      return arr[x + y * shapeWidth];
    }

    function takeThePretties(frame, colour, g) {
      frame.push(g * colour[0] / 255)
      frame.push(g * colour[1] / 255)
      frame.push(g * colour[2] / 255)
      frame.push(255)
    }

    const addThePretties = (frame, colour, g) => {
      frame.push(g * colour[0] / 255);
      frame.push(g * colour[1] / 255);
      frame.push(g * colour[2] / 255);
      frame.push(255);
    }

    const addTheColours = (greyscale, frame, frameIndex, colourList, colourFunc) => {
      for (let y = frameIndex * shapeHeight; y < (frameIndex + 1) * shapeHeight; y += 1) {
        for (let x = 0; x < shapeWidth; x += 1) {
          let g = getPixelValue(greyscale, x, y, frameIndex);
          if (g === -1) {
            frame.push(0);
            frame.push(255);
            frame.push(0);
            frame.push(0);
          } else {
            g = g < 32 ? 32 : g;
            colourFunc(frame, colourList, g)
          }
        }
      }
    }

    const whatKindaColours = shouldIParty ? addThePretties : takeThePretties
    const colours = shouldIParty ? partyColours : noPartyColours

    for (var frameIndex = 0; frameIndex < howManyFrames; frameIndex += 1) {
      let frame = []

      if (howManyFrames > 1) {
        const coloursList = colours[frameIndex % colours.length]
        addTheColours(greyscale, frame, frameIndex, coloursList, whatKindaColours)
        gif.addFrame(frame)
        gif.flushData()
      } else {
        for(var colourIndex = 0; colourIndex < colours.length; colourIndex += 1) {
          addTheColours(greyscale, frame, frameIndex, colours[colourIndex], whatKindaColours)
          gif.addFrame(frame)
          gif.flushData()
          frame = []
        }
      }
    }

    gif.finish();
  }

  return new Promise(resolve => {
    const reader = new FileReader()
    reader.onloadend = () => {
      let buffer = Buffer.from(reader.result)

      getPixels(buffer, inputFile.type, (err, pixels) => {
        processImage(err, pixels)
        console.log('done')
        resolve()
      })
    }

    reader.readAsArrayBuffer(inputFile)
  })
}
