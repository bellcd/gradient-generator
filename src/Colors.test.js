import Colors from './Colors';
import { screen, render } from '@testing-library/react';
import { AppTestContainer } from './utils/test-utils';
import messages from './translations/messages';
const {
  COLOR,
  TYPE_THE_COLOR,
  COLOR_PICKER,
  OPTIONAL_STOP_PERCENTS,
  DELETE,
} = messages;

describe('<Colors />', () => {
  const setup = () => {
    render(
      <AppTestContainer>
        <Colors colors={[]} />
      </AppTestContainer>
    );
  };
  it('displays the column headers', () => {
    setup();
    expect(screen.getByText(COLOR)).toBeInTheDocument();
    expect(screen.getByText(TYPE_THE_COLOR)).toBeInTheDocument();
    expect(screen.getByText(COLOR_PICKER)).toBeInTheDocument();
    expect(screen.getByText(OPTIONAL_STOP_PERCENTS)).toBeInTheDocument();
    expect(screen.getByText(DELETE)).toBeInTheDocument();
  });
});
