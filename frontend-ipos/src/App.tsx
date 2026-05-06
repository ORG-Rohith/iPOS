import { useEffect } from "react";
import AppRoutes from "./app/routes/AppRoutes";

function App() {
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const payload = JSON.parse(atob(base64));
          const expiry = payload.exp * 1000;
          if (Date.now() >= expiry) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("tokenType");
            localStorage.removeItem("user");
            window.location.href = "/login";
          }
        } catch (e) {
          // invalid token format
        }
      }
    };

    // Check every 30 seconds
    const interval = setInterval(checkToken, 30000);
    return () => clearInterval(interval);
  }, []);

  return <AppRoutes />;
}

export default App;
