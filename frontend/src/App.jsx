import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./components/Navbar/Navbar";
import Home from "./Home";
import LogData from "./components/LogData/LogData";
import ViewData from "./components/ViewData/ViewData";
import NotFound from "./components/NotFound"

function App() {
  return (
    <div className="m-0 p-0 w-full min-h-dvh bg-[#f0f0f0]">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/log-data" element={<LogData />}></Route>
          <Route path="/view-data" element={<ViewData />}></Route>
<Route component={NotFound} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
