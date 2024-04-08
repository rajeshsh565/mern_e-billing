import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  Homepage,
  LandingPage,
  Login,
  Register,
  Error,
  DashboardLayout,
  GenerateBill,
  BillingHistory,
  BillPayment,
  DashboardHome,
  Profile,
  Help,
  MeterRequest,
  ChangePassword,
} from "./pages";

import { action as loginAction } from "./pages/Login";
import { action as registerAction } from "./pages/Register";
import { action as passwordAction } from "./pages/ChangePassword";
import { action as meterAction } from "./pages/MeterRequest";
import { action as billAction } from "./pages/GenerateBill";
import { action as profileAction } from "./pages/Profile";
import { loader as dashboardLoader } from "./pages/DashboardLayout";
import { loader as meterLoader } from "./pages/MeterRequest";
import { loader as billLoader } from "./pages/BillingHistory";
import { loader as profileLoader } from "./pages/Profile";
import { useEffect, useState } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <DashboardHome />,
          },
          {
            path: "home",
            element: <DashboardHome />,
          },
          {
            path: "profile",
            element: <Profile />,
            loader: profileLoader,
            action: profileAction
          },
          {
            path: "meter-management",
            element: <MeterRequest />,
            loader: meterLoader,
            action: meterAction,
          },
          {
            path: "support",
            element: <Help />,
          },
          {
            path: "change-password",
            element: <ChangePassword />,
            action: passwordAction,
          },
          {
            path: "billing/generate-bill",
            element: <GenerateBill />,
            action: billAction
          },
          {
            path: "billing/bill-pay",
            element: <BillPayment />
          },
          {
            path: "billing/bill-history",
            element: <BillingHistory />,
            loader: billLoader
          },
        ],
      },
    ],
  },
]);

const App = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  useEffect(() => {
    const handleConnectionChange = () => setIsOnline(navigator.onLine);
    window.addEventListener("online", handleConnectionChange);
    window.addEventListener("offline", handleConnectionChange);
    return () => {
      window.removeEventListener("online", handleConnectionChange);
      window.removeEventListener("offline", handleConnectionChange);
    };
  }, []);
  return isOnline ? (
    <RouterProvider router={router}></RouterProvider>
  ) : (
    <div
      className="d-flex align-items-center justify-content-center display-1"
      style={{ height: "100vh" }}
    >
      network error
    </div>
  );
};
export default App;
