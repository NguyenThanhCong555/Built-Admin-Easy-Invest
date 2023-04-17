import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root{
    --primary-1: #976fea;
    --primary-2: #5d3ba4;
    --primary-3: #b28cff;
    --primary-4: #c1a8f3;
    --primary-5: #e9deff;
    --white: #ffffff;
    --white-light: #f3f3f3;
    --light: #eaeaea;
    --grey-light: #d6d6d6;
    --grey-medium: #bfbfbf;
    --grey: #a9a9a9;
    --grey-1: #a9a9a9;
    --grey-dark: #929292;
    --grey-black: #424242;
    --black: #000000;
    --secondary-1: #26c95d;
    --secondary-2: #f20000;
    --secondary-3: #fba500;
    --secondary-4: #336cff;
    --secondary-5: #b52cf5;
    --secondary-6: #3fc6ff;
    --shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    --shadow-container: rgba(0, 0, 0, 0.25);
    --shadow-hover: 0px 2px 4px rgba(0, 0, 0, 0.15);
  }
  *,*::after, *::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    user-select: none;
    font-family: 'Sarabun', sans-serif !important;
  }

  *::-webkit-scrollbar {
    width: 0px;
  }
  *::-webkit-scrollbar-thumb {
    width: 0px;
  }
  *::-webkit-scrollbar-track {
    width: 0px;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

/* Firefox */
  input[type=number] {
    appearance: textfield;
  }
  
  html,
  body{
    height: 100%;
    width: 100%;
  }

  body{
    line-height: 1.3;
    font-family: 'Sarabun', sans-serif;
  }

  #root {
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: 'Sarabun', sans-serif;
  }

  input, select {
    font-family: inherit;
    font-size: inherit;
  }

  /*text style*/ 
  .heading_1-bold {
    font-size: 64px;
    font-weight: 700;
  }
  .heading_2-regular {
    font-size: 64px;
    font-weight: 400;
  }
  .heading_3-bold {
    font-size: 48px;
    font-weight: 700;
  }
  .heading_4-medium {
    font-size: 48px;
    font-weight: 500;
  }
  .heading_5-regular {
    font-size: 48px;
    font-weight: 400;
  }
  .title_1-bold {
    font-size: 32px;
    font-weight: 700;
  }
  .title_2-medium {
    font-size: 32px;
    font-weight: 500;
  }
  .title_3-regular {
    font-size: 32px;
    font-weight: 400;
  }
  .subtitle_1-bold {
    font-size: 24px;
    font-weight: 700;
  }
  .subtitle_2-medium {
    font-size: 24px;
    font-weight: 500;
  }
  .subtitle_3-regular {
    font-size: 24px;
    font-weight: 400;
  }
  .subtitle_4-bold {
    font-size: 20px;
    font-weight: 700;
  }
  .body_1-bold {
    font-size: 18px;
    font-weight: 700;
  }
  .body_2-medium {
    font-size: 18px;
    font-weight: 500;
  }
  .body_3-regular {
    font-size: 18px;
    font-weight: 400;
  }
  .body_4-bold {
    font-size: 16px;
    font-weight: 700;
  }
  .body_5-medium {
    font-size: 16px;
    font-weight: 500;
  }
  .body_6-regular {
    font-size: 16px;
    font-weight: 400;
  }
  .small_1-bold {
    font-size: 14px;
    font-weight: 700;
  }
  .small_2-medium {
    font-size: 14px;
    font-weight: 500;
  }
  .small_3-regular {
    font-size: 14px;
    font-weight: 400;
  }
  .small_4-bold {
    font-size: 12px;
    font-weight: 700;
  }
  .small_5-medium {
    font-size: 12px;
    font-weight: 500;
  }
  .small_6-regular {
    font-size: 12px;
    font-weight: 400;
  }
  .small_7-regular {
    font-size: 10px;
    font-weight: 400;
  }


`;
