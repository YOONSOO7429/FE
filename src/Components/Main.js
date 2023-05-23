import React, { useState } from 'react';
import Header from './Header';
// import Form from './Form';
import GlobalStyle from '../GlobalStyle';
import styled from 'styled-components';
import Posts from '../Pages/Posts';
import MainPage from '../Pages/MainPage';

function Main() {
  
  return (
    <>
      <GlobalStyle />
      <Wrap>
        <Header />
        <MainPage />
      </Wrap>
    </>
  );
}
export default Main;
const Wrap = styled.div`
  max-width: 1200px;
  min-width: 800px;
  margin: auto;
`;