import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import GlobalStyle from '../GlobalStyle';
import styled from 'styled-components';

function Test() {
  const todos = useSelector((state) => state.todos);
  const params = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState('');

  const foundData = todos.find((item) => item.id === params.id);
  console.log(foundData);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmitComment = (event) => {
    event.preventDefault();
    // Add code here to handle submitting the comment
    console.log('Submitted comment:', comment);
    setComment('');
  };

  return (
    <>
      <GlobalStyle />
      <Div>
        <Section>
          <InfoDiv>
            <span>ID : {foundData.id}</span>
            <Button onClick={() => navigate('/')}>이전으로</Button>
          </InfoDiv>
          <div>
            <h1>{foundData.title}</h1>
            <p>{foundData.body}</p>
          </div>
          <CommentForm onSubmit={handleSubmitComment}>
            <label>
              댓글
              <input type="text" value={comment} onChange={handleCommentChange} />
            </label>
            <Button type="submit">Submit</Button>
          </CommentForm>
        </Section>
      </Div>
    </>
  );
}
/// 상세보기 구현중 ...
export default Test;

const Div = styled.div`
  height: 50vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Section = styled.section`
  width: 1200px;
  height: 800px;
  padding: 30px;
  border: 1px solid lightgrey;
  border-radius: 10px;
`;

const Button = styled.button`
  border: 1px solid grey;
`;

const InfoDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CommentForm = styled.form`
  margin-top: 20px;
`;
