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
      <span>Type the Color</span>
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