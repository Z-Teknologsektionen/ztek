import Link from "next/link";
import React, { useState } from "react";
import NavItem from "./NavItem";

const MENU_LIST = [
  { text: "Hem", href: "/" },
  { text: "Om Z", href: "/about" },
  { text: "Sektionsorgan", href: "/committees" },
  { text: "Zaloonen", href: "/zaloonen" },
];
const Navbar = () => {
  const [navActive, setNavActive] = useState<boolean | null>(null);
  const [activeIdx, setActiveIdx] = useState(-1);

  return (
    <header>
      <style jsx>{`
            .nav{
              display: flex;
              padding: 16px;
              justify-content: space-between;
              align-items: center;
              background-color: #757575;
              height: 100px;
              position: fixed;
              top: 0;
              width: 100%;
              z-index: 999;
            }
            .nav img {
              max-width: 20%;
              max-height: 20%
            }
            .nav__menu-bar{
              display: flex;
              flex-direction: column;
              row-gap: 6px;
              cursor: pointer;
            }
            .nav__menu-bar div{
              width: 40px;
              height: 4px;
              background-color: black;
              border-radius: 2px;
            }
            .nav__menu-list{
              display: flex;
              flex-direction: column;
              position: fixed;
              top: 100px;
              width: 12rem;
              row-gap: 24px;
              right: -12rem;
              height: 100%;
              padding: 24px 16px;
              transition: all 0.2s;
              min-height: calc(100vh - 60px);
              background-color: #757575;
            }
            .nav__menu-list.active{
              right: 0;
            }
            
            .center{
              min-height: 600px;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            @media screen and (min-width: 768px) {
              .nav__menu-bar{
                display: none;
              }
              .nav__menu-list{
                position: unset;
                flex-direction: row;
                min-height: fit-content;
                width: fit-content;
                column-gap: 24px;
                align-items: center;
              }
              .nav__link::before{
                content: '';
                position: absolute;
                width: 0%;
                height: 6px;
                bottom: -16px;
                left: 0;
                background-color: black;
                transition: all 0.2s;
              }
              
              .nav__link:hover:before{
                width: 100%;
              }
            }
          `}</style>


      <nav className="nav">
        <Link href={"/"}>
          <img src="/default.png" />
          {/* <h3 className="logo">Z-Teknologsektionen</h3> */}
        </Link>
        <div
          onClick={() => setNavActive(!navActive)}
          className={`nav__menu-bar`}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={`${navActive ? "active" : ""} nav__menu-list`}>
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