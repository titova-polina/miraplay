import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

@font-face {
  font-family: 'Neue Machina'; 
  font-weight: 100;
  src: url('./src/Static/fonts/NeueMachina-Ultralight.woff2') format("woff2");
}
@font-face {
  font-family: 'Neue Machina'; 
  font-weight: 300;
  src: url('./src/Static/fonts/NeueMachina-Light.woff2') format("woff2");
}
@font-face {
  font-family: 'Neue Machina'; 
  font-weight: 400;
  src: url('./src/Static/fonts/NeueMachina-Regular.woff2') format("woff2");
}
@font-face {
  font-family: 'Neue Machina'; 
  font-weight: 500;
  src: url('./src/Static/fonts/NeueMachina-Medium.woff2') format("woff2");
}
@font-face {
  font-family: 'Neue Machina'; 
  font-weight: 600;
  src: url('./src/Static/fonts/NeueMachina-Bold.woff2') format("woff2");
}
@font-face {
  font-family: 'Neue Machina'; 
  font-weight: 700;
  src: url('./src/Static/fonts/NeueMachina-Ultrabold.woff2') format("woff2");
}
@font-face {
  font-family: 'Neue Machina'; 
  font-weight: 800;
  src: url('./src/Static/fonts/NeueMachina-Black.woff2') format("woff2");
}

body {
  font-family: 'Neue Machina', sans-serif;
  margin: 0;
  background-color: #181818;
}

#root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  & footer {
    margin-top: auto;
  }
}

a {
  text-decoration: none;
}

button {
  outline: none;
  background: none;
  border: none;
}

ul {
  list-style-type: none;
}

`;
