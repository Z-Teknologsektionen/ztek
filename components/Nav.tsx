import Link from 'next/link'
import navStyles from "../styles/Nav.module.css"

const Nav = () => {
  return (
    <nav className={navStyles.nav}>
      <ul>
        <li>
          <Link href='/'>Home</Link>
        </li>
        <li>
          <Link href='/about'>Om Z</Link>
        </li>
        <li>
          <Link href='/committees'>Kommittéer</Link>
        </li>
      </ul>

    </nav>
  );
}

export default Nav; 