import styled from "@emotion/styled";
import { colorScheme } from "../../utils/constant";

export const Container = styled.div`
  background-image: linear-gradient(
    to right,
    ${colorScheme.color1},
    ${colorScheme.color4},
    ${colorScheme.color8}
  );
  height: 100vh;
`;

export const SplashMainDiv = styled.div`
  position: fixed;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
`;

export const SplashLogoDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const WelcomeTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: white;
`;
