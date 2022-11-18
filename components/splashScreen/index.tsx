import { useRouter } from "next/router";
import React, { useEffect } from "react";
import HashLoader from "react-spinners/HashLoader";
import style from "./index.module.css";
import {
  Container,
  SplashLogoDiv,
  SplashMainDiv,
  WelcomeTitle,
} from "./styled";

const SplashScreen = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/login");
    }, 6000);
  }, []);
  return (
    <Container>
      <SplashMainDiv>
        <SplashLogoDiv>
          <HashLoader color="#fff" size={100} />
        </SplashLogoDiv>
        <WelcomeTitle>
          {/* <span style={{ fontSize: "4rem", color: "#1204da" }}>W</span>elcome{" "}
          <span style={{ fontSize: "4rem", color: "#1204da" }}>T</span>o{" "}
          <span style={{ fontSize: "4rem", color: "#1204da" }}>C</span>
          onnect
          <span style={{ fontSize: "4rem", color: "#1204da" }}>W</span>ell */}
          Welcome To <span style={{ fontSize: "5rem" }}>C</span>
          onnect
          <span style={{ fontSize: "5rem" }}>W</span>ell
        </WelcomeTitle>
      </SplashMainDiv>
    </Container>
  );
};
export default SplashScreen;
