export const PartyPartyParty = [
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

export const NoParty = [
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
