import { Outlet } from "react-router-dom";

import { NavBar } from "./NavBar";
import { Footer } from "./Footer";

export const Layout = () => {
  return (
    <div>
      <NavBar />
      <div className="bg-darkPrimary">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
