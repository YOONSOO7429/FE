import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthApi } from "../shared/Api";

function LogIn() {
  const [email, setEmail] = useState({
    value: "",
    err: null,
  });
  const [password, setPassword] = useState({
    value: "",
    err: null,
  });

  const navigate = useNavigate();

  const onEmailChangeHandler = (event) => {
    const inputEmail = event.target.value;
    setEmail((prevEmail) => ({
      ...prevEmail,
      value: inputEmail,
    }));
  };

  const onPasswordChangeHandler = (event) => {
    const inputPassword = event.target.value;
    setPassword((prevPassword) => ({
      ...prevPassword,
      value: inputPassword,
    }));
  };

  const onSubmitHandler = async () => {
    if (email.value && password.value) {
      navigate("/");

      try {
        const res = await AuthApi.login({
          email: email.value,
          password: password.value,
        });
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Please enter your email and password.");
      return;
    }
  };

  return (
    <Container>
      <h1>왕초 WORLD 입장하기</h1>
      <Form>
        <Label>Email</Label>
        <Input
          type="text"
          value={email.value}
          placeholder="Type your Email"
          onChange={onEmailChangeHandler}
        />
        <Label>Password</Label>
        <Input
          type="password"
          value={password.value}
          placeholder="Type your Password"
          onChange={onPasswordChangeHandler}
        />
        <ButtonContainer>
          <Button type="submit" onClick={onSubmitHandler}>
            Log In
          </Button>
          <Link to={"/signup"}>
            <Button type="button">Sign Up</Button>
          </Link>
          <Link to={"/"}>
            <Button type="button">Go Back</Button>
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

const Form = styled.form`
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
