import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

function Post() {
  const access = localStorage.getItem("accessToken");
  const [input, setInput] = useState({
    title: "",
    content: "",
    image: null,
  });
  const [file, setFile] = useState(null);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("title", input.title);
    formData.append("content", input.content);
    formData.append("image", input.image);
    console.log(formData);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        access: access,
      },
    };

    axios
      .post("http://localhost:3001/api/posts", formData, config)
      .then((res) => {
        console.log(formData);
      })
      .catch((e) => {
        console.log(e);
        if (e.response.data.message === "로그인이 필요한 기능입니다.") {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        }
      });

    setInput({ title: "", content: "", image: null });
  };

  const onChangePreview = (e) => {
    const file = e.target.files[0];
    setInput((prev) => ({ ...prev, image: file }));
    setFile(URL.createObjectURL(file));
  };

  return (
    <Background>
      <BackCenter>
    <Container>
      <h1>게시글 작성하기</h1>
      <Form onSubmit={onSubmitHandler}>
        <FormGroup>
          <InputText
            type="text"
            onChange={onChangeHandler}
            name="title"
            value={input.title}
            placeholder="제목을 작성해주세요."
            required
          />
        </FormGroup>
        <FormGroup>
          <Textarea
            type="text"
            onChange={onChangeHandler}
            name="content"
            value={input.content}
            placeholder="거지의 일상을 적어주세요."
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="file">이미지 첨부하기</Label>
          <InputFile
            type="file"
            id="file"
            accept="image/*"
            onChange={onChangePreview}
          />
        </FormGroup><br></br><hr/>
        {file && <PreviewImage src={file} alt={file} />}<br/> 
        <Button type="submit">저장</Button>
        <Button type="button">취소</Button>
      </Form>
    </Container>
    </BackCenter>
    </Background>
  );
}

export default Post;
const Background = styled.div`
  height: 100vh !important;

`
const BackCenter = styled.div`
  margin:0 auto;
  opacity:0.7;
`

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 4px;
  box-sizing: border-box;
  text-align: center;
  opacity:1.5;
`;

const Form = styled.form`
  margin-top: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  margin-right: 20px;
  text-align:left;
`;

const Label = styled.label`
  text-align: left !important;
  font-weight: bold; 
`;

const InputText = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Textarea = styled.textarea`
  width: 100%;
  height:300px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  maxlength:500px;
`;

const InputFile = styled.input`
  margin-top: 5px;
`;

const Button = styled.button`
  width: 10%;
  padding: 10px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin : 5px;
`;

const PreviewImage = styled.img`
  max-width: 30%;
  margin: 20px;
  aligns-items : center;
  size:20px;
`;