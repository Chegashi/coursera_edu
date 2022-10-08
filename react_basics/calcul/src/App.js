import { useState, useRef ,Alert} from "react"; 
import "./App.css";

function App() {
  const inputRef = useRef(null); 
  const resultRef = useRef(null); 
  const [result, setResult] = useState(0); 
 
  function plus(e) { 
    e.preventDefault(); 
    setResult((result) => result + Number(inputRef.current.value)); 
  }; 
 
  function minus(e) { 
    e.preventDefault(); 
    setResult((result) => result - Number(inputRef.current.value));
  };
 
  function times(e) { 
    e.preventDefault(); 
    setResult((result) => result * Number(inputRef.current.value));
  }; 
 
  function divide(e) { 
    e.preventDefault();
    if (Number(inputRef.current.value))
      setResult((result) => result / Number(inputRef.current.value));
    else
      <Alert severity="error">This is an error alert — check it out!</Alert>
      alert.show('Oh look, an alert!');
  };

  function resetInput(e) { 
    //e.preventDefault();
    //setResult((result) => result);
    inputRef.current.value = "";
  };
 
  function resetResult(e) { 
    e.preventDefault(); 
    setResult((result) => 0);
  };
 
  return ( 
    <div className="App"> 
      <div> 
        <h1>Simplest Working Calculator</h1> 
      </div> 
      <form> 
        <p ref={resultRef}> 
          {result} 
        </p> 
        <input
          pattern="[0-9]" 
          ref={inputRef} 
          type="number" 
          placeholder="Type a number" 
        /> 
        <button onClick={plus} bagr>add</button> 
        <button onClick={minus}>subtract</button> 
        <button onClick={times}>multiply</button> 
        <button onClick={divide}>divide</button> 
        <button onClick={resetInput}  style={{backgroundColor: '#FF6247'}}>reset input </button> 
        <button onClick={resetResult} style={{backgroundColor: '#FF6247'}}>reset result</button>
      </form> 
    </div> 
  ); 
} 

export default App;