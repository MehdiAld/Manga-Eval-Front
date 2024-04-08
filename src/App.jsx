import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <div className="main-content">
        <Outlet />
      </div>
    </>
  );
}

export default App;
