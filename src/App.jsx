import { Route, Routes } from "react-router-dom";
import Website from "./components/Website";
import Login from "./pages/authpages/Login";
import Register from "./pages/authpages/Register";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
        <Route element={<RequireAuth />}>
          <Route element={<Website />} path="/" />
        </Route>
    </Routes>
  );
}

export default App;
