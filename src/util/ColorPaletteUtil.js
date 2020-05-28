export const ColorObjPlease = (RGBColors) => {
  return RGBColors.map(color => ({ rgb: { r: color[0], g: color[1], b: color[2], a: 1}, hex: rgbToHex(color[0], color[1], color[2])}))
}

export const RGBArrayPlease = (ColorObjs) => {
  return ColorObjs.map(color => [color.rgb.r,color.rgb.g,color.rgb.b])
}

// Being a professional developer just means knowing what you need to copy from stack overflow
function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}