import Color from './Color';
import './Colors.css';

const Colors = ({
  colors,
  addOrRemoveStopPositionHandler,
  stopPercentChangeHandler,
  deleteColor,
  inputChangeHandler
}) => {
  return (
    <div className="colors">
      <span>Color</span>
      <span>
        <div>Type the Color</div>
        {/* // TODO: this would be better in a popup */}
        <div>Hexadecimal format (ie, a "#", followed by exactly 6 characters. Those 6 characters must be either the digits 0 through 9, or one of the letters, a, b, c, d, e, or f</div>
      </span>
      <span>Color Picker</span>
      <span>Optional Stop Percents</span>
      <span>Delete Color</span>
      {colors.map((colorObj, colorIndex, colorsArray) => {
        return <Color
          key={colorIndex}
          colorObj={colorObj}
          colorIndex={colorIndex}
          addOrRemoveStopPositionHandler={addOrRemoveStopPositionHandler}
          stopPercentChangeHandler={stopPercentChangeHandler}
          deleteColor={deleteColor}
          inputChangeHandler={inputChangeHandler}
          isDisabled={colorsArray.length <= 2}
        />
      })}
    </div>
  );
};

export default Colors;