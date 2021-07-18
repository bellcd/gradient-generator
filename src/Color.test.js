import Color from './Color';
import { screen, render } from '@testing-library/react';
import { merge as _merge } from 'lodash';

describe('<Color />', () => {
  const defaultProps = {
    colorIndex: 0,
    colorObj: {
      color: '#ff0000',
      stopPositions: [0.20]
    },
    inputChangeHandler: () => jest.fn(),
    deleteColor: () => jest.fn(),
    addOrRemoveStopPositionHandler: () => jest.fn(),
    stopPercentChangeHandler: () => jest.fn()
  }
  const setup = props => render(<Color {..._merge({}, defaultProps, props)} />);

  it('displays a text <input> field', () => {
    setup();
    expect(screen.getByLabelText('color-0')).toBeInTheDocument();
  });
  it('displays an color <input> field', () => {
    setup();
    expect(screen.getByTestId('color-0-color-picker')).toBeInTheDocument();
  });
  it('displays a delete button', () => {
    setup();
    expect(screen.getAllByRole('button', { name: 'x' })).toHaveLength(2);
    expect(screen.getByTestId('color-0-delete-button')).toBeInTheDocument();
  });
});