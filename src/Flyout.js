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
  setDegrees
}) => {
  const [isFlyoutOpen, setIsFlyoutOpen] = useState(true);

  const inputChangeHandler = i => event => {
    setColors(
      colors.map((color, index) => index === i ? event.target.value : color)
    );
  }

  const stopPercentChangeHandler = (i, j) => event => {
    const newColors = colors.map((colorObj, index) => {
      if (index === i) {
        return {
          ...colorObj,
          stopPositions: colorObj.stopPositions.map((position, stopPositionIndex) => {
            return stopPositionIndex === j ? Number(event.target.value) / 100 : position
          })
        }
      } else {
        return colorObj;
      }
    });
    setColors(newColors);
  };

  const makeRandomPercentInRange = (min, max) => {
    const minAsInteger = Math.round(min * 100);
    const maxAsInteger = Math.round(max * 100);
    const range = maxAsInteger - minAsInteger;
    const percent = Math.round(
      Math.random() * range + minAsInteger
    ) / 100;
    return percent;
  }

  const addOrRemoveStopPositionHandler = (colorIndexToChange, isAdd, positionToRemove) => () => {
    const newColors = colors.map((colorObj, index) => {
      if (index === colorIndexToChange) {
        const stopPositions = colorObj.stopPositions;
        let min = 0;
        // mins
          // if this color already has a stop
          if (stopPositions.length > 0) {
            // min is the last stop
            min = stopPositions[stopPositions.length - 1];
          } else if (index !== 0) {
            // look backwards through array for the first min you encounter, going backwards, otherwise set to 0
            for (let i = index - 1; i >= 0; i--) {
              if (colors[i].stopPositions.length > 0) {
                min = colors[i].stopPositions[colors[i].stopPositions.length - 1];
                break;
              }
            }
          }
        // debugger;
        let max = 1;
        // maxs
          // if this is the last color
          if (index !== colors.length - 1) {
            // max is the first color stop you encounter looking forwards through array, otherwise set to 100 if none
            for (let i = index + 1; i < colors.length; i++) {
              if (colors[i].stopPositions.length > 0) {
                max = colors[i].stopPositions[0];
                break;
              }
            }
            // max = 100;
          }

        const newStopPositions = isAdd ? (
          [...colorObj.stopPositions, makeRandomPercentInRange(min, max)]
        ) : (
          colorObj.stopPositions.filter((position, j) => j !== positionToRemove)
        );

        return {
          ...colorObj,
          stopPositions: newStopPositions
        }
      }
      return colorObj;
    });
    setColors(newColors);
  };

  const deleteColor = i => () => {
    setColors(colors.filter((color, index) => index !== i))
  };

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