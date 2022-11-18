import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

export const LoginSignupContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  flex-direction: column;
  background-image: linear-gradient(to right, #ad30be, #307cbe, #00f2fe);
`;

const animate = keyframes`
0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }`;

export const LoginBox = styled.div`
  position: relative;
  width: 380px;
  height: 460px;
  background: #fdf900;
  border-radius: 10px;
  overflow: hidden;
  &:hover:before {
    content: "";
    z-index: 1;
    position: absolute;
    top: -50%;
    left: -50%;
    width: 380px;
    height: 460px;
    transform-origin: bottom right;
    background: linear-gradient(0deg, transparent, #0aa6ee, #0aa6ee);
    animation: ${animate} 6s linear infinite;
  }
  &:hover:after {
    content: "";
    z-index: 1;
    position: absolute;
    top: -50%;
    left: -50%;
    width: 380px;
    height: 460px;
    transform-origin: bottom right;
    background: linear-gradient(0deg, transparent, #0aa6ee, #0aa6ee);
    animation: ${animate} 6s linear infinite;
    animation-delay: -3s;
  }
`;

export const SignupBox = styled(LoginBox)`
  width: 80%;
  height: 520px;
  &:hover:before {
    width: 80%;
    height: 520px;
  }
  &:hover:after {
    width: 80%;
    height: 520px;
  }
`;

export const FormBox = styled.form`
  position: absolute;
  inset: 2px;
  background: #303ce4;
  padding: 0px 35px;
  border-radius: 8px;
  z-index: 2;
  display: flex;
  flex-direction: column;
`;

export const FormTitle = styled.h2`
  color: #303ce4;
  font-weight: 500;
  text-align: center;
  letter-spacing: 0.1em;
  background-color: white;
  border-radius: 0px 0px 170px 170px;
  padding-top: 20px;
  padding-bottom: 40px;
  padding-left: 15px;
  padding-right: 15px;
`;

export const FormLinks = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  font-size: 0.75em;
  color: white;
  text-decoration: beige;
  cursor: pointer;
  &:hover {
    color: #45f3ff;
  }
`;

export const FormButtons = styled.button`
  border: none;
  padding: 10px 30px;
  background: #45f3ff;
  cursor: pointer;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  width: 100px;
  margin-top: 20px;
  color: #303ce4;
  &:hover {
    color: white !important;
    border: 2px solid #45f3ff !important;
    background-color: #303ce4 !important;
  }
`;

export const FormSignupButtons = styled(FormButtons)`
  padding: 14px 75px;
  margin-top: 0px;
  width: fit-content;
`;
