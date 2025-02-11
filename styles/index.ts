import { css } from '@emotion/react';

export const GlobalStyles = css`
  @font-face {
    font-family: 'PPNeuebit';
    src: url('https://cdn.prod.website-files.com/66a8b39f3ac043de2548ab05/66acb4a18a6ad9a9419941f3_PPNeueBit-Regular.otf')
      format('opentype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'PPNeuebit';
    src: url('https://cdn.prod.website-files.com/66a8b39f3ac043de2548ab05/66acb4a1a51187e0be57c059_PPNeueBit-Bold.otf')
      format('opentype');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'JetBrains Mono', serif;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    cursor: url('icon.svg'), auto;
    background: #0c0f1d;
  }

  body,
  html {
    overflow-x: hidden;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
  /* width */
  ::-webkit-scrollbar {
    width: 10px;
    padding: 2rem;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    border-radius: 0.5rem;
    background: transparent;
    transition: all 300ms ease-in-out;
  }

  /* Track on hover */
  ::-webkit-scrollbar-track:hover {
    background: #fff1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 0.5rem;
    border: 5px solid transparent;
  }
`;
