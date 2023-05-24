import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { AuthApi } from "../shared/Api";

function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onEmailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitHandler = async () => {
    if (email && password) {
      try {
        const res = await AuthApi.login({
          email: email,
          password: password,
        });

        localStorage.setItem("accessToken", res.data.access);

        if (res.status === 200) {
          navigate("/");
        }
        
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Please enter your email and password.");
    }
  };

  return (
    <Background>
    <Container>
      <Form>
      <h1>왕초닷컴</h1>
        <Label>이메일</Label>
        <Input
          type="text"
          value={email.valueOf()}
          placeholder="Type your Email"
          onChange={onEmailChangeHandler}
        />
        <Label>패스워드</Label>
        <Input
          type="password"
          value={password.valueOf()}
          placeholder="Type your Password"
          onChange={onPasswordChangeHandler}
        />
        <ButtonContainer>
          <Button type="submit" onClick={onSubmitHandler}>
            로그인
          </Button>
          <Link to={"/signup"}>
            <Button type="button">회원가입</Button>
          </Link>
          <Link to={"/"}>
            <Button type="button">뒤로가기</Button>
          </Link>
        </ButtonContainer>
      </Form>
    </Container>
    </Background>
  );
}

export default LogIn;

const Background = styled.html`
  background-image : url('https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
  opacity: 0.8;
  background-size: 100%;
`
const Container = styled.div`
  height: 100vh !important;
  max-width: 450px;
  margin: 0 auto;
  display: flex !important;
  align-items: center !important;
  text-align:center;
`;

const Form = styled.div`
  background-color: white;
  display: flex !important;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  padding-bottom: 20px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 20px;
  opacity:0.8;
`;

const Label = styled.label`
  margin: 1 auto;
  font-weight: bold;
  text-align:left;
  padding-left:30px;
`;

const Input = styled.input`
  margin: 0 auto;
  padding: 10px;
  width: 80%;
  border-radius: 5px;
  border: 1px solid #ccc;
  outline: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  font-weight: bold;
  border: none;
  outline: none;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;