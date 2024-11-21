import "./App.css";
import AuthPage from "./components/AuthModel/AuthPage";
import { Route, Routes, Navigate } from "react-router-dom";
import MainPage from "./components/MainPageModel/MainPage";
import PrivateRoute from "./api/private_route/PrivateRoute";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/authorization" element={<AuthPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <MainPage />
            </PrivateRoute>
          }
        ></Route>
        <Route path="/" element={<Navigate to="/authorization" replace />} />
      </Routes>
    </div>
  );
}

export default App;
