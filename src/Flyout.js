import { useState } from 'react';
import classnames from 'classnames';
import './Flyout.css';
import {
  randomColorGenerator,
  makeGradientString
} from './utils/gradient-utils';
import Colors from './Colors';
import classNames from 'classnames';

const Flyout = ({
  colors,
  setColors,
  degrees,
  setDegrees,
  addOrRemoveStopPositionHandler,
  stopPercentChangeHandler,
  deleteColor
}) => {
  const [isFlyoutOpen, setIsFlyoutOpen] = useState(true);

  const inputChangeHandler = i => event => {
    // TODO: event.target.value needs to be a valid input
    setColors(
      colors.map((colorObj, index) => index === i ? {
        ...colorObj,
        color: event.target.value
      } : colorObj)
    );
  }

  const gradientString = makeGradientString(colors, degrees);

  const onFlyoutButtonClick = () => setIsFlyoutOpen(!isFlyoutOpen);

  return (
    <div className={classnames('flyout', {
      'flyout--open': isFlyoutOpen,
      'flyout--closed': !isFlyoutOpen
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
      <div className="flyout__content">
        <div className="card">{gradientString}</div>
        <div className="options card">
          <Colors
            colors={colors}
            addOrRemoveStopPositionHandler={addOrRemoveStopPositionHandler}
            stopPercentChangeHandler={stopPercentChangeHandler}
            deleteColor={deleteColor}
            inputChangeHandler={inputChangeHandler}
          />
          <button
            onClick={() => {
              setColors([...colors, {
                color: randomColorGenerator(),
                stopPositions: []
              }])
            }}
          >
            Add a random color
          </button>
          <div>
            <input
              id="degrees"
              type="number"
              name="degrees"
              value={degrees}
              onChange={event => { setDegrees(event.target.value)}}
              min={0}
              max={360}
            />
            <label htmlFor="degrees">degrees</label>
          </div>
          <div>
            <label htmlFor="gradient-type">Gradient Type</label>
            <select name="gradient-type">
              <option value="linear">Linear</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flyout;