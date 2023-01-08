import Link from "next/link";
import React, { useState } from "react";
import NavItem from "./NavItem";
import navStyles from "../styles/Nav.module.css";
import { useRouter } from "next/router";

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

  const router = useRouter();

  //Kolla vilket index vi är på ifall de navigerar tillbaka till sidan.
  const currIdx = MENU_LIST.findIndex(r => r.href === router.pathname)
  if (activeIdx !== currIdx) {
    setActiveIdx(currIdx)
  }

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
