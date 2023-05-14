import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const HeaderStyled = styled.header`
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: white;
`;

export const Nav = styled.nav`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const NavLinkStyle = styled(NavLink)`
  display: flex;
  width: 100px;
  height: 100%;
  font-size: 24px;
  font-weight: 700;
  color: black;

  &.active {
    color: red;
  }
`;
