import StopPositions from './StopPositions';
import { inputPattern } from './constants/gradient-constants';

const Color = ({
  colorObj,
  colorIndex,
  addOrRemoveStopPositionHandler,
  stopPercentChangeHandler,
  deleteColor,
  inputChangeHandler,
  isDisabled
}) => {
  return (
    <>
      <label htmlFor={`color-${colorIndex}-text-input`}>{`color-${colorIndex}`}</label>
      <input
        id={`color-${colorIndex}-text-input`}
        type="text"
        name={`color-${colorIndex}-text-input`}
        value={colorObj.color}
        onInput={inputChangeHandler(colorIndex)}
        pattern={inputPattern}
      />
      <div>
        <label htmlFor={`color-${colorIndex}-color-picker`}></label>
        <input
          id={`color-${colorIndex}-color-picker`}
          type="color"
          name={`color-${colorIndex}-color-picker`}
          value={colorObj.color}
          onInput={inputChangeHandler(colorIndex)}
          data-testid={`color-${colorIndex}-color-picker`}
        />
      </div>
      <StopPositions
        colorObj={colorObj}
        colorIndex={colorIndex}
        addOrRemoveStopPositionHandler={addOrRemoveStopPositionHandler}
        stopPercentChangeHandler={stopPercentChangeHandler}
      />
      <button
        disabled={isDisabled}
        onClick={deleteColor(colorIndex)}
        data-testid={`color-${colorIndex}-delete-button`}
      >x</button>
    </>
  );
};

export default Color;
