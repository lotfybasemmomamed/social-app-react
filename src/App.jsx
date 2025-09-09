import { Route,Routes } from "react-router-dom";
import Website from "./components/Website";

function App() {
  return (
    <Routes>
      <Route>
        <Route element={<Website/>} path="/"/>
      </Route>
      
    </Routes>
  );
}

export default App;
