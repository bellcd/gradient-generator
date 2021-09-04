import React, { useContext } from 'react';
import Color from './Color';
import { MessagesContext } from './translations/messages';
import './Colors.css';

const Colors = ({
  colors,
  addOrRemoveStopPositionHandler,
  stopPercentChangeHandler,
  deleteColor,
  inputChangeHandler
}) => {
  const {
    COLOR,
    TYPE_THE_COLOR,
    HEXADECIMAL_FORMAT_EXPLAINER,
    COLOR_PICKER,
    OPTIONAL_STOP_PERCENTS,
    DELETE_COLOR
  } = useContext(MessagesContext);
  return (
    <div className="colors">
      <span>{COLOR}</span>
      <span>
        <div>{TYPE_THE_COLOR}</div>
        {/* // TODO: this would be better in a popup */}
        <div>{HEXADECIMAL_FORMAT_EXPLAINER}</div>
      </span>
      <span>{COLOR_PICKER}</span>
      <span>{OPTIONAL_STOP_PERCENTS}</span>
      <span>{DELETE_COLOR}</span>
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