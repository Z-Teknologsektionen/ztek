import Nav from './Nav'
import { ReactNode } from 'react';
import styles from "../styles/Layout.module.css"

type LaoutProps = {
  children: ReactNode; // 👈️ type children
};


const Layout = (props: LaoutProps) => {
  return (
    <>
      <Nav />
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