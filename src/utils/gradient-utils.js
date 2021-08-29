// TODO: update tests
export const makeGradientString = (colors, {
  gradientType,
  degrees,
  endingShape,
  size,
  xPosition,
  yPosition
}) => {
  const colorString = colors.reduce((acc, colorObj, i) => {
    return `${acc}${i === 0 ? '' : ', '}${colorObj.color}${makeGradientColorStops(colorObj)}`
  }, '');

  let gradientString;
  if (gradientType === 'linear') {
    gradientString = `linear-gradient(${degrees}deg, ${colorString})`;
  } else if (gradientType === 'radial') {
    // TODO: improvement, allow using keywords (several spots)
    // TODO: add tests around radial gradients
    // radial-gradient
      // [ <ending-shape> || <size> ]? [ at <position> ]?, <color-stop-list>
      // [ <ending-shape> || <size> ]? [ at <position> ]? ,<color-stop-list>
      // <ending-shape> is either circle or ellipse
      // if circle
        // <size> must be a length (ie, not a percent)
      // if ellipse
        // <size> must be two percents, cannot be negative
    gradientString = `radial-gradient(${endingShape} ${size} at ${Math.round(xPosition * 100)}% ${Math.round(yPosition * 100)}%, ${colorString})`;

  } else if (gradientType === 'conic') {

  }

  return gradientString;
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