import './App.css';
import { useState } from 'react';
import { defaultColors, defaultDegree } from './constants/gradient-constants';
import Flyout from './Flyout';
import { makeGradientString } from './utils/gradient-utils';

function App() {
  const [colors, setColors] = useState(defaultColors);
  const [degrees, setDegrees] = useState(defaultDegree);

  const gradientString = makeGradientString(colors, degrees);

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

  const deleteColor = i => () => {
    setColors(colors.filter((color, index) => index !== i))
  };

  return (
    <div className="wrapper">
      <Flyout
        degrees={degrees}
        colors={colors}
        setColors={setColors}
        setDegrees={setDegrees}
        addOrRemoveStopPositionHandler={addOrRemoveStopPositionHandler}
        stopPercentChangeHandler={stopPercentChangeHandler}
        deleteColor={deleteColor}
      />
      <div
        className="gradient"
        style={{ background: gradientString }}
      >
      </div>
    </div>
  );
}

export default App;

// TODOs:
  // bugs
    // editing the color input field directly
  // input validation
    // type the color
  // convert CSS to SCSS
  // generate a random gradient
  // change the color mode
    // hexademical
    // rgb
    // hsl
  // change the gradient mode
    // linear
    // radial
    // conic
  // add color stops
    // new stop positions default to ?? random percent?
    // identify bug with stop positions not incrementing on up / down keypress
    // repeating-linear-gradient
    // repeating-radial-gradient
  // add color hints
    // only valid between color stops
  // polishing
    // fonts
    // icons
  // testing
    // App
    // Color
    // Colors
    // Flyout
  // mobile design