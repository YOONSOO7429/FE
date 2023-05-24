import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Header() {
  const [accessToken, setAccessToken] = useState(''); //토큰 상태를 관리하기 위한 useState 훅

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken"); // 로컬스토리지에서 토큰 가져오기
    if (storedAccessToken) {
      setAccessToken(storedAccessToken); // JSON형태로 저장된 토큰을 파싱하여 상태에 설정
    }
  }, []);

  const signOutHandler = () => {
    localStorage.removeItem("accessToken"); // 로컬 스토리지에서 토큰 제거
    localStorage.clear();
    alert("로그아웃 완료!");
    setAccessToken(''); //토큰 초기화
  };
  return (
    <Section>
      <HeaderItems>
        <Logo>왕초닷컴</Logo>
        {accessToken ? (
          <>
            <NavLink onClick={signOutHandler}>로그아웃</NavLink>
          </>
        ) : (
          <>
            <Navigation>
              <NavLink to="/login">로그인</NavLink>
              <NavLink to="/register">회원가입</NavLink>
            </Navigation>
          </>
        )}
      </HeaderItems>
    </Section>
  );
}

export default Header;

const Section = styled.section`
  margin: 15px 20px;
`;

const HeaderItems = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-right: 20px;
`;

const Navigation = styled.div`
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)`
  margin-left: 10px;
  text-decoration: none;
  color: #000;
  font-size: 16px;

  &:hover {
    text-decoration: underline;
  }
`;