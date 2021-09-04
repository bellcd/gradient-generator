import Flyout from './Flyout';
import { screen, render } from '@testing-library/react';
import { merge as _merge } from 'lodash';
import { AppTestContainer } from './utils/test-utils';
import { gradientWords, defaultGradientOptions } from './constants/gradient-constants';
import userEvent from '@testing-library/user-event';
import messages from './translations/messages';
const {
  ENDING_SHAPE,
  DEGREES
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
        <Flyout {..._merge({}, defaultProps, props)} />
      </AppTestContainer>
    );
  };
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
  describe.only('Flyout content', () => {
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
          setup({ gradientOptions: { gradientType: gradientWords.RADIAL, endingShape: gradientWords.CIRCLE }});
          expect(screen.getByLabelText(ENDING_SHAPE).disabled).toBe(false);
        });
      });
      describe('disabled when gradient type is', () => {
        it('linear', () => {
          setup({ gradientOptions: { gradientType: gradientWords.LINEAR, endingShape: gradientWords.CIRCLE }});
          expect(screen.getByLabelText(ENDING_SHAPE).disabled).toBe(true);
        });
        it('conic', () => {
          setup({ gradientOptions: { gradientType: gradientWords.CONIC, endingShape: gradientWords.CIRCLE }});
          expect(screen.getByLabelText(ENDING_SHAPE).disabled).toBe(true);
        });
      });
    });
    // TODO: size, xPosition, & yPosition
  });
});