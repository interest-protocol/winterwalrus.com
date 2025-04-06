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
    font-family: 'DM Sans', serif;
  }

  html {
    background: #0c0f1d;
    scroll-behavior: smooth;
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
    width: 3px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #0007;
    padding-left: 2px;
    border-radius: 0.5rem;
    transition: all 300ms ease-in-out;
  }

  /* Track on hover */
  ::-webkit-scrollbar-track:hover {
    background: #0003;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 0.5rem;
    border: 5px solid transparent;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb:hover {
    background: #99efe4cc;
  }

  /* React hot toast */
  #_rht_toaster [role='status'] {
    justify-content: unset;
  }
`;
