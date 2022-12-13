import Link from "next/link";
import React, { useState } from "react";
import NavItem from "./NavItem";
import navStyles from "../styles/Nav.module.css";

const MENU_LIST = [
  { text: "Hem", href: "/" },
  { text: "Om Z", href: "/about" },
  { text: "Dokument", href: "/documents" },
  { text: "Sektionsorgan", href: "/committees" },
  { text: "Zaloonen", href: "/zaloonen" },
  { text: "Bilder", href: "https://zfoto.ztek.se" },
  { text: "Trivsel på Z", href: "/samo" },
];
const Navbar = () => {
  const [navActive, setNavActive] = useState<boolean | null>(null);
  const [activeIdx, setActiveIdx] = useState(-1);

  return (
    <header>
      <nav className={navStyles.nav}>
        <Link href={"/"}>
          <img src="/default.png" />
        </Link>
        <div
          onClick={() => setNavActive(!navActive)}
          className={navStyles.navMenuBar}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div
          className={`${navActive ? navStyles.active : ""} ${
            navStyles.navMenuList
          }`}
        >
          {MENU_LIST.map((menu, idx) => (
            <div
              onClick={() => {
                setActiveIdx(idx);
                setNavActive(false);
              }}
              key={menu.text}
            >
              <NavItem active={activeIdx === idx} {...menu} />
            </div>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
