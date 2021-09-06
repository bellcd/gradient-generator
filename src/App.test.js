import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { merge as _merge } from 'lodash';
import userEvent from '@testing-library/user-event';
import { gradientWords, defaultGradientOptions } from './constants/gradient-constants';
import messages from './translations/messages';
const {
  GRADIENT_TYPE,
  DEGREES,
  ENDING_SHAPE,
  CIRCLE,
  SIZE,
  X_POSITION,
  Y_POSITION
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
  describe('gradient options', () => {
    describe('gradientType', () => {
      it('displays an appropriate <select />', () => {
        setup();
        expect(screen.getByLabelText(GRADIENT_TYPE)).toBeInTheDocument();
        expect(screen.getByDisplayValue(gradientWords.LINEAR)).toBeInTheDocument();
      });
      it('Updates the gradient type onChange', () => {
        setup();
        const gradientTypeInput = screen.getByLabelText(GRADIENT_TYPE);
        expect(gradientTypeInput.value).toBe(defaultGradientOptions.gradientType);
        fireEvent.change(gradientTypeInput, { target: { value: gradientWords.RADIAL }});
        expect(gradientTypeInput.value).toBe(gradientWords.RADIAL);
      });
    });
    describe('degrees', () => {
      it('displays an appropriate <input />', () => {
        setup();
        expect(screen.getByLabelText(DEGREES)).toBeInTheDocument();
        expect(screen.getByDisplayValue(defaultGradientOptions.degrees)).toBeInTheDocument();
      });
      it('Updates the degrees onChange', () => {
        setup();
        const degreeInput = screen.getByLabelText(DEGREES);
        fireEvent.change(degreeInput, { target: { value: '91' }});
        expect(screen.getByDisplayValue('91')).toBeInTheDocument();
      });
    });
    describe('endingShape', () => {
      it('displays an appropriate <select />', () => {
        setup();
        expect(screen.getByLabelText(ENDING_SHAPE)).toBeInTheDocument();
        expect(screen.getByDisplayValue(CIRCLE)).toBeInTheDocument();
      });
      it('Updates the endingShape onChange', () => {
        setup();
        const endingShapeSelect = screen.getByLabelText(ENDING_SHAPE);
        expect(endingShapeSelect.value).toBe(gradientWords.CIRCLE);
        fireEvent.change(endingShapeSelect, { target: { value: gradientWords.ELLIPSE }});
        expect(endingShapeSelect.value).toBe(gradientWords.ELLIPSE);
      });
    });
    describe('size', () => {
      it('displays an appropriate <select />', () => {
        setup();
        expect(screen.getByLabelText(SIZE)).toBeInTheDocument();
        expect(screen.getByDisplayValue(defaultGradientOptions.size)).toBeInTheDocument();
      });
      it('Updates the size onChange', () => {
        setup();
        const sizeSelect = screen.getByLabelText(SIZE);
        expect(sizeSelect.value).toBe(defaultGradientOptions.size);
        fireEvent.change(sizeSelect, { target: { value: gradientWords.FARTHEST_SIDE }});
        expect(sizeSelect.value).toBe(gradientWords.FARTHEST_SIDE);
      });
    });
    describe('xPosition', () => {
      it('displays an appropriate <input />', () => {
        setup();
        expect(screen.getByLabelText(X_POSITION)).toBeInTheDocument();
        expect(screen.getByLabelText(X_POSITION).value).toBe(String(Math.round(defaultGradientOptions.xPosition * 100)));
      });
      it('Updates the xPosition onChange', () => {
        setup();
        const xPositionInput = screen.getByLabelText(X_POSITION);
        fireEvent.change(xPositionInput, { target: { value: 46 }});
        expect(screen.getByDisplayValue(Math.round(0.46 * 100))).toBeInTheDocument();
      });
    });
    describe('yPosition', () => {
      it('displays an appropriate <input />', () => {
        setup();
        expect(screen.getByLabelText(Y_POSITION)).toBeInTheDocument();
        expect(screen.getByLabelText(Y_POSITION).value).toBe(String(Math.round(defaultGradientOptions.yPosition * 100)));
      });
      it('Updates the yPosition onChange', () => {
        setup();
        const yPositionInput = screen.getByLabelText(Y_POSITION);
        fireEvent.change(yPositionInput, { target: { value: 46 }});
        expect(screen.getByDisplayValue(Math.round(0.46 * 100))).toBeInTheDocument();
      });
    });
  });
});
