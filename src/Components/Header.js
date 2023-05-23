import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <Section>
      <HeaderItems>
        <Logo>왕초닷컴</Logo>
        <Navigation>
          <NavLink to="/login">로그인</NavLink>
          <NavLink to="/register">회원가입</NavLink>
        </Navigation>
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