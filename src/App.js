import './App.css';
import { useState } from 'react';
import Flyout from './Flyout';
import { makeGradientString } from './utils/gradient-utils';

function App() {
  const [colors, setColors] = useState(['#ff0000', '#0000ff']);
  const [degrees, setDegrees] = useState(0);

  const gradientString = makeGradientString(colors, degrees);

  return (
    <>
      <div
        className="gradient"
        style={{ background: gradientString }}
      >
      </div>
      <Flyout
        degrees={degrees}
        colors={colors}
        setColors={setColors}
        setDegrees={setDegrees}
      />
    </>
  );
}

export default App;

// TODOs:
  // bugs
    // min 2 colors
  // layout of options grid
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
    // repeating-linear-gradient
    // repeating-radial-gradient
  // polishing
    // fonts
    // icons
  // testing