import { Outlet, useLoaderData } from "react-router-dom";
import { Navbar } from "../components";
import customFetch from "../utils/customFetch";
import { createContext, useContext } from "react";
import { redirect } from "react-router-dom";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/user/current-user");
    return data;
  } catch (error) {
    alert(error?.response?.data?.msg);
    return redirect("/");
  }
};

const DashboardContext = createContext();

const DashboardLayout = () => {
  const { user } = useLoaderData();
  return (
    <DashboardContext.Provider value={user}>
      <Navbar />
      <Outlet />
    </DashboardContext.Provider>
  );
};
export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;
