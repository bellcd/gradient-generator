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
  // degrees,
  // setDegrees,
  addOrRemoveStopPositionHandler,
  stopPercentChangeHandler,
  deleteColor,
  // gradientType,
  // setGradientType,
  gradientOptions,
  setGradientOptions
}) => {
  const [isFlyoutOpen, setIsFlyoutOpen] = useState(true);

  const inputChangeHandler = i => event => {
    setColors(
      colors.map((colorObj, index) => index === i ? {
        ...colorObj,
        color: event.target.value
      } : colorObj)
    );
  }

  const gradientString = makeGradientString(colors, gradientOptions);

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

          {/* TODO: add tests */}
          {gradientOptions.gradientType === 'linear' && (
            <div>
              <input
                id="degrees"
                type="number"
                name="degrees"
                value={gradientOptions.degrees}
                onChange={event => { setGradientOptions({
                  ...gradientOptions,
                  degrees: event.target.value
                })}}
                min={0}
                max={360}
              />
              <label htmlFor="degrees">degrees</label>
            </div>
          )}
          <div>
            <label htmlFor="gradient-type">Gradient Type</label>
            <select
              name="gradient-type"
              value={gradientOptions.gradientType}
              onChange={event => setGradientOptions({
                ...gradientOptions,
                gradientType: event.target.value
              })}
            >
              <option value="linear">Linear</option>
              <option value="radial">Radial</option>
            </select>
          </div>
          <div>
            <label htmlFor="ending-shape">Ending Shape</label>
            <select
              name="ending-shape"
              value={gradientOptions.endingShape}
              onChange={event => setGradientOptions({
                ...gradientOptions,
                endingShape: event.target.value
              })}
            >
              <option value="circle">Circle</option>
              <option value="ellipse">Ellipse</option>
            </select>
            <div>
              <input
                id="size"
                type="text"
                name="size"
                value={gradientOptions.size}
                onChange={event => { setGradientOptions({
                  ...gradientOptions,
                  size: event.target.value
                })}}
                min={0}
                max={360}
              />
              <label htmlFor="size">size</label>
            </div>
            <div>
              <input
                id="position"
                type="text"
                name="position"
                value={gradientOptions.position}
                onChange={event => { setGradientOptions({
                  ...gradientOptions,
                  position: event.target.value
                })}}
                min={0}
                max={360}
              />
              <label htmlFor="position">position</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flyout;
