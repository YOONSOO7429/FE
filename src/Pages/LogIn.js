import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { AuthApi } from "../shared/Api";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        localStorage.setItem("refreshToken", res.data.refresh);

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
    <Container>
      <h1>왕초 WORLD 입장하기</h1>
      <Form>
        <Label>Email</Label>
        <Input
          type="text"
          value={email}
          placeholder="Type your Email"
          onChange={onEmailChangeHandler}
        />
        <Label>Password</Label>
        <Input
          type="password"
          value={password}
          placeholder="Type your Password"
          onChange={onPasswordChangeHandler}
        />
        <ButtonContainer>
          <Button onClick={onSubmitHandler}>Log In</Button>
          <Link to={"/signup"}>
            <Button>Sign Up</Button>
          </Link>
          <Link to={"/"}>
            <Button>Go Back</Button>
          </Link>
        </ButtonContainer>
      </Form>
    </Container>
  );
}

export default LogIn;

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 3px solid black;
  border-radius: 5px;
  background-color: #f8f8f8;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  width: 100%;
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
