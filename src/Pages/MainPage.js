import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

function MainPage() {
  const [posts, setPosts] = useState(null);
  const fetchPosts = async () => {
    const { data } = await axios.get('http://localhost:3001/api/posts');
    setPosts(data.posts);
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  const navigate = useNavigate();

  return (
    <>
      {/* 헤더 */}
      <StHeader>
        <StHeaderTitle>왕초의 STORY를 모두에게 알려주세요!</StHeaderTitle>
        <StHeaderButtons>
          <StButton onClick={() => navigate('/write')}>작성하기</StButton>
        </StHeaderButtons>
      </StHeader>

      {/* 본문 */}
      <StMainContainer>
        {posts?.map((post) => (
            <StPost key={post.postId}>
              <StPostImage src={post.image} alt="게시글 이미지" />
              <StPostContent>
                <StNickname>{post.nickname}</StNickname>
                <StPostTitle>{post.title}</StPostTitle>
                <StPostText>{post.content}</StPostText>
              </StPostContent>
              <StPostIcons>
                <StIcon>
                  <StIconLabel>좋아요</StIconLabel>
                  <StIconCount>{post.likeNum}</StIconCount>
                </StIcon>
                <StIcon>
                  <StIconLabel>댓글</StIconLabel>
                  <StIconCount>{post.commentNum}</StIconCount>
                </StIcon>
              </StPostIcons>
            </StPost>
          ))
        }
      </StMainContainer>
    </>
  );
}

export default MainPage;

// 스타일 컴포넌트
const StHeader = styled.div`
  background-color: #02c73c;
  color: white;
  display: flex;
  align-items: center;
  padding: 16px;
`;

const StHeaderTitle = styled.h1`
  margin: 0;
  font-size: 24px;
`;

const StHeaderButtons = styled.div`
  margin-left: auto;
`;

const StButton = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 16px;
  background-color: transparent;
  color: white;
  border: 1px solid white;
  cursor: pointer;

  &:hover {
    background-color: white;
    color: #02c73c;
  }

  & + & {
    margin-left: 8px;
  }
`;

const StMainContainer = styled.div`
  margin: 16px 40px;
`;

const StPost = styled.div`
  display: flex;
  padding-bottom: 16px;
  border-bottom: 1px solid #eeeeef;
  justify-content: space-between;
  align-items: flex-end;
`;

const StPostImage = styled.img`
  width: 160px;
  height: 160px;
  object-fit: cover;
  border-radius: 8px;
`;

const StPostContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
`;

const StNickname = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 4px;
`;

const StPostTitle = styled.div`
  font-size: 16px;
  margin-bottom: 4px;
`;

const StPostText = styled.div`
  font-size: 14px;
  margin-bottom: 4px;
`;

const StPostIcons = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const StIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const StIconLabel = styled.div`
  font-size: 14px;
`;

const StIconCount = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

const StNoPostsMessage = styled.div`
  font-size: 16px;
  margin-top: 16px;
  text-align: center;
`;