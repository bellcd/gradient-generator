import './App.css';
import { useState } from 'react';
import { defaultColors, defaultDegree } from './constants/gradient-constants';
import Flyout from './Flyout';
import { makeGradientString } from './utils/gradient-utils';

function App() {
  const [colors, setColors] = useState(defaultColors);
  const [degrees, setDegrees] = useState(defaultDegree);

  const gradientString = makeGradientString(colors, degrees);

  console.log({ gradientString });

  return (
    <div className="wrapper">
      <Flyout
        degrees={degrees}
        colors={colors}
        setColors={setColors}
        setDegrees={setDegrees}
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