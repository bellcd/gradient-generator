import './App.css';
import { useState } from 'react';

function App() {
  const [colorOne, setColorOne] = useState('000');
  const [colorTwo, setColorTwo] = useState('000');
  const [background, setBackground] = useState('');
  const [typeOfGradient, setTypeOfGradient] = useState('linear');
  const [degreeCount, setDegreeCount] = useState(0);
  const [colors, setColors] = useState([colorOne, colorTwo]);


  const makeBackgroundString = () => {
    const colorString = colors.reduce((acc, currentValue) => `${acc}, ${currentValue}`);
    return `${typeOfGradient}-gradient(${degreeCount}deg, ${colorString})`
  }

  return (
    <>
      <div>
        <input type="color" id="color-one" name="color-one" value={colorOne} onInput={(e) => {
          debugger;
          setColorOne()
        }} />
        <label htmlFor="color-one">Color One</label>
      </div>
      <div>
        <input type="color" id="color-two" name="color-two" value={colorTwo} onInput={setColorTwo}/>
        <label htmlFor="color-two">Color One</label>
      </div>
      <div className="display-box" style={{ background: makeBackgroundString() }}/>
    </>
  );
}

export default App;
