import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders Loan Calculator', () => {
  render(<App />);
  const linkElement = screen.getByText(/Loan Calculator/i);
  expect(linkElement).toBeInTheDocument();
});
