import Link from "next/link";
import navStyles from "../styles/Nav.module.css";
type NavItemProps = {
  text: string,
  href: string,
  active: boolean
}

const NavItem = ({ text, href, active }: NavItemProps) => {
  return (
    <>
      <Link href={href}>
        <h3 className={navStyles.navLink}>{text}</h3>
      </Link>
    </>
  );
};

export default NavItem;