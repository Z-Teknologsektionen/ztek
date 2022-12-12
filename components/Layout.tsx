import Navbar from './Nav'
import { ReactNode } from 'react';
import styles from "../styles/Layout.module.css"

type LayoutProps = {
  children: ReactNode; // 👈️ type children
};


const Layout = (props: LayoutProps) => {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <main className={styles.main}>
          {props.children}
        </main>
        Enter
      </div>
    </>
  );
}

export default Layout;