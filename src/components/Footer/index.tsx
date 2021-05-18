import React from 'react';
import { Container, FooterNav, FooterNavItem, FooterLink } from './styles';

const Footer = () => {
  return (
    <>
      <Container>
        <FooterNav>
          <FooterNavItem>
            Made with ❤️ by <FooterLink href="https://github.com/magneh">Magne</FooterLink>
          </FooterNavItem>
        </FooterNav>
      </Container>
    </>
  );
};

export default Footer;
