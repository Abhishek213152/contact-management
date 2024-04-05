import {BrowserRouter, Routes, Route} from "react-router-dom";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Add_Edit from "./pages/Add_Edit";
import View from "./pages/View";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer position="top-center" />
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route exact path="/addContact" Component={Add_Edit} />
          <Route exact path="/update/:id" Component={Add_Edit} />
          <Route exact path="/view/:id" Component={View} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
