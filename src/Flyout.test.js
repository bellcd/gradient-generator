import Flyout from './Flyout';
import { screen, render } from '@testing-library/react';
import { merge as _merge } from 'lodash';
import { defaultDegree } from './constants/gradient-constants';
import userEvent from '@testing-library/user-event';

describe('<Flyout />', () => {
  const defaultProps = {
    colors: [{
      color: '#ff0000',
      stopPositions: [0.20]
    }],
    setColors: jest.fn(),
    degrees: defaultDegree,
    setDegrees: jest.fn(),
    addOrRemoveStopPositionHandler: () => jest.fn(),
    stopPercentChangeHandler: () => jest.fn(),
    deleteColor: () => jest.fn()
  };
  const setup = props => render(<Flyout {..._merge({}, defaultProps, props)} />);
  describe('Flyout control button', () => {
    it('displays "close" when opened', () => {
      setup();
      expect(
        screen.getByRole('button', { name: 'close' })
      ).toBeInTheDocument();
    });
    it('displays "open" when closed', () => {
      setup();
      userEvent.click(screen.getByRole('button', { name: 'close' }))
      expect(
        screen.getByRole('button', { name: 'open' })
      ).toBeInTheDocument();
    });
  });
  describe('Flyout content', () => {
    it('displays the gradient string', () => {
      setup();
      const gradientString = 'linear-gradient(90deg, #ff0000 20%)';
      expect(
        screen.getByText(gradientString)
      ).toBeInTheDocument()
    });
    // TODO: implement
    xdescribe('Gradient type', () => {
      it('displays an appropriate <select />', () => {});
      it('Updates the selected gradient type onChange', () => {});
    });
  });
});