import { useState } from "react";
import "./App.css";
import { TextEditor } from "./Editor";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>Vite + React</h1>
      <TextEditor />
    </div>
  );
}

export default App;
