import React from "react";
import "./App.css";
import ListSort from "./pages/ListSort";
function App() {
  return (
    <div className="app">
      
      <ListSort/>
      <button className='btn btn-danger btn-md delete-all'>SAVE & NEXT</button>
    </div>
  );
}

export default App;
