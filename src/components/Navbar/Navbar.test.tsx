import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from './';

test('Renders Navbar', () => {
  render(<Navbar />);
  const linkElement = screen.getByText(/Contact/i);
  expect(linkElement).toBeInTheDocument();
});
