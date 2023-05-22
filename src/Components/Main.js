import React, { useState } from 'react';
import Header from './Header';
// import Form from './Form';
import GlobalStyle from '../GlobalStyle';
import styled from 'styled-components';
import Posts from '../Pages/Posts';
import MainPage from '../Pages/MainPage';

function Main() {
  const [isPostsVisible, setPostsVisibility] = useState(false);
  const handleButtonClick = () => {
    setPostsVisibility(!isPostsVisible);
  };
  return (
    <>
      <GlobalStyle />
      <Wrap>
        <Header />
        <button onClick={handleButtonClick}>
          {isPostsVisible ? '숨기기' : '게시글 써보기'}
        </button>
        {isPostsVisible && <Posts />}
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