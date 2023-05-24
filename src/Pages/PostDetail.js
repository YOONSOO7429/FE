import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

function PostDetail() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // const [editInput, setEditInput] = useState({
  //   title: "",
  //   content: "",
  //   image: null,
  // });
  // const [editFile, setEditFile] = useState(null);
  const [post, setPost] = useState({});
  const { postId } = useParams();

  const fetchPostDetail = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/posts/${postId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("게시글을 가져오는 중에 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    fetchPostDetail()
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  // 업데이트 부분
  // const updatePost = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:3001/api/posts/${postId}`);
  //   } catch {}
  // };

  if (loading) {
    return <div>Loading...</div>;
  }

  const deletePostHandler = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/posts/${postId}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        // 삭제가 성공적으로 이루어진 경우, 홈 화면으로 이동
        navigate("/");
      } else {
        throw new Error("게시글 삭제에 실패했습니다.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StContainer>
      <StPost>
        <StPostContent>
          <StPostTitle>
            <div>오늘의 제목:</div>
            <div>{post.post.title}</div>
          </StPostTitle>
          <StPostText>
            <div>왕초의 하루 일과:</div>
            <div>{post.post.content}</div>
          </StPostText>
          <StNickname>
            <div>왕초 지망자:</div>
            <div>{post.post.nickname}</div>
          </StNickname>
        </StPostContent>
        <StPostImage
          src={`http://localhost:3001/${post.post.image}`}
          alt={post.post.image}
        />
        <StButton>
          <StDeleteButton onClick={deletePostHandler}>
            게시글 삭제
          </StDeleteButton>
        </StButton>
      </StPost>
    </StContainer>
  );
}

export default PostDetail;

// Styled Components
const StContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StPost = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  padding: 16px;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const StPostImage = styled.img`
  width: 160px;
  height: 160px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 16px;
  margin-left: 30px;
`;

const StPostContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
`;

const StNickname = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 16px;
  margin-bottom: 10px;
  margin-top: 50px;
  margin-left: auto;
  gap: 8px;
`;

const StPostTitle = styled.div`
  display: flex;
  flex-direction: row;
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 10px;
  color: #333;
`;

const StPostText = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 14px;
  margin-bottom: 10px;
  color: #555;
`;

const StButton = styled.div`
  margin-left: 100px;
`;

const StDeleteButton = styled.button`
  padding: 8px 16px;
  background-color: black;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
`;
