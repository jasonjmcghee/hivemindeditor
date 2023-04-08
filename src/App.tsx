import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { TextEditor } from "./Editor";

import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

export default App;
