import { useState } from 'react';
import classnames from 'classnames';
import './Flyout.css';
import {
  randomColorGenerator,
  makeGradientString
} from './utils/gradient-utils';
import classNames from 'classnames';

const Flyout = ({
  colors,
  setColors,
  degrees,
  setDegrees
}) => {
  const [isFlyoutOpen, setIsFlyoutOpen] = useState(true);

  const inputChangeHandler = i => event => {
    setColors(
      colors.map((color, index) => index === i ? event.target.value : color)
    );
  }

  const deleteColor = i => () => {
    setColors(colors.filter((color, index) => index !== i))
  };

  const gradientString = makeGradientString(colors, degrees);

  const onFlyoutButtonClick = () => setIsFlyoutOpen(!isFlyoutOpen);

  return (
    <div className={classnames('flyout', {
      'flyout__open': isFlyoutOpen,
      'flyout__closed': !isFlyoutOpen
    })}>
      <button
        className={classNames('flyout__control-button', {
          'flyout__control-button--open': isFlyoutOpen,
          'flyout__control-button--closed': !isFlyoutOpen,
        })}
        onClick={onFlyoutButtonClick}
      >
        {isFlyoutOpen ? 'close' : 'open'}
      </button>
      <div>
        <button
          onClick={() => {
            setColors([...colors, randomColorGenerator()])
          }}
        >
          Add a random color
        </button>
        <div className="card">{gradientString}</div>
        <div className="options card">
          {colors.map((color, i) => (
            <div>
              <input
                type="color"
                name={`color-${i}`}
                value={`${color}`}
                onInput={inputChangeHandler(i)}
              />
              <label htmlFor={`color-${i}`}>{`color-${i}`}</label>
              <button
                onClick={deleteColor(i)}
              >x</button>
            </div>
          ))}
          <div>
            <input
              type="number"
              name="degrees"
              value={degrees}
              onChange={event => { setDegrees(event.target.value)}}
              min={0}
              max={360}
            />
            <label htmlFor="degrees">degrees</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flyout;