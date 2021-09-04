import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { merge as _merge } from 'lodash';
import userEvent from '@testing-library/user-event';
import { gradientWords, defaultGradientOptions } from './constants/gradient-constants';
import messages from './translations/messages';
const {
  GRADIENT_TYPE
} = messages;

describe('<App />', () => {
  const defaultProps = {};
  const setup = props => render(<App {..._merge({}, defaultProps, props)} />);
  describe('addOrRemoveStopPositionHandler', () => {
    it('removes a stop position', () => {
      setup();
      const STOP_POSITION_TEST_ID = 'stop-position-0-color-0-delete-button';
      userEvent.click(screen.getByTestId(STOP_POSITION_TEST_ID));
      expect(
        screen.queryByTestId(STOP_POSITION_TEST_ID)
      ).toBe(null);
    });
    it('adds a stop position', () => {
      setup();
      expect(
        screen.queryByTestId('stop-position-0-color-0')
      ).toBeInTheDocument();
      expect(
        screen.queryByTestId('stop-position-1-color-0')
      ).toBe(null);

      userEvent.click(screen.getByTestId('color-0-add-stop-position'));
      expect(
        screen.queryByTestId('stop-position-1-color-0')
      ).toBeInTheDocument();
    });
  });
  it('stopPercentChangeHandler updates the stop percent', () => {
    setup();
    const input = screen.getByTestId('stop-position-0-color-0');
    fireEvent.change(input, { target: { value: '35' }});
    expect(screen.getByDisplayValue('35')).toBeInTheDocument();
  });
  it('deleteColor deletes the color', () => {
    setup();
    const button = screen.getByTestId('color-0-delete-button');
    expect(screen.getAllByDisplayValue('#ff0000')).toHaveLength(2);
    userEvent.click(button);
    expect(screen.queryByDisplayValue('#ff0000')).toBe(null);
  });
  // TODO: implement logic
  it('inputChangeHandler updates the color', () => {});
  describe('Add a color', () => {
    it('displays an appropriate button', () => {
      setup();
      expect(screen.getByText('Add a random color')).toBeInTheDocument();
    });
    it('adds a random color on click', () => {
      setup();
      expect(screen.getAllByText(/color-[0-9]/)).toHaveLength(3);
      userEvent.click(screen.getByText('Add a random color'));
      expect(screen.getAllByText(/color-[0-9]/)).toHaveLength(4);
    });
  });
  // TODO: adds tests for each input type
  // TODO: size, xPosition, & yPosition
    // exists
    // disabled or not, handled in Flyout tests
    // click handler functions correctly
  describe('gradient options', () => {
    describe('gradient type', () => {
      it('displays an appropriate <input />', () => {
        setup();
        expect(screen.getByLabelText(GRADIENT_TYPE)).toBeInTheDocument();
        expect(screen.getByDisplayValue(gradientWords.LINEAR)).toBeInTheDocument();
      });
      it('Updates the gradient type onChange', () => {
        setup();
        const gradientTypeInput = screen.getByDisplayValue(gradientWords.LINEAR);
        fireEvent.change(gradientTypeInput, { target: { value: gradientWords.RADIAL }});
        expect(screen.getByDisplayValue(gradientWords.RADIAL)).toBeInTheDocument();
      });
    });
    describe('degrees', () => {
      it('displays an appropriate <input />', () => {
        setup();
        expect(screen.getByLabelText(gradientWords.DEGREES)).toBeInTheDocument();
        expect(screen.getByDisplayValue(defaultGradientOptions.degrees)).toBeInTheDocument();
      });
      it('Updates the degrees onChange', () => {
        setup();
        const degreeInput = screen.getByDisplayValue(defaultGradientOptions.degrees);
        fireEvent.change(degreeInput, { target: { value: '91' }});
        expect(screen.getByDisplayValue('91')).toBeInTheDocument();
      });
    });
  });
});
