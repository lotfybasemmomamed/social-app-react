import { Route, Routes } from "react-router-dom";
import Website from "./components/Website";
import Login from "./pages/authpages/Login";
import Register from "./pages/authpages/Register";
import RequireAuth from "./components/RequireAuth";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import SinglePost from "./pages/SinglePost";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
        <Route element={<RequireAuth />}>
          <Route element={<Website />} >
          <Route path="/" element={<Home/>}/>
          <Route path="/profile" element={<UserProfile/>}/>
          <Route path="/post/:id" element={<SinglePost/>}/>
          </Route>
        </Route>
    </Routes>
  );
}

export default App;
