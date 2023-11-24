import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Questions from "./pages/Questions";
import SendResponse from "./pages/SendResponse";
import Dashboard from "./pages/Dashboard";
import Responses from "./pages/Responses";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/responses" element={<Responses />} />
        <Route path="/:userId/:questionId" element={<SendResponse />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
