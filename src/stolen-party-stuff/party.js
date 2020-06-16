import getPixels from 'get-pixels'
import gifEncoder from 'gif-encoder'
import { toGreyscale } from './greyscale'

/**
 * Writes a party version of the given input image to the specified output stream.
 * @param {string} inputFile the thing to be partyified
 * @param {stream.Writable} outputStream The stream where the partified image is to be written
 */
export async function createPartyImage(inputFile, outputStream, colors, speed = 100) {

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

    const addTheColours = (greyscale, frame, frameIndex, colourList) => {
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
            frame.push(g * colourList[0] / 255)
            frame.push(g * colourList[1] / 255)
            frame.push(g * colourList[2] / 255)
            frame.push(255)
          }
        }
      }
    }

    for (var frameIndex = 0; frameIndex < howManyFrames; frameIndex += 1) {
      let frame = []

      if (howManyFrames > 1) {
        const coloursList = colors[frameIndex % colors.length]
        addTheColours(greyscale, frame, frameIndex, coloursList)
        gif.addFrame(frame)
        gif.flushData()
      } else {
        for(var colourIndex = 0; colourIndex < colors.length; colourIndex += 1) {
          addTheColours(greyscale, frame, frameIndex, colors[colourIndex])
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
