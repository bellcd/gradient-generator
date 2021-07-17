import { Fragment } from 'react';

const StopPositions = ({
  colorObj,
  colorIndex,
  stopPercentChangeHandler,
  addOrRemoveStopPositionHandler
}) => {
  const stopPositionsLength = colorObj.stopPositions.length;
return (
  <div>
    <button
      onClick={addOrRemoveStopPositionHandler(colorIndex, true)}
      disabled={stopPositionsLength === 2}
    >Add</button>
    {colorObj.stopPositions.map((position, j) => {
      return (
        <Fragment key={j}>
          <input
            type="number"
            name={`stop-position-${j}-color-${colorIndex}`}
            id={`stop-position-${j}-color-${colorIndex}`}
            value={stopPositionsLength === 0 ? '' : Math.trunc(position * 100)}
            onChange={stopPercentChangeHandler(colorIndex, j)}
            min="0"
            max="100"
            data-testid={`stop-position-${j}-color-${colorIndex}`}
          ></input>
          <label
            htmlFor={`stop-position-${j}-color-${colorIndex}`}
          >
            {j === 0 ? '1st' : '2nd'}
          </label>
          <button
            onClick={addOrRemoveStopPositionHandler(colorIndex, false, j)}
          >x</button>
        </Fragment>
      );
    })}
  </div>
);
};

export default StopPositions;