import Flyout from './Flyout';
import { screen, render, fireEvent } from '@testing-library/react';
import { merge as _merge } from 'lodash';
import { AppTestContainer } from './utils/test-utils';
import { gradientWords, defaultGradientOptions } from './constants/gradient-constants';
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
  describe('width', () => {
    it('defaults to half the available wrapper width', () => {
      const querySelectorSpy = jest.spyOn(document, 'querySelector');
      querySelectorSpy.mockReturnValueOnce({ clientWidth: 1000 });
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