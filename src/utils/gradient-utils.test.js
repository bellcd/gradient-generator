import {
  makeGradientString,
  makeGradientColorStopsString,
  combineGradientColorStopsStrings,
  randomColorGenerator,
} from './gradient-utils';
import {
  defaultColors,
  defaultGradientOptions,
  gradientWords
} from '../constants/gradient-constants';
import { merge as _merge } from 'lodash';

describe('gradient-utils', () => {
  describe('makeGradientString', () => {
    describe('linear', () => {
      it('returns a linear gradient string', () => {
        const result = makeGradientString(defaultColors, defaultGradientOptions);
        expect(result).toBe('linear-gradient(90deg, #ff0000 20%, #0000ff 50%, #6ecbfb 80%)')
      });
    });
    describe('radial', () => {
      it('returns a radial gradient string', () => {
        const gradientOptions = _merge({}, defaultGradientOptions, {
          gradientType: gradientWords.RADIAL
        });
        const result = makeGradientString(defaultColors, gradientOptions);
        expect(result).toBe('radial-gradient(circle closest-side at 50% 50%, #ff0000 20%, #0000ff 50%, #6ecbfb 80%)')
      });
    });
    describe('conic', () => {
      it('returns a radial gradient string', () => {
        const gradientOptions = _merge({}, defaultGradientOptions, {
          gradientType: gradientWords.CONIC
        });
        const result = makeGradientString(defaultColors, gradientOptions);
        expect(result).toBe('conic-gradient(from 90deg at 50% 50%, #ff0000 20%, #0000ff 50%, #6ecbfb 80%)')
      });
    });
  });
  describe('makeGradientColorStopsString', () => {
    it('no stops', () => {
      const color = {
        stopPositions: [],
      }
      expect(makeGradientColorStopsString(color)).toBe('');
    });
    it('one stop', () => {
      const color = {
        stopPositions: [0.10],
      }
      expect(makeGradientColorStopsString(color)).toBe(' 10%');
    });
    it('two stops', () => {
      const color = {
        stopPositions: [0.10, 0.25],
      }
      expect(makeGradientColorStopsString(color)).toBe(' 10% 25%');
    });
  });
  describe('combineGradientColorStopsStrings', () => {
    it('handles multiple colors with different amounts of color stops correctly', () => {
      const colors = [
        {
          color: '#ff0000',
          stopPositions: [0.10, 0.25]
        },
        {
          color: '#0000ff',
          stopPositions: [0.30]
        },
        {
          color: '#6ecbfb',
          stopPositions: []
        },
        {
          color: '#c3df7d',
          stopPositions: [0.95]
        },
      ];
      const result = combineGradientColorStopsStrings(colors);
      expect(result).toBe('#ff0000 10% 25%, #0000ff 30%, #6ecbfb, #c3df7d 95%')
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