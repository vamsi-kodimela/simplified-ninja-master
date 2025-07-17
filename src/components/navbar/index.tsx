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
            height={50}
          />
        </Link>
      </div>
    </nav>
  );
};

export { Navbar };
