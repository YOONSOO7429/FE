import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

function PostDetail() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const { postId } = useParams();

  const fetchPostDetail = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/posts/${postId}`);
      const data = await response.json();
      setPost(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw new Error("게시글을 가져오는 중에 오류가 발생했습니다.");
    }
  };

  const fetchPostComment = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/comments/${postId}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("댓글을 가져오는 중에 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    fetchPostDetail();
  }, []);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <StContainer>
      <StPost>
        <StPostContent>
          <StPostTitle>
            <div>
              <label>제목 :{post.post.title}</label>
              <hr />
            </div>
          </StPostTitle>
          <StNickname>
            <div>왕초 지망자:</div>
            <div>{post.post.nickname}</div>
            <br></br>
          </StNickname>
          <StPostText>
            <div>왕초의 하루 일과:</div>
            <div>{post.post.content}</div>
            <br></br>
          </StPostText>
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
      <hr></hr>
      <CommentContainer>
        {post.comments && post.comments.length > 0 ? (
          post.comments.map((comment) => (
            <CommentText>
              <label>{comment.comment}</label>
            </CommentText>
          ))
        ) : (
          <NoComment>
            <label>댓글이 없습니다</label>
          </NoComment>
        )}
      </CommentContainer>
      <CommentInput>
        <InputLine>
          <input type="teatarea"></input>
        </InputLine>
        <ButtonLine>
          <button type="button">입력하기</button>
        </ButtonLine>
      </CommentInput>
    </StContainer>
  );
}

export default PostDetail;

// Styled Components
const StContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  text-align: center;
  flex-direction: column;
`;

const StPost = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  padding: 16px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  flex-direction: column;
  max-width: 600px;
  background-color: #f5f5f5;
  opacity: 0.9;
`;

const StPostImage = styled.img`
  width: 500px;
  height: 500px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 16px;
  margin-left: 16px;
`;

const StPostContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
`;

const StNickname = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 12px;
  margin-bottom: 10px;
  margin-top: 5px;
  margin-left: auto;
  gap: 8px;
`;

const StPostTitle = styled.div`
  width: 500px;
  font-weight: bold;
  font-size: 15px;
  margin-bottom: 10px;
  padding-bottom: 5px;
  padding-top: 10px;
  color: #333;
  margin: 0 auto;
  text-align: left;
`;

const StPostText = styled.div`
  width: 480px;
  height: 100px;
  display: flex;
  flex-direction: row;
  font-size: 13px;
  margin-bottom: 30px !important;
  color: black;
  background-color: #d3d3d3;
  margin: 0 auto;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 10px;
`;

const StButton = styled.div`
  margin-left: 400px;
  width: 100px;
`;

const StDeleteButton = styled.button`
  display: inline-block;
  float: right !important;
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
`;
const CommentContainer = styled.div`
  margin-right:100px;
  margin-top:10px;
  margin-bottom:10px;
  text-align:left;
  item-aligns:left;
  flex-direction: row;
  readonly;
  width:500px;

`;

const CommentInput = styled.div`
  border-top: 1px solid #d3d3d3;
`;

const InputLine = styled.textarea`
  margin-top: 20px;
  width: 500px;
`;
const ButtonLine = styled.button`
  font-size: 18px;
  margin: 0 auto;
`;
const CommentText = styled.div`
  display: flex;
  margin: 0 auto;
  height: 40px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  text-align: left;
  margin-top: 10px;
  margin-bottom: 20px;
  color: black;
  background-color: #d3d3d3;
  font-size: 14px;
  padding: 3px;
`;

const NoComment = styled.div``;
