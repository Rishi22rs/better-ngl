import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SendResponse from "./pages/SendResponse";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/:userId/:questionId" element={<SendResponse />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
