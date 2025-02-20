import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <p className="read-the-docs text-3xl font-bold">
        Click on the Vite and React logos to learn more
      </p>
      <button className="btn btn-primary">Primary</button>
    </>
  );
}

export default App;
