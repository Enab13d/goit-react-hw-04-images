import styled from "@emotion/styled";
import { theme } from "constants";

export const Overlay = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100vw;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
background-color: rgba(0, 0, 0, 0.8);
z-index: 1200;
`
export const ModalWindow = styled.div`
max-width: calc(100vw - ${theme.sizing(12)});
max-height: calc(100vh - ${theme.sizing(6)});
`