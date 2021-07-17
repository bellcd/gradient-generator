import StopPositions from "./StopPositions";
import { screen, render } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { merge as _merge } from 'lodash';

describe('<StopPositions />', () => {
  const colorObj = {
    color: '#ff0000',
    stopPositions: []
  };

  const addOrRemoveStopPositionHandlerMock = jest.fn();
  const addOrRemoveStopPositionHandler = () => addOrRemoveStopPositionHandlerMock;

  const defaultProps = {
    colorObj: colorObj,
    colorIndex: 0,
    stopPercentChangeHandler: () => jest.fn(),
    addOrRemoveStopPositionHandler: addOrRemoveStopPositionHandler
  }

  const setup = props => {
    render(
      <StopPositions
        {..._merge({}, defaultProps, props)}
      />
    );
  };

  describe('add button', () => {
    afterEach(() => {
      addOrRemoveStopPositionHandlerMock.mockClear();
    });
    it('Add button is enabled when 0 stop positions are present', () => {
      setup();
      const addButton = screen.getByText('Add');
      expect(addButton).toBeInTheDocument();
      userEvent.click(addButton);
      expect(addOrRemoveStopPositionHandlerMock).toHaveBeenCalledTimes(1);
    });
    it('Add button is enabled when 1 stop position is present', () => {
      setup({
        colorObj: { stopPositions: [0.10] }
      });
      const addButton = screen.getByText('Add');
      expect(addButton).toBeInTheDocument();
      userEvent.click(addButton);
      expect(addOrRemoveStopPositionHandlerMock).toHaveBeenCalledTimes(1);
    });
    it('Add button is disabled when 2 stop positions are present', () => {
      setup({
        colorObj: { stopPositions: [0.10, 0.25] }
      });
      const addButton = screen.getByText('Add');
      expect(addButton).toBeInTheDocument();
      userEvent.click(addButton);
      expect(addOrRemoveStopPositionHandlerMock).toHaveBeenCalledTimes(0);
    });
  });
  describe('renders an appropriate amount of stop positions when', () => {
    it('there are 0', () => {
      setup();
      const input = screen.queryByTestId('stop-position-1-color-0');
      expect(input).toBeNull();
      const label = screen.queryByLabelText('1st');
      expect(label).toBeNull();
      const button = screen.queryByRole('button', { name: 'x' });
      expect(button).toBeNull();
    });
    it('there is 1', () => {
      setup({
        colorObj: { stopPositions: [0.10] }
      });
      const input = screen.getByTestId('stop-position-0-color-0');
      expect(input).toBeInTheDocument();
      const label = screen.getByLabelText('1st');
      expect(label).toBeInTheDocument();
      const button = screen.getByRole('button', { name: 'x' });
      expect(button).toBeInTheDocument();
    });
    it('there are 2', () => {
      setup({
        colorObj: { stopPositions: [0.10, 0.25] }
      });
      const input1 = screen.getByTestId('stop-position-0-color-0');
      expect(input1).toBeInTheDocument();
      const label1 = screen.getByLabelText('1st');
      expect(label1).toBeInTheDocument();

      const input2 = screen.getByTestId('stop-position-1-color-0');
      expect(input2).toBeInTheDocument();
      const label2 = screen.getByLabelText('2nd');
      expect(label2).toBeInTheDocument();

      const buttons = screen.getAllByRole('button', { name: 'x' });
      expect(buttons).toHaveLength(2);
    });
  });
});