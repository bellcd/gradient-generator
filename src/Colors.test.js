import Colors from './Colors';
import { screen, render } from '@testing-library/react';

describe('<Colors />', () => {
  it('displays the column headers', () => {
    render(
      <Colors
        colors={[]}
      />
    );
    expect(screen.getByText('Color')).toBeInTheDocument();
    expect(screen.getByText('Type the Color')).toBeInTheDocument();
    expect(screen.getByText('Color Picker')).toBeInTheDocument();
    expect(screen.getByText('Optional Stop Percents')).toBeInTheDocument();
    expect(screen.getByText('Delete Color')).toBeInTheDocument();
  });
});
