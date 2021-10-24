import './App.css';
import React, { useState, useEffect } from 'react';
import {
  defaultColors,
  defaultGradientOptions
} from './constants/gradient-constants';
import messages, { MessagesContext } from './translations/messages';
import Flyout from './Flyout';
import { makeGradientString } from './utils/gradient-utils';
import Prism from 'prismjs';

Prism.highlightAll();

function App() {
  const [colors, setColors] = useState(defaultColors);
  const [gradientOptions, setGradientOptions] = useState(defaultGradientOptions);
  const gradientString = makeGradientString(colors, gradientOptions);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const toggleFullScreen = event => {
      if (event.key !== 'Escape') return;
      setIsFullScreen(currentFullScreenStatus => !currentFullScreenStatus);
    }
    window.addEventListener('keyup', toggleFullScreen);
    return () => window.removeEventListener('keyup', toggleFullScreen);
  }, []);

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
          if (stopPositions.length > 0) {
            min = stopPositions[stopPositions.length - 1];
          } else if (index !== 0) {
            for (let i = index - 1; i >= 0; i--) {
              if (colors[i].stopPositions.length > 0) {
                min = colors[i].stopPositions[colors[i].stopPositions.length - 1];
                break;
              }
            }
          }
        let max = 1;
          if (index !== colors.length - 1) {
            for (let i = index + 1; i < colors.length; i++) {
              if (colors[i].stopPositions.length > 0) {
                max = colors[i].stopPositions[0];
                break;
              }
            }
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
    <MessagesContext.Provider value={messages}>
      <div className="wrapper">
        <Flyout
          colors={colors}
          setColors={setColors}
          addOrRemoveStopPositionHandler={addOrRemoveStopPositionHandler}
          stopPercentChangeHandler={stopPercentChangeHandler}
          deleteColor={deleteColor}
          gradientOptions={gradientOptions}
          setGradientOptions={setGradientOptions}
        />
        <div
          className={`gradient ${isFullScreen ? 'fullScreen' : '' }`}
          style={{ background: gradientString }}
          data-testid="gradient"
        />
      </div>
    </MessagesContext.Provider>
  );
}

export default App;

// TODOs:
  // toast notifications
  // input validation
    // type the color
  // convert CSS to SCSS, might do styled components instead, not sure yet
  // change the gradient mode
    // repeating-linear-gradient
    // repeating-radial-gradient
  // add color stops
    // color stop values can up / down arrow out of range, when there are other color stops present
  // add color hints
    // only valid between color stops
  // inputs
    // circle input for changing degrees
  // polishing
    // fonts
    // icons
  // mobile design
  // randomizer
  // change display formatting of gradientString
    // conic-gradient(from 66deg at 37% 65%, #ff0000 1%, #0000ff 32%, #6ecbfb 55.00000000000001%, #8f0b29, #e0a7d7, #f8fcca, #eeffeb, #cde3cc, #fea75d, #cbc5e0)
    // conic-gradient(
    //   from 66deg at 37% 65%,
    //     #ff0000 1%,
    //     #0000ff 32%,
    //     #6ecbfb 55.00000000000001%,
    //     #8f0b29,
    //     #e0a7d7,
    //     #f8fcca,
    //     #eeffeb,
    //     #cde3cc,
    //     #fea75d,
    //     #cbc5e0
    // )
  // unit tests failing after ejecting