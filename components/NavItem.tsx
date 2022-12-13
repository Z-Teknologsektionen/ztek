import Link from "next/link";
type NavItemProps = {
  text: string,
  href: string,
  active: boolean
}

const NavItem = ({ text, href, active }: NavItemProps) => {
  return (
    <>
      <style jsx>{`
        .nav__link{
          font-size: 1rem; 
          position: relative;
          transition: all 0.2s;
        }
        
        .nav__link:hover{
        font-weight: bold;
        }
      `}

      </style>
      <Link href={href}>
        <h3 className={`nav__link`}>{text}</h3>
      </Link>
    </>
  );
};

export default NavItem;