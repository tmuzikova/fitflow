import { Outlet } from "react-router-dom";

import { NavBar } from "./NavBar";
import { Footer } from "./Footer";

export const Layout = () => {
  return (
    <div>
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="bg-darkPrimary flex-grow relative">
          {/* gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80 z-0 pointer-events-none"></div>
          {/* content */}
          <div className="relative z-10">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};
