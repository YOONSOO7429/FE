import React, { useParams, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
export default function PostDetail() {
  const [post, setPost] = useState(null);
  const { postId } = useParams();
  const fetchPostDetail = async () => {
    const { data } = await axios.get(
      `http://localhost:3001/api/posts/${postId}`
    );
    setPost(data.posts);
  };
  useEffect(() => {
    fetchPostDetail();
  }, []);
  return (
    <div>
      <StPost key={post.postId}>
        <StPostContent>
          <StPostTitle>
            <div>오늘의 제목:</div> <div>{post.title}</div>
          </StPostTitle>
          <StPostText>
            <div>왕초의 하루 일과:</div> <div>{post.content}</div>
          </StPostText>
          <StNickname>
            <div>왕초 지망자:</div> <div>{post.nickname}</div>
          </StNickname>
        </StPostContent>
        <StPostImage
          src={`http://localhost:3001/${post.image}`}
          alt={post.image}
        />
      </StPost>
    </div>
  );
}
// 스타일 컴포넌트
const StPost = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  padding: 16px;
  justify-content: center;
  align-items: center;
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
`;
const StNickname = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 16px;
  margin-bottom: 4px;
  gap: 8px;
`;
const StPostTitle = styled.div`
  display: flex;
  flex-direction: row;
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 4px;
`;
const StPostText = styled.div`
  display: flex;
  flex-direction: row;
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