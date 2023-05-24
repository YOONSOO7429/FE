import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

function MainPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const fetchPosts = async () => {
    try {
      const { data } = await axios.get("http://localhost:3001/api/posts");
      setPosts(data.posts);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      {/* 헤더 */}
      <StHeader>
        <StHeaderTitle>왕초의 STORY를 모두에게 알려주세요!</StHeaderTitle>
        <StHeaderButtons>
          <StButton onClick={() => navigate("/write")}>작성하기</StButton>
        </StHeaderButtons>
      </StHeader>

      {/* 본문 */}
      <StMainContainer>
        {isLoading ? (
          <StLoadingMessage>Loading posts...</StLoadingMessage>
        ) : (
          <>
            {posts && posts.length > 0 ? (
              posts.map((post) => (
                <Link to={`/posts/${post.postId}`} style={{textDecoration: 'none', color: "black"}}>
                  <StPost key={post.postId}>
                  <StPostImage
                      src={`http://localhost:3001/${post.image}`}
                      alt={post.image}
                    />
                    <StPostContent>
                      <StPostTitle>{post.title}</StPostTitle>
                      <StNickname>왕초 지망자: {post.nickname}</StNickname><hr/>
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
                </Link>
              ))
            ) : (
              <StNoPostsMessage>게시글이 없습니다.</StNoPostsMessage>
            )}
          </>
        )}
      </StMainContainer>
    </>
  );
}

export default MainPage;

// 스타일 컴포넌트
const StHeader = styled.div`
  background-color: black;
  color: white;
  display: flex;
  align-items: center;
  padding: 16px;
  display: flex;
  margin: 0 auto;
`;

const StHeaderTitle = styled.h1`
  margin:0;
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
  margin: 16px 16px;
`;

const StPost = styled.div`
  display: flex;
  border-bottom: 1px solid #eeeeef;
  justify-content: space-between;
  pointer: cursor;
  display: flex;
  margin: 0 auto;
`;

const StPostImage = styled.img`
  width: 170px;
  height: 170px;
  object-fit: cover;
  border-radius: 8px;
`;

const StPostContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 650px;
  display: flex;
  padding-bottom: 20px;
  border-bottom: 1px solid #eeeeef;
  justify-content: space-between;
`;

const StNickname = styled.div`
  font-weight: bold;
  font-size: 12px;
  margin-bottom: 4px;
`;

const StPostTitle = styled.div`
  font-weight: 600;
  font-size: 22px !important;
  margin-bottom: 4px;
`;

const StPostText = styled.div`
  border-radius: 20px;
  height:100px;
  font-size: 16px;
  margin: 3px;
  background-color: #f78f9fa;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding : 20px;
  readonly;
`;

const StPostIcons = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  align-items: flex-end;
  padding-bottom:20px;
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

const StLoadingMessage = styled.div`
  font-size: 16px;
  margin-top: 16px;
  text-align: center;
`;
