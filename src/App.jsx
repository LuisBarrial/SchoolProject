import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages";
import { Suspense, lazy } from "react";
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/*" element={<Index />}></Route>
          <Route
            exact
            path="login"
            element={
              <Suspense>
                <Login />
              </Suspense>
            }
          />
          <Route
            exact
            path="/dashboard/*"
            element={
              <Suspense>
                <Dashboard />
              </Suspense>
            }
          />
          <Route exact path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
