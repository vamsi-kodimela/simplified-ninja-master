import React from "react";
import styles from "./navbar.module.css";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          <Image
            src="/simplified-ninja.png"
            alt="logo"
            width={200}
            height={60}
          />
        </Link>
      </div>

      <div className={styles.navLinks}>
        <Link href="/categories" className={styles.navLink}>
          Categories
        </Link>
      </div>
    </nav>
  );
};

export { Navbar };
