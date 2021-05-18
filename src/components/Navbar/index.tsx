import React from 'react';
import { Container, Logo, Menu, MenuItem } from './styles';

const Navbar = () => {
  return (
    <>
      <Container>
        <Logo>Loan Calculator</Logo>
        <Menu>
          <MenuItem href="mailto:magnehustveit@gmail.com">Contact</MenuItem>
        </Menu>
      </Container>
    </>
  );
};

export default Navbar;
