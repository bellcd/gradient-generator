export const makeGradientString = (colors, degrees) => {
  const colorString = colors.reduce((acc, colorObj, i) => {
    return `${acc}${i === 0 ? '' : ', '}${colorObj.color}${makeGradientColorStops(colorObj)}`
  }, '');
  return `linear-gradient(${degrees}deg, ${colorString})`;
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