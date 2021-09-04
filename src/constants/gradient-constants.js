export const defaultColors = [
  {
    color: '#ff0000',
    stopPositions: [0.20]
  },
  {
    color: '#0000ff',
    stopPositions: [0.50]
  },
  {
    color: '#6ecbfb',
    stopPositions: [0.80]
  },
];

export const inputPattern = '#[a-fA-F0-9]{6}';


// TODO: better name?
export const gradientWords = {
  RADIAL: 'radial',
  LINEAR: 'linear',
  CONIC: 'conic' ,
  DEGREES: 'degrees',
  ENDING_SHAPE: 'ending-shape',
  SIZE: 'size',
  X_POSITION: 'x-position',
  Y_POSITION: 'y-position'
}

export const defaultGradientOptions = {
  gradientType: gradientWords.LINEAR,
  degrees: 90,
  endingShape: 'circle',
  size: 'closest-side',
  xPosition: 0.50,
  yPosition: 0.50,
};