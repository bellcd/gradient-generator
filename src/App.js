import './App.css';
import React, { useState, useEffect } from 'react';
import {
  defaultColors,
  defaultGradientOptions,
  gradientWords
} from './constants/gradient-constants';
import messages, { MessagesContext } from './translations/messages';
import Flyout from './Flyout';
import { makeGradientString, randomColorGenerator } from './utils/gradient-utils';
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

  const handleRandomize = () => {
    setColors(makeRandomColors());
    setGradientOptions(makeRandomOptions());
  };

  const calculateRandomPosition = () => {
    return Number.parseFloat(Math.random().toPrecision(2));
  }

  const makeRandomColors = () => {
    // number of colors
      // random number between 2 - 40
      const numberOfColors = Math.round(Math.random() * 38) + 2;
      // colors themselves
        // use randomColorGenerator()
      const colors = new Array(numberOfColors).fill(null).map(() => {
        return {
          color: randomColorGenerator(),
          stopPositions: []
        }
      })
      // TODO: finish
      // 0, 1, or 2 stop percents per color 
        // percentage of the stop percents
    return colors;
  };
  const makeRandomOptions = () => {
    // gradient type
      // random number between 0 - 2, for linear, radial, or conic
      const num = Math.round(Math.random() * 2);
      const object = {
        0: gradientWords.LINEAR,
        1: gradientWords.RADIAL,
        2: gradientWords.CONIC
      }
      const gradientTypeToUse = object[num];
    // if linear
    if (gradientTypeToUse === gradientWords.LINEAR) {
      // random number between 0 - 360, degrees
      const degreesToUse = Math.round(Math.random() * 360);
      return {
        gradientType: gradientTypeToUse,
        degrees: degreesToUse
      };
    }
    // else if radial
    if (gradientTypeToUse === gradientWords.RADIAL) {
      // random number between 0 - 1, for circle or ellipse, ending shape
      const endingShapeToUse = Math.round(Math.random()) === 1 ? gradientWords.CIRCLE : gradientWords.ELLIPSE;
      // random number between 0 - 3, for closest-side, farthest-side, closest-corner, farthest-corner, size
      const sizeObject = {
        0: gradientWords.CLOSEST_SIDE,
        1: gradientWords.FARTHEST_SIDE,
        2: gradientWords.CLOSEST_CORNER,
        3: gradientWords.FARTHEST_CORNER,
      };
      const sizeToUse = sizeObject[Math.round(Math.random() * 3)];
      // random number between 0 - 100, for x position
      const xPositionToUse = calculateRandomPosition();
      // random number between 0 - 100, for y position
      const yPositionToUse = calculateRandomPosition();
      return {
        gradientType: gradientTypeToUse,
        endingShape: endingShapeToUse,
        size: sizeToUse,
        xPosition: xPositionToUse,
        yPosition: yPositionToUse
      };
    }
    // else if conic
    if (gradientTypeToUse === gradientWords.CONIC) {
      // random number between 0 - 360, degrees
      const degreesToUse = Math.round(Math.random() * 360);
      // random number between 0 - 100, for x position
      const xPositionToUse = calculateRandomPosition();
      // random number between 0 - 100, for y position
      const yPositionToUse = calculateRandomPosition();
      return {
        gradientType: gradientTypeToUse,
        degrees: degreesToUse,
        xPosition: xPositionToUse,
        yPosition: yPositionToUse
      };
    } 
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
          handleRandomize={handleRandomize}
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
      // 'press "escape" to toggle fullscreen mode as a tooltip on icon hover
  // mobile design
  // randomizer
    // number of colors
    // colors themselves
    // 0, 1, or 2 stop percents per color
      // percentage of the stop percents
    // gradient type
    // degrees
    // ending shape
    // size
    // x position
    // y position
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
  // Colors, might not need the header row of labels, maybe tooltip popups? would prevent horizontal overflow on narrower screens