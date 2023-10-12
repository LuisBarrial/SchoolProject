import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/index";
import { Suspense, lazy } from "react";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Nosotros from "./pages/Nosotros";
import Politicas from "./pages/Politicas";
const Login = lazy(() => import("./pages/Login"));

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/*" element={<Index />}></Route>
          <Route
            exact
            path="/login"
            element={
              <Suspense fallback={<div>Cargando...</div>}> 
                <Login />
              </Suspense>
            }
          />
          <Route
            exact
            path="/dashboard/*"
            element={
                <Dashboard />
            }
          />
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/nosotros" element={<Nosotros />}></Route>
          <Route exact path="/Politicas" element={<Politicas />}></Route>


        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;