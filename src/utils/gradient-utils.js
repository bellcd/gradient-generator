export const makeGradientString = (colors, degrees) => {
  const colorString = colors.reduce((acc, currentValue) => {
    return `${acc}, ${currentValue}`
  });
  return `linear-gradient(${degrees}deg, ${colorString})`;
};

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