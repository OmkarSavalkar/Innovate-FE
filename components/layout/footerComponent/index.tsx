import Image from "next/image";
import React from "react";
import styles from "./index.module.css";
const FooterComponent = () => {
  return (
    <footer className={styles["footer-style"]}>
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Developed by ConnectWell Team{" "}
        <span className={styles.logo}>
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </span>
      </a>
    </footer>
  );
};
export default FooterComponent;
