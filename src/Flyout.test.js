import Flyout from './Flyout';
import { screen, render, fireEvent } from '@testing-library/react';
import { merge as _merge } from 'lodash';
import { AppTestContainer } from './utils/test-utils';
import { gradientWords, defaultGradientOptions } from './constants/gradient-constants';
import { MAX_FLYOUT_WIDTH_PERCENT } from './constants/flyout-constants';
import messages from './translations/messages';
const {
  ENDING_SHAPE,
  DEGREES,
  SIZE,
  X_POSITION,
  Y_POSITION
} = messages;

describe('<Flyout />', () => {
  const defaultProps = {
    colors: [{
      color: '#ff0000',
      stopPositions: [0.20]
    }],
    setColors: jest.fn(),
    addOrRemoveStopPositionHandler: () => jest.fn(),
    stopPercentChangeHandler: () => jest.fn(),
    deleteColor: () => jest.fn(),
    gradientOptions: defaultGradientOptions
  };
  const setup = props => {
    render(
      <AppTestContainer>
        <div className="wrapper">
          <Flyout {..._merge({}, defaultProps, props)} />
        </div>
      </AppTestContainer>
    );
  };
  describe('width defaults to', () => {
    it('half the available wrapper width on large screens', () => {
      const querySelectorSpy = jest.spyOn(document, 'querySelector');
      querySelectorSpy.mockReturnValueOnce({ clientWidth: 1000 });
      setup();
      expect(screen.getByTestId('flyout').style['_values'].width).toBe('500px');
      querySelectorSpy.mockRestore();
    });
    it('the minimum mobile breakpoint on smaller screens', () => {
      const querySelectorSpy = jest.spyOn(document, 'querySelector');
      querySelectorSpy.mockReturnValueOnce({ clientWidth: 600 });
      setup();
      expect(screen.getByTestId('flyout').style['_values'].width).toBe('500px');
      querySelectorSpy.mockRestore();
    });
  });
  describe('Flyout control button', () => {
    it('updates the flyout width only while dragging', () => {
      const querySelectorSpy = jest.spyOn(document, 'querySelector');
      querySelectorSpy.mockReturnValueOnce({ clientWidth: 1000 });
      setup();
      fireEvent.mouseDown(screen.getByTestId('flyout__control-button'));
      fireEvent.mouseMove(document, { clientX: 700 });
      expect(screen.getByTestId('flyout').style['_values'].width).toBe('700px');
      fireEvent.mouseUp(document);
      fireEvent.mouseMove(document, { clientX: 1000 });
      expect(screen.getByTestId('flyout').style['_values'].width).toBe('700px');
      querySelectorSpy.mockRestore();
    });
    it('does not update width to be less than mobile breakpoint', () => {
      const querySelectorSpy = jest.spyOn(document, 'querySelector');
      querySelectorSpy.mockReturnValueOnce({ clientWidth: 1000 });
      setup();
      fireEvent.mouseDown(screen.getByTestId('flyout__control-button'));
      fireEvent.mouseMove(document, { clientX: 200 });
      expect(screen.getByTestId('flyout').style['_values'].width).toBe('500px');
      querySelectorSpy.mockRestore();
    });
    it(`does not update width to be greater than ${MAX_FLYOUT_WIDTH_PERCENT} of the wrapper width`, () => {
      const querySelectorSpy = jest.spyOn(document, 'querySelector');
      querySelectorSpy.mockReturnValueOnce({ clientWidth: 1000 });
      setup();
      fireEvent.mouseDown(screen.getByTestId('flyout__control-button'));
      fireEvent.mouseMove(document, { clientX: 950 });
      expect(screen.getByTestId('flyout').style['_values'].width).toBe('500px');
      querySelectorSpy.mockRestore();
    });
    it(`sets the width correctly after resize events on the window`, () => {
      const querySelectorSpy = jest.spyOn(document, 'querySelector');
      querySelectorSpy.mockReturnValueOnce({ clientWidth: 1000 });
      const defaultInnerWidth = window.innerWidth;
      window.innerWidth = 1000;
      setup();
      expect(screen.getByTestId('flyout').style['_values'].width).toBe('500px');
      window.innerWidth = 950;
      fireEvent(window, new Event('resize'));
      fireEvent.mouseDown(screen.getByTestId('flyout__control-button'));
      fireEvent.mouseMove(document, { clientX: 850 });
      expect(screen.getByTestId('flyout').style['_values'].width).toBe('850px');
      querySelectorSpy.mockRestore();
      window.innerWidth = defaultInnerWidth;
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
    describe('degrees', () => {
      describe('enabled when gradient type is', () => {
        it('linear', () => {
          setup({ gradientOptions: { gradientType: gradientWords.LINEAR }});
          expect(screen.getByLabelText(DEGREES).disabled).toBe(false);
        });
        it('conic', () => {
          setup({ gradientOptions: { gradientType: gradientWords.CONIC }});
          expect(screen.getByLabelText(DEGREES).disabled).toBe(false);
        });
      });
      describe('disabled when gradient type is', () => {
        it('radial', () => {
          setup({ gradientOptions: { gradientType: gradientWords.RADIAL }});
          expect(screen.getByLabelText(DEGREES).disabled).toBe(true);
        });
      });
    });
    describe('endingShape', () => {
      describe('enabled when gradient type is', () => {
        it('radial', () => {
          setup({ gradientOptions: { gradientType: gradientWords.RADIAL }});
          expect(screen.getByLabelText(ENDING_SHAPE).disabled).toBe(false);
        });
      });
      describe('disabled when gradient type is', () => {
        it('linear', () => {
          setup({ gradientOptions: { gradientType: gradientWords.LINEAR }});
          expect(screen.getByLabelText(ENDING_SHAPE).disabled).toBe(true);
        });
        it('conic', () => {
          setup({ gradientOptions: { gradientType: gradientWords.CONIC }});
          expect(screen.getByLabelText(ENDING_SHAPE).disabled).toBe(true);
        });
      });
    });
    describe('size', () => {
      describe('enabled when gradient type is', () => {
        it('radial', () => {
          setup({ gradientOptions: { gradientType: gradientWords.RADIAL }});
          expect(screen.getByLabelText(SIZE).disabled).toBe(false);
        });
      });
      describe('disabled when gradient type is', () => {
        it('linear', () => {
          setup({ gradientOptions: { gradientType: gradientWords.LINEAR }});
          expect(screen.getByLabelText(SIZE).disabled).toBe(true);
        });
        it('conic', () => {
          setup({ gradientOptions: { gradientType: gradientWords.CONIC }});
          expect(screen.getByLabelText(SIZE).disabled).toBe(true);
        });
      });
    });
    describe('xPosition', () => {
      describe('enabled when gradient type is', () => {
        it('radial', () => {
          setup({ gradientOptions: { gradientType: gradientWords.RADIAL }});
          expect(screen.getByLabelText(X_POSITION).disabled).toBe(false);
        });
        it('conic', () => {
          setup({ gradientOptions: { gradientType: gradientWords.CONIC }});
          expect(screen.getByLabelText(X_POSITION).disabled).toBe(false);
        });
      });
      describe('disabled when gradient type is', () => {
        it('linear', () => {
          setup({ gradientOptions: { gradientType: gradientWords.LINEAR }});
          expect(screen.getByLabelText(X_POSITION).disabled).toBe(true);
        });
      });
    });
    describe('yPosition', () => {
      describe('enabled when gradient type is', () => {
        it('radial', () => {
          setup({ gradientOptions: { gradientType: gradientWords.RADIAL }});
          expect(screen.getByLabelText(Y_POSITION).disabled).toBe(false);
        });
        it('conic', () => {
          setup({ gradientOptions: { gradientType: gradientWords.CONIC }});
          expect(screen.getByLabelText(Y_POSITION).disabled).toBe(false);
        });
      });
      describe('disabled when gradient type is', () => {
        it('linear', () => {
          setup({ gradientOptions: { gradientType: gradientWords.LINEAR }});
          expect(screen.getByLabelText(Y_POSITION).disabled).toBe(true);
        });
      });
    });
  });
});