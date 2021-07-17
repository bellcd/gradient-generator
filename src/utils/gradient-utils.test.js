import {
  makeGradientString,
  makeGradientColorStops,
  randomColorGenerator
} from './gradient-utils';
import { defaultColors, defaultDegree } from '../constants/gradient-constants';

describe('gradient-utils', () => {
  describe('makeGradientString', () => {
    it('returns a linear gradient string', () => {
      const result = makeGradientString(defaultColors, defaultDegree);
      expect(result).toBe('linear-gradient(90deg, #ff0000 20%, #0000ff 50%, #6ecbfb 80%)')
    });
    it('handles multiple colors with different amounts of color stops correctly', () => {
      const colors = [
        {
          color: '#ff0000',
          stopPositions: [0.10, 0.25],
          desiredStopPositions: 2
        },
        {
          color: '#0000ff',
          stopPositions: [0.30],
          desiredStopPositions: 1
        },
        {
          color: '#6ecbfb',
          stopPositions: [],
          desiredStopPositions: 0
        },
        {
          color: '#c3df7d',
          stopPositions: [0.95],
          desiredStopPositions: 1
        },
      ];
      const result = makeGradientString(colors, 100);
      expect(result).toBe('linear-gradient(100deg, #ff0000 10% 25%, #0000ff 30%, #6ecbfb, #c3df7d 95%)')
    });
  });
  describe('makeGradientColorStops', () => {
    it('no stops', () => {
      const color = {
        stopPositions: [],
      }
      expect(makeGradientColorStops(color)).toBe('');
    });
    it('one stop', () => {
      const color = {
        stopPositions: [0.10],
      }
      expect(makeGradientColorStops(color)).toBe(' 10%');
    });
    it('two stops', () => {
      const color = {
        stopPositions: [0.10, 0.25],
      }
      expect(makeGradientColorStops(color)).toBe(' 10% 25%');
    });
  });
  describe('randomColorGenerator', () => {
    it('creates a hexadecimal color', () => {
      const regex = /#[0-9a-f]{6}/;
      const hexadecimalColor = randomColorGenerator();
      expect(regex.test(hexadecimalColor)).toBe(true);
    });
  });
});