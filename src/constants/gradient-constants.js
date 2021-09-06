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
  Y_POSITION: 'y-position',
  GRADIENT_TYPE: 'gradient-type',
  CIRCLE: 'circle',
  ELLIPSE: 'ellipse',
  CLOSEST_SIDE: 'closest-side',
  FARTHEST_SIDE: 'farthest-side',
  CLOSEST_CORNER: 'closest-corner',
  FARTHEST_CORNER: 'farthest-corner',
}

export const defaultGradientOptions = {
  gradientType: gradientWords.LINEAR,
  degrees: 90,
  endingShape: gradientWords.CIRCLE,
  size: gradientWords.CLOSEST_SIDE,
  xPosition: 0.50,
  yPosition: 0.50,
};