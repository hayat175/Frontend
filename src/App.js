import CounterApp from "./Components/CounterApp";
import Hello from "./Components/Hello";
import "./App.css";
import UseStateObject from "./Components/UseStateObject";
import UseStateArray from "./Components/UseStateArray";

import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import { useSelector } from "react-redux";

function App() {
  const { isLoggedIn, user } = useSelector((state) => state.loginReducer);
  console.log(isLoggedIn, user);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute isLoggedIn={isLoggedIn} />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
