import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

import { NAVLINKS } from "../constants/constants";

export const Footer = () => {
  return (
    <footer className="footer footer-center bg-[#060606] text-lightPrimary text-opacity-8  px-10 pb-10 pt-10 ">
      <nav className="flex flex-row gap-4 ">
        {NAVLINKS.map((link) => (
          <Link
            to={link.path}
            key={link.id}
            className={" hover:text-ascent cursor-pointer"}
          >
            <FormattedMessage id={link.title} />
          </Link>
        ))}
      </nav>

      <div className="flex flex-row text-[12px] gap-1">
        <p>2024 - Created by</p>
        <a
          href="https://github.com/tmuzikova/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline text-ascent"
        >
          Tereza Muzikova
        </a>
      </div>
    </footer>
  );
};
