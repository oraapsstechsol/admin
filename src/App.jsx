import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Adminpanel from "./components/Adminpanel";
import { useAuth } from "./auth/AuthProvider";

function App() {
  const { isAuth } = useAuth();
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route path="/" element={!isAuth ? <Login /> : <Navigate to="/admin" />} />
      <Route path="/admin" element={isAuth ? <Adminpanel /> : <Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
