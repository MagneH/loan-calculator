import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './';

test('Renders Footer', () => {
  render(<Footer />);
  const linkElement = screen.getByText(/Made with ❤️ by/i);
  expect(linkElement).toBeInTheDocument();
});
