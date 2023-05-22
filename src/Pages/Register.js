import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AuthApi } from "../shared/Api";

//정규식 적용
const emailRegex =
  /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z-]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
const nicknameRegex = /[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,20}$/;
const passwordRegex = /.{4,}$/;

const alertMessage = {
  emailErr: "이메일 규칙에 어긋납니다!",
  nicknameErr: "닉네임이 규칙에 어긋납니다!",
  pwErr: "비밀번호 규칙에 어긋납니다!!(4글자 이상)",
  pwmatchErr: "패스워드가 불일치합니다.",
};

function Signup() {
  const [email, setEmail] = useState({ value: "", err: null });
  const [nickname, setNickName] = useState({ value: "", err: null });
  const [password, setPassword] = useState({ value: "", err: null });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    err: null,
  });

  const handleEmailChange = (event) => {
    const inputEmail = event.target.value;
    setEmail((prevEmail) => ({ ...prevEmail, value: inputEmail }));
  };
  const handleNickNameChange = (event) => {
    const inputNickname = event.target.value;
    setNickName((prevNickname) => ({ ...prevNickname, value: inputNickname }));
  };

  const handlePasswordChange = (event) => {
    const inputPassword = event.target.value;
    setPassword((prevPassword) => ({ ...prevPassword, value: inputPassword }));
  };

  const handleConfirmPasswordChange = (event) => {
    const inputConfirmPassword = event.target.value;
    setConfirmPassword((prevConfimPw) => ({
      ...prevConfimPw,
      value: inputConfirmPassword,
    }));
  };

  const validateSignUpData = () => {
    const isEmailValid = emailRegex.test(email.value);
    const isNicknameValid = nicknameRegex.test(nickname.value);
    const isPasswordValid = passwordRegex.test(password.value);
    const doPasswordsMatch = password.value === confirmPassword.value;

    setEmail((prevEmail) => ({ ...prevEmail, err: !isEmailValid }));
    setNickName((prevNickname) => ({ ...prevNickname, err: !isNicknameValid }));
    setPassword((prevPassword) => ({ ...prevPassword, err: !isPasswordValid }));
    setConfirmPassword((prevConfimPw) => ({
      ...prevConfimPw,
      err: !doPasswordsMatch,
    }));

    return !isEmailValid ||
      !isNicknameValid ||
      !isPasswordValid ||
      !doPasswordsMatch
      ? false
      : true;
  };

  const handleSubmit = async () => {
    const isSignUpValid = validateSignUpData();

    if (isSignUpValid) {
      try {
        const res = await AuthApi.signup({
          email: email.value,
          nickname: nickname.value,
          password: password.value,
        });
        alert(res.data.message)
      } catch (err) {
        alert(err.response.data.errorMessage);
      }
      return;
    } else {
      return;
    }
  };

  return (
    <StSignupContainer>
      <h1>왕초 WORLD에 오신걸 환영합니다.</h1>
      <label>
        Email:
        <StAlertBox>{email.err ? alertMessage.emailErr : null}</StAlertBox>
      </label>
      <Input type="text" placeholder="Email" onChange={handleEmailChange} />
      <label>
        Nickname:
        <StAlertBox>
          {nickname.err ? alertMessage.nicknameErr : null}
        </StAlertBox>
      </label>
      <Input
        type="text"
        placeholder="Nickname"
        onChange={handleNickNameChange}
      />
      <label>
        Password:
        <StAlertBox>{password.err ? alertMessage.pwErr : null}</StAlertBox>
      </label>
      <Input
        type="password"
        placeholder="Password"
        onChange={handlePasswordChange}
      />
      <label>
        Confirm Password:
        <StAlertBox>
          {confirmPassword.err ? alertMessage.pwmatchErr : null}
        </StAlertBox>
      </label>
      <Input
        type="password"
        placeholder="Confirm Password"
        onChange={handleConfirmPasswordChange}
      />
      <div>
        <StBtn onClick={handleSubmit}>회원가입</StBtn>
        <Link to={"/"}>
          <StBtn>취소하기</StBtn>
        </Link>
      </div>
    </StSignupContainer>
  );
}
export default Signup;

const StSignupContainer = styled.div`
  max-width: 1000px;
  margin: 15px auto;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  flex-direction: column;
  border: 3px solid black;
`;
const StBtn = styled.button`
  margin-right: 5px;
  background-color: #0077ff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #0055cc;
  }
`;
const StAlertBox = styled.div`
  color: tomato;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  width: 980px;
`;
