import StopPositions from './StopPositions';

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
        type="text"
        name={`color-${colorIndex}-text-input`}
        value={colorObj.color}
        onInput={inputChangeHandler(colorIndex)}
      />
      <div>
        <label htmlFor={`color-${colorIndex}-color-picker`}></label>
        <input
          type="color"
          name={`color-${colorIndex}-color-picker`}
          value={colorObj.color}
          onInput={inputChangeHandler(colorIndex)}
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
      >x</button>
    </>
  );
};

export default Color;

// start, end, or numbered color
// input field where user can type the color, in HEX
// colorpicker field
// color stops
