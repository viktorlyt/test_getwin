import { Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./Pages/Register/Register";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Register />} />
        {/* <Route path="/" element={<Auth />} /> */}
        {/* <Route path="/home" element={<Home />} /> */}
      </Routes>
    </div>
  );
}

export default App;
