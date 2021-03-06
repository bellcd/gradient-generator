import { Fragment, useContext } from 'react';
import { MessagesContext } from './translations/messages';

const StopPositions = ({
  colorObj,
  colorIndex,
  stopPercentChangeHandler,
  addOrRemoveStopPositionHandler
}) => {
  const {
    ADD,
    X,
    FIRST,
    SECOND
  } = useContext(MessagesContext);

  const stopPositionsLength = colorObj.stopPositions.length;
return (
  <div>
    <button
      onClick={addOrRemoveStopPositionHandler(colorIndex, true)}
      disabled={stopPositionsLength === 2}
      data-testid={`color-${colorIndex}-add-stop-position`}
    >{ADD}</button>
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
            {j === 0 ? FIRST : SECOND}
          </label>
          <button
            onClick={addOrRemoveStopPositionHandler(colorIndex, false, j)}
            data-testid={`stop-position-${j}-color-${colorIndex}-delete-button`}
          >{X}</button>
        </Fragment>
      );
    })}
  </div>
);
};

export default StopPositions;