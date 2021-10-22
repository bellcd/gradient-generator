import { useState, useContext, useRef, useEffect } from 'react';
import './Flyout.css';
import {
  randomColorGenerator,
  makeGradientString
} from './utils/gradient-utils';
import { gradientWords } from './constants/gradient-constants';
import breakpoints from './constants/breakpoints';
import Colors from './Colors';
import { throttle as _throttle } from 'lodash';
import messages, { MessagesContext } from './translations/messages';
import { MAX_FLYOUT_WIDTH_PERCENT, FLYOUT_WIDTH_THROTTLE } from './constants/flyout-constants';

const Flyout = ({
  colors,
  setColors,
  addOrRemoveStopPositionHandler,
  stopPercentChangeHandler,
  deleteColor,
  gradientOptions,
  setGradientOptions,
}) => {
  const {
    ADD_A_RANDOM_COLOR,
    GRADIENT_TYPE,
    LINEAR,
    RADIAL,
    CONIC,
    DEGREES,
    ENDING_SHAPE,
    CIRCLE,
    ELLIPSE,
    SIZE,
    CLOSEST_SIDE,
    FARTHEST_SIDE,
    CLOSEST_CORNER,
    FARTHEST_CORNER,
    X_POSITION,
    Y_POSITION
  } = useContext(MessagesContext);

  const resizingRef = useRef({ isResizing: false, maxFlyoutWidth: 0 });
  const [width, setWidth] = useState(0);
  
  useEffect(() => {
    const wrapperWidth = document.querySelector('.wrapper').clientWidth;
    setWidth(Math.max(wrapperWidth / 2, breakpoints.mobile));
    resizingRef.current.maxFlyoutWidth = wrapperWidth * MAX_FLYOUT_WIDTH_PERCENT;
    const throttledHandleResize = _throttle(() => {
      resizingRef.current.maxFlyoutWidth = Math.max(window.innerWidth * MAX_FLYOUT_WIDTH_PERCENT, breakpoints.mobile);
    }, FLYOUT_WIDTH_THROTTLE);
    window.addEventListener('resize', throttledHandleResize);
    return throttledHandleResize;
  }, []);

  const inputChangeHandler = i => event => {
    setColors(
      colors.map((colorObj, index) => index === i ? {
        ...colorObj,
        color: event.target.value
      } : colorObj)
    );
  }

  const gradientString = makeGradientString(colors, gradientOptions);

  const calculateAndSetWidth = event => {
    if (!resizingRef.current.isResizing) return;
    if (event.clientX < breakpoints.mobile) return;
    if (event.clientX > resizingRef.current.maxFlyoutWidth) return;
    setWidth(event.clientX);
  };

  const cleanup = () => {
    if (!resizingRef.current.isResizing) return;
    resizingRef.current.isResizing = false;
  }

  useEffect(() => {
    const throttledCalculateAndSetWidth = _throttle(calculateAndSetWidth, FLYOUT_WIDTH_THROTTLE);
    document.addEventListener('mousemove', throttledCalculateAndSetWidth);
    document.addEventListener('mouseup', cleanup);
    return () => {
      document.removeEventListener('mousemove', throttledCalculateAndSetWidth);
      document.removeEventListener('mouseup', cleanup);
    };
  }, [])

  return (
    <div
      className="flyout"
      style={{ width }}
      data-testid="flyout"
    >
      <button
        className="flyout__control-button"
        onMouseDown={() => resizingRef.current.isResizing = true}
        style={{ left: `calc(${width}px)` }}
        data-testid="flyout__control-button"
      >
      </button>
      <div className="flyout__content">
        <div className="card">{gradientString}</div>
        <div className="options card">
          <Colors
            colors={colors}
            addOrRemoveStopPositionHandler={addOrRemoveStopPositionHandler}
            stopPercentChangeHandler={stopPercentChangeHandler}
            deleteColor={deleteColor}
            inputChangeHandler={inputChangeHandler}
          />
          <button
            onClick={() => {
              setColors([...colors, {
                color: randomColorGenerator(),
                stopPositions: []
              }])
            }}
          >
            {ADD_A_RANDOM_COLOR}
          </button>
          <div>
            <label htmlFor={gradientWords.GRADIENT_TYPE}>{GRADIENT_TYPE}</label>
            <select
              id={gradientWords.GRADIENT_TYPE}
              name={gradientWords.GRADIENT_TYPE}
              value={gradientOptions.gradientType}
              onChange={event => setGradientOptions({
                ...gradientOptions,
                gradientType: event.target.value
              })}
            >
              <option value={gradientWords.LINEAR}>{LINEAR}</option>
              <option value={gradientWords.RADIAL}>{RADIAL}</option>
              <option value={gradientWords.CONIC}>{CONIC}</option>
            </select>
          </div>
          <div>
            <div>
              <label htmlFor={gradientWords.DEGREES}>{DEGREES}</label>
              <input
                id={gradientWords.DEGREES}
                type="number"
                name={gradientWords.DEGREES}
                value={gradientOptions.degrees}
                onChange={event => { setGradientOptions({
                  ...gradientOptions,
                  degrees: event.target.value
                })}}
                disabled={gradientOptions.gradientType === gradientWords.RADIAL}
                min={0}
                max={360}
              />
            </div>
            <div>
              <label htmlFor={gradientWords.ENDING_SHAPE}>{ENDING_SHAPE}</label>
              <select
                id={gradientWords.ENDING_SHAPE}
                name={gradientWords.ENDING_SHAPE}
                value={gradientOptions.endingShape}
                onChange={event => setGradientOptions({
                  ...gradientOptions,
                  endingShape: event.target.value
                })}
                disabled={gradientOptions.gradientType !== gradientWords.RADIAL}
              >
                <option value="circle">{CIRCLE}</option>
                <option value="ellipse">{ELLIPSE}</option>
              </select>
            </div>
            <div>
              <label htmlFor={gradientWords.SIZE}>{SIZE}</label>
              <select
                id={gradientWords.SIZE}
                type="text"
                name={gradientWords.SIZE}
                value={gradientOptions.size}
                onChange={event => { setGradientOptions({
                  ...gradientOptions,
                  size: event.target.value
                })}}
                disabled={gradientOptions.gradientType !== gradientWords.RADIAL}
              >
                <option>{CLOSEST_SIDE}</option>
                <option>{FARTHEST_SIDE}</option>
                <option>{CLOSEST_CORNER}</option>
                <option>{FARTHEST_CORNER}</option>
              </select>
            </div>
            <div>
              <label htmlFor={gradientWords.X_POSITION}>{X_POSITION}</label>
              <input
                id={gradientWords.X_POSITION}
                type="number"
                name={gradientWords.X_POSITION}
                value={Math.round(gradientOptions.xPosition * 100)}
                onChange={event => {
                  setGradientOptions({
                    ...gradientOptions,
                    xPosition: Number((event.target.value / 100).toFixed(2))
                  })
                }}
                min={0}
                max={100}
                step={1}
                disabled={gradientOptions.gradientType === gradientWords.LINEAR}
              />
            </div>
            <div>
              <label htmlFor={gradientWords.Y_POSITION}>{Y_POSITION}</label>
              <input
                id={gradientWords.Y_POSITION}
                type="number"
                name={gradientWords.Y_POSITION}
                value={Math.round(gradientOptions.yPosition * 100)}
                onChange={event => { setGradientOptions({
                  ...gradientOptions,
                  yPosition: Number((event.target.value / 100).toFixed(2))
                })}}
                min={0}
                max={100}
                step={1}
                disabled={gradientOptions.gradientType === gradientWords.LINEAR}
              />
            </div>
          </div>
        <div>{messages.FULLSCREEN}</div>
        </div>
      </div>
    </div>
  );
};

export default Flyout;
