import { HeaderStyled, Nav, NavLinkStyle } from './Header.styled';
import { Container } from 'components/App.styled';

export const Header = () => {
  return (
    <HeaderStyled>
      <Container>
        <Nav>
          <NavLinkStyle to={'/'}>Home</NavLinkStyle>
          <NavLinkStyle to={'movies'}>Movies</NavLinkStyle>
        </Nav>
      </Container>
    </HeaderStyled>
  );
};
