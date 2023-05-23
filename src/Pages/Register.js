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
    <Background>
      <CenterTemplate>
        <CenterH1>
        <p>왕초닷컴 방문을 환영합니다</p>
      <StSignupContainer>
      <label>
        이메일
        <StAlertBox>{email.err ? alertMessage.emailErr : null}</StAlertBox>
      </label>
      <Input type="text" placeholder="Email" onChange={handleEmailChange} /><br></br>
      <label>
        닉네임
        <StAlertBox>
          {nickname.err ? alertMessage.nicknameErr : null}
        </StAlertBox>
      </label>
      <Input
        type="text"
        placeholder="Nickname"
        onChange={handleNickNameChange}
      /><br></br>
      <label>
        패스워드
        <StAlertBox>{password.err ? alertMessage.pwErr : null}</StAlertBox>
      </label>
      <Input
        type="password"
        placeholder="Password"
        onChange={handlePasswordChange}
      /><br></br>
      <label>
        패스워드 확인
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
        <Link>
        <StBtn onClick={handleSubmit}>회원가입</StBtn>
        </Link>
        <Link to={"/"}>
          <StBtn>취소하기</StBtn>
        </Link>
      </div>
    </StSignupContainer>
    </CenterH1>
    </CenterTemplate>
    </Background>
  );
}
export default Signup;

const Background = styled.div`
  background-image : url('https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
  opacity: 0.8;
  background-size: 100%;
  height: 100vh !important;
  display: flex;
  margin: 0 auto;
  
`
const CenterTemplate = styled.div`
  height: 100vh;
  display: flex;
  margin: 0 auto;
  align-items: center !important;
  max-width: 1000px;
  text-align: center !important;
`
const CenterH1 = styled.p`
  text-align:center;
  width:500px;
  font-size:30px;
  margin-bottom:30px;
  font-weight: bold;
`

const StSignupContainer = styled.div`
  align-items: left !important;
  max-width: 1000px;
  margin: 0 auto;
  padding: 30px;
  display: flex !important;
  flex-wrap: wrap;
  gap: 10px;
  flex-direction: column;
  background-color : white;
  padding-bottom: 40px;
  border-radius: 20px;
  opacity:0.8;
  text-align:left;
  font-size:15px;
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
  width: 400px;
`;