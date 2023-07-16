import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "./layouts";
import { SignIn, SignUp } from "./pages/auth";
import BinTasksScreen from "./pages/dashboard/binTasksScreen";
import MyDeviceStatus from "./pages/dashboard/mydevice";

function App() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/dashboard/bin" element={<BinTasksScreen />} />
      <Route path="/my-device-status" element={<MyDeviceStatus />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
    </Routes>
  );
}

export default App;
