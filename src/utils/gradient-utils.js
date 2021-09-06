import { gradientWords } from "../constants/gradient-constants";
const { LINEAR, RADIAL, CONIC } = gradientWords;

export const makeGradientString = (colors, {
  gradientType,
  degrees,
  endingShape,
  size,
  xPosition,
  yPosition
}) => {
  const colorString = combineGradientColorStops(colors);
  let gradientString;

  if (gradientType === LINEAR) {
    gradientString = `${LINEAR}-gradient(${degrees}deg, ${colorString})`;
  } else if (gradientType === RADIAL) {
    // TODO: improvement, allow using keywords (several spots)
    // radial-gradient
      // [ <ending-shape> || <size> ]? [ at <position> ]?, <color-stop-list>
      // [ <ending-shape> || <size> ]? [ at <position> ]? ,<color-stop-list>
      // <ending-shape> is either circle or ellipse
      // if circle
        // <size> must be a length (ie, not a percent)
      // if ellipse
        // <size> must be two percents, cannot be negative
    gradientString = `${RADIAL}-gradient(${endingShape} ${size} at ${Math.round(xPosition * 100)}% ${Math.round(yPosition * 100)}%, ${colorString})`;
  } else if (gradientType === CONIC) {
    gradientString = `${CONIC}-gradient(from ${degrees}deg at ${Math.round(xPosition * 100)}% ${Math.round(yPosition * 100)}%, ${colorString})`;
  }

  return gradientString;
};

export const combineGradientColorStops = colors => {
  return colors.reduce((acc, colorObj, i) => {
    return `${acc}${i === 0 ? '' : ', '}${colorObj.color}${makeGradientColorStops(colorObj)}`
  }, '');
};

export const makeGradientColorStops = colorObj => {
  return colorObj.stopPositions.length > 0 ? (
    colorObj.stopPositions.reduce((allStops, currentStop, j) => {
      return `${allStops}${j === 0 ? '' : ' '}${currentStop * 100}%`
    }, ' ')
  ) : '';
}

export const randomColorGenerator = () => {
  const array = [];
  const letters = ['a', 'b', 'c', 'd', 'e', 'f'];
  let alphanumeric;
  for (let i = 0; i < 6; i++) {
    alphanumeric = Math.random() <= 0.5 ?
      Math.floor(Math.random() * 10) :
      letters[Math.floor(Math.random() * 6)]
    array.push(alphanumeric);
  }
  return array.reduce((acc, current) => `${acc}${current}`, '#');
}