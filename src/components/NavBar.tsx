import { useState } from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

import { menu, close } from "../assets";
import { NAVLINKS } from "../constants/constants";
import { styles } from "../styles";
import { LanguageSelector } from "./language/LanguageSelector";

export const NavBar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);

  return (
    <nav
      className={`${styles.paddingX} w-full flex bg-darkPrimary items-center py-5  fixed top-0 z-20 transition-all duration-300`}
    >
      <div className=" w-full flex justify-end  max-w-7xl mx-auto">
        <div className="hidden sm:flex flex-row gap-10">
          {NAVLINKS.map((link) => (
            <Link
              to={link.path}
              key={link.id}
              className={`${
                active === link.title && " text-ascent font-bold text-[20px]"
              } text-white opacity-80 text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(link.title)}
            >
              <FormattedMessage id={link.title} />
            </Link>
          ))}
          <div className="LanguageSelectorContainer">
            <LanguageSelector />
          </div>
        </div>

        {/*COLLAPSED NAVBAR*/}
        <div className="sm:hidden flex justify-end ">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer z-20"
            onClick={() => setToggle(!toggle)}
          />
          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } pt-20 p-6 bg-black absolute top-0 right-0 w-full h-screen z-10 flex justify-center items-center`}
          >
            <div className="flex items-center flex-col gap-4">
              {NAVLINKS.map((link) => (
                <Link
                  to={link.path}
                  key={link.id}
                  className={`${
                    active === link.title &&
                    " text-ascent font-bold text-[20px]"
                  } text-white opacity-80 text-[18px] font-medium cursor-pointer`}
                  onClick={() => {
                    setActive(link.title);
                    setToggle(!toggle);
                  }}
                >
                  <FormattedMessage id={link.title} />
                </Link>
              ))}

              <div className="LanguageSelectorContainer">
                <LanguageSelector />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
